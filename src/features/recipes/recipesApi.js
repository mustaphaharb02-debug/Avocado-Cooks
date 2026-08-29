import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore'
import {
  connectStorageEmulator,
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage'

import { app, db, usingEmulators } from '../../firebase'

let storageInstance = null

function storage() {
  if (!storageInstance) {
    storageInstance = getStorage(app)
    if (usingEmulators) connectStorageEmulator(storageInstance, '127.0.0.1', 9199)
  }
  return storageInstance
}
import { recipes as seedRecipes } from './seedRecipes'

/** How many recipes ship inside the code, for the dashboard's wording. */
export const SEED_RECIPE_COUNT = seedRecipes.length
import { toFirestoreRecipe } from './recipeModel'

// All writes the admin dashboard performs. The security rules only let
// an admin account through, so a stolen dashboard URL is not enough.

export async function saveRecipe(recipe) {
  const data = toFirestoreRecipe(recipe)
  const id = String(data.id)

  await setDoc(
    doc(db, 'recipes', id),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  )

  return id
}

export async function deleteRecipe(recipeId) {
  await deleteDoc(doc(db, 'recipes', String(recipeId)))
}

/** Copies the recipes bundled in seedRecipes.js into Firestore. */
export async function importSeedRecipes({ overwrite = false } = {}) {
  const snapshot = await getDocs(collection(db, 'recipes'))
  const existing = new Set(snapshot.docs.map((d) => d.id))

  const toWrite = seedRecipes.filter((r) => overwrite || !existing.has(String(r.id)))
  if (!toWrite.length) return { imported: 0, skipped: seedRecipes.length }

  // Firestore batches hold 500 writes; the seed list fits, but chunk anyway.
  const chunks = []
  for (let i = 0; i < toWrite.length; i += 400) chunks.push(toWrite.slice(i, i + 400))

  for (const chunk of chunks) {
    const batch = writeBatch(db)
    for (const recipe of chunk) {
      const data = toFirestoreRecipe(recipe)
      batch.set(
        doc(db, 'recipes', String(data.id)),
        { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
        { merge: true }
      )
    }
    await batch.commit()
  }

  return { imported: toWrite.length, skipped: seedRecipes.length - toWrite.length }
}

const SAFE_NAME = /[^a-z0-9.\-_]/g

/**
 * Uploads a photo to Cloud Storage and returns its public URL.
 * Cloud Storage needs to be enabled on the Firebase project; if it is
 * not, the caller falls back to pasting an image link.
 */
export async function uploadRecipeImage(file) {
  if (!file) throw new Error('No file selected.')
  if (!file.type.startsWith('image/')) throw new Error('That file is not an image.')
  if (file.size > 5 * 1024 * 1024) throw new Error('Image is larger than 5 MB.')

  const cleanName = file.name.toLowerCase().replace(SAFE_NAME, '-')
  const path = `recipe-images/${Date.now()}-${cleanName}`
  const snapshot = await uploadBytes(storageRef(storage(), path), file, {
    contentType: file.type,
    cacheControl: 'public, max-age=31536000, immutable',
  })

  return getDownloadURL(snapshot.ref)
}

export function uploadErrorMessage(err) {
  switch (err?.code) {
    case 'storage/unauthorized':
      return 'Storage rules rejected the upload. Publish storage.rules and make sure you are signed in as an admin.'
    case 'storage/unknown':
    case 'storage/retry-limit-exceeded':
      return 'Upload failed. If Cloud Storage is not enabled on this Firebase project, paste an image link instead.'
    case 'storage/quota-exceeded':
      return 'Storage quota is full.'
    default:
      return err?.message || 'Upload failed. Paste an image link instead.'
  }
}

export function firestoreErrorMessage(err) {
  if (err?.code === 'permission-denied') {
    return 'Firestore rules rejected this. Publish firestore.rules from the project root and sign in with an admin e-mail.'
  }
  if (err?.code === 'unavailable') {
    return 'No connection to Firestore. Check your internet and try again.'
  }
  return err?.message || 'Something went wrong. Try again.'
}
