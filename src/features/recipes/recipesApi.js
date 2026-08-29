import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore'

import { db } from '../../firebase'

import { recipes as seedRecipes } from './seedRecipes'
import { toFirestoreRecipe } from './recipeModel'

/** How many recipes ship inside the code, for the dashboard's wording. */
export const SEED_RECIPE_COUNT = seedRecipes.length

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

export function firestoreErrorMessage(err) {
  if (err?.code === 'permission-denied') {
    return 'Firestore rules rejected this. Publish firestore.rules from the project root and sign in with an admin e-mail.'
  }
  if (err?.code === 'unavailable') {
    return 'No connection to Firestore. Check your internet and try again.'
  }
  return err?.message || 'Something went wrong. Try again.'
}

// Photo uploading lives in its own file because it can go to two
// different hosts — see imageUpload.js.
export { uploadRecipeImage, uploadErrorMessage, imageHost } from './imageUpload'
