import { connectStorageEmulator, getDownloadURL, getStorage, ref as storageRef, uploadBytes } from 'firebase/storage'

import { app, usingEmulators } from '../../firebase'

// =====================================================================
//  Where a recipe photo goes when you press "Upload a photo".
//
//  Two hosts are supported, and the site picks whichever is configured:
//
//    1. CLOUDINARY  — used when VITE_CLOUDINARY_CLOUD_NAME and
//       VITE_CLOUDINARY_UPLOAD_PRESET are set. The browser posts the
//       file straight to Cloudinary. No Firebase billing plan needed.
//
//    2. FIREBASE STORAGE — the fallback. Needs Storage enabled on the
//       project, which currently means the Blaze plan.
//
//  If neither works, nothing breaks: the editor still accepts a pasted
//  image link, which is how every built-in recipe works today.
//
//  IMPORTANT about Cloudinary. This site has no server, so uploads use
//  an *unsigned* preset — the only kind a browser can use safely. Your
//  Cloudinary API SECRET must never appear here; it would be published
//  to every visitor. An unsigned preset is a deliberate trade: anyone
//  who reads the site's JavaScript could upload to that preset, so lock
//  it down in Cloudinary — set the folder on the preset itself, allow
//  only image formats, cap the file size — and keep it separate from
//  any preset used by another project.
// =====================================================================

export const IMAGE_MAX_BYTES = 5 * 1024 * 1024

const env = import.meta.env
const CLOUDINARY_CLOUD = env.VITE_CLOUDINARY_CLOUD_NAME || ''
const CLOUDINARY_PRESET = env.VITE_CLOUDINARY_UPLOAD_PRESET || ''

/** Which host uploads will go to: 'cloudinary', 'firebase', or 'none'. */
export function imageHost() {
  if (CLOUDINARY_CLOUD && CLOUDINARY_PRESET) return 'cloudinary'
  return 'firebase'
}

const SAFE_NAME = /[^a-z0-9.\-_]/g

function checkFile(file) {
  if (!file) throw new Error('No file selected.')
  if (!file.type.startsWith('image/')) throw new Error('That file is not an image.')
  if (file.size > IMAGE_MAX_BYTES) throw new Error('Image is larger than 5 MB.')
}

// ------------------------------------------------------------ Cloudinary

async function uploadToCloudinary(file) {
  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', CLOUDINARY_PRESET)
  // The folder is set ON the preset, not sent from here. That works the
  // same whether the account uses classic or dynamic folders, and it
  // means nobody using the preset can choose where files land.

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
    { method: 'POST', body: form }
  )

  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    const reason = body?.error?.message || `Cloudinary refused the upload (${response.status}).`
    const err = new Error(reason)
    err.code = 'cloudinary/rejected'
    throw err
  }

  if (!body.secure_url) {
    const err = new Error('Cloudinary accepted the file but returned no address for it.')
    err.code = 'cloudinary/no-url'
    throw err
  }

  return body.secure_url
}

// ------------------------------------------------------- Firebase Storage

let storageInstance = null

function storage() {
  if (!storageInstance) {
    storageInstance = getStorage(app)
    if (usingEmulators) connectStorageEmulator(storageInstance, '127.0.0.1', 9199)
  }
  return storageInstance
}

async function uploadToFirebase(file) {
  const cleanName = file.name.toLowerCase().replace(SAFE_NAME, '-')
  const path = `recipe-images/${Date.now()}-${cleanName}`

  const snapshot = await uploadBytes(storageRef(storage(), path), file, {
    contentType: file.type,
    cacheControl: 'public, max-age=31536000, immutable',
  })

  return getDownloadURL(snapshot.ref)
}

// ------------------------------------------------------------------ api

/** Uploads a photo and returns the public address to store on the recipe. */
export async function uploadRecipeImage(file) {
  checkFile(file)
  return imageHost() === 'cloudinary' ? uploadToCloudinary(file) : uploadToFirebase(file)
}

export function uploadErrorMessage(err) {
  switch (err?.code) {
    // ---- Cloudinary
    case 'cloudinary/rejected':
      return `${err.message} Check the upload preset is "unsigned" and its name matches VITE_CLOUDINARY_UPLOAD_PRESET.`
    case 'cloudinary/no-url':
      return err.message

    // ---- Firebase Storage
    case 'storage/unauthorized':
      return 'Storage rules rejected the upload. Publish storage.rules and make sure you are signed in as an admin.'
    case 'storage/unknown':
    case 'storage/retry-limit-exceeded':
      return 'Upload failed. Cloud Storage may not be enabled on this Firebase project — set up Cloudinary instead, or paste an image link.'
    case 'storage/quota-exceeded':
      return 'Storage quota is full.'

    default:
      return err?.message || 'Upload failed. Paste an image link instead.'
  }
}
