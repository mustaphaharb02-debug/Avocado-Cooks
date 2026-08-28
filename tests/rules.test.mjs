// =====================================================================
//  Security rules test suite
//
//  Runs firestore.rules and storage.rules against the Firebase emulators
//  and checks that each promise the rules make actually holds. These are
//  the only tests that matter for safety: the rules are the whole
//  security system, because the browser talks to the database directly.
//
//  Start the emulators, then:  npm run test:rules
// =====================================================================

import { readFileSync } from 'node:fs'
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  Timestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getBytes, deleteObject } from 'firebase/storage'

const ADMIN_EMAIL = 'mustapha.harb02@gmail.com'

const testEnv = await initializeTestEnvironment({
  projectId: 'avo-cooks',
  firestore: {
    rules: readFileSync('firestore.rules', 'utf8'),
    host: '127.0.0.1',
    port: 8080,
  },
  storage: {
    rules: readFileSync('storage.rules', 'utf8'),
    host: '127.0.0.1',
    port: 9199,
  },
})

const anon = testEnv.unauthenticatedContext()
const admin = testEnv.authenticatedContext('admin-uid', { email: ADMIN_EMAIL })
const stranger = testEnv.authenticatedContext('other-uid', { email: 'someone@else.example' })

const anonDb = anon.firestore()
const adminDb = admin.firestore()
const strangerDb = stranger.firestore()

// ---------------------------------------------------------------- harness

let passed = 0
const failures = []

async function check(name, fn) {
  try {
    await fn()
    passed++
    console.log(`  [32mPASS[0m  ${name}`)
  } catch (err) {
    failures.push({ name, err })
    console.log(`  [31mFAIL[0m  ${name}`)
    console.log(`        ${err?.message?.split('\n')[0] ?? err}`)
  }
}

function group(title) {
  console.log(`\n${title}`)
}

// ---------------------------------------------------------------- fixtures

const publishedRecipe = {
  id: 1,
  image: '/images/salad.jpg',
  category: 'Salads',
  featured: true,
  published: true,
  order: 1,
  en: { title: 'Fresh Salad', description: '', ingredients: ['Lettuce'], steps: ['Toss'], notes: '' },
  ar: { title: 'سلطة', description: '', ingredients: ['خس'], steps: ['اخلط'], notes: '' },
}

const hiddenRecipe = { ...publishedRecipe, id: 2, published: false, featured: false, order: 2 }

await testEnv.clearFirestore()
await testEnv.withSecurityRulesDisabled(async (ctx) => {
  const db = ctx.firestore()
  await setDoc(doc(db, 'recipes/1'), publishedRecipe)
  await setDoc(doc(db, 'recipes/2'), hiddenRecipe)
  await setDoc(doc(db, 'recipes/1/comments/seeded'), {
    name: 'Seeded',
    text: 'A comment that already exists',
    createdAt: Timestamp.now(),
  })
  await setDoc(doc(db, 'reactions/1'), { likes: 5, dislikes: 1 })
})

// ---------------------------------------------------------------- recipes

group('recipes — visitors see published recipes only')

await check('anyone can read a published recipe', () =>
  assertSucceeds(getDoc(doc(anonDb, 'recipes/1')))
)

await check('a hidden recipe is refused to visitors', () =>
  assertFails(getDoc(doc(anonDb, 'recipes/2')))
)

await check('the published-only query the site uses is allowed', () =>
  assertSucceeds(getDocs(query(collection(anonDb, 'recipes'), where('published', '==', true))))
)

await check('an unfiltered read of the collection is refused', () =>
  assertFails(getDocs(collection(anonDb, 'recipes')))
)

await check('an admin may read the whole collection, hidden included', () =>
  assertSucceeds(getDocs(collection(adminDb, 'recipes')))
)

await check('an admin may read a hidden recipe directly', () =>
  assertSucceeds(getDoc(doc(adminDb, 'recipes/2')))
)

group('recipes — only an admin may change them')

await check('a visitor cannot create a recipe', () =>
  assertFails(setDoc(doc(anonDb, 'recipes/99'), publishedRecipe))
)

await check('a visitor cannot edit a recipe', () =>
  assertFails(updateDoc(doc(anonDb, 'recipes/1'), { category: 'Hacked' }))
)

await check('a visitor cannot delete a recipe', () =>
  assertFails(deleteDoc(doc(anonDb, 'recipes/1')))
)

await check('a signed-in non-admin cannot edit a recipe', () =>
  assertFails(updateDoc(doc(strangerDb, 'recipes/1'), { category: 'Hacked' }))
)

await check('an admin can create a recipe', () =>
  assertSucceeds(setDoc(doc(adminDb, 'recipes/99'), { ...publishedRecipe, id: 99 }))
)

await check('an admin can edit a recipe', () =>
  assertSucceeds(updateDoc(doc(adminDb, 'recipes/99'), { category: 'Mains' }))
)

await check('an admin can delete a recipe', () =>
  assertSucceeds(deleteDoc(doc(adminDb, 'recipes/99')))
)

// ---------------------------------------------------------------- comments

group('comments — open to post, closed to tamper with')

const validComment = () => ({
  name: 'Layla',
  text: 'Made this twice this week.',
  createdAt: serverTimestamp(),
})

await check('anyone can read comments', () =>
  assertSucceeds(getDocs(collection(anonDb, 'recipes/1/comments')))
)

await check('anyone can post a valid comment', () =>
  assertSucceeds(addDoc(collection(anonDb, 'recipes/1/comments'), validComment()))
)

await check('a name longer than 50 characters is refused', () =>
  assertFails(
    addDoc(collection(anonDb, 'recipes/1/comments'), { ...validComment(), name: 'x'.repeat(51) })
  )
)

await check('text longer than 1000 characters is refused', () =>
  assertFails(
    addDoc(collection(anonDb, 'recipes/1/comments'), { ...validComment(), text: 'x'.repeat(1001) })
  )
)

await check('an empty name is refused', () =>
  assertFails(addDoc(collection(anonDb, 'recipes/1/comments'), { ...validComment(), name: '' }))
)

await check('a made-up timestamp is refused (no pinning to the top)', () =>
  assertFails(
    addDoc(collection(anonDb, 'recipes/1/comments'), {
      ...validComment(),
      createdAt: Timestamp.fromDate(new Date('3000-01-01')),
    })
  )
)

await check('a smuggled extra field is refused', () =>
  assertFails(
    addDoc(collection(anonDb, 'recipes/1/comments'), { ...validComment(), isAdmin: true })
  )
)

await check('a comment on a recipe that does not exist is refused', () =>
  assertFails(addDoc(collection(anonDb, 'recipes/404/comments'), validComment()))
)

await check('a comment on a hidden recipe is refused', () =>
  assertFails(addDoc(collection(anonDb, 'recipes/2/comments'), validComment()))
)

await check('nobody can edit a comment, not even an admin', () =>
  assertFails(updateDoc(doc(adminDb, 'recipes/1/comments/seeded'), { text: 'rewritten' }))
)

await check('a visitor cannot delete a comment', () =>
  assertFails(deleteDoc(doc(anonDb, 'recipes/1/comments/seeded')))
)

await check('an admin can delete a comment (moderation)', () =>
  assertSucceeds(deleteDoc(doc(adminDb, 'recipes/1/comments/seeded')))
)

// --------------------------------------------------------------- reactions

group('reactions — counters that can only inch')

await check('anyone can read the counters', () =>
  assertSucceeds(getDoc(doc(anonDb, 'reactions/1')))
)

await check('a visitor can add one like', () =>
  assertSucceeds(setDoc(doc(anonDb, 'reactions/1'), { likes: 6, dislikes: 1 }, { merge: true }))
)

await check('a visitor can swap a like for a dislike in one write', () =>
  assertSucceeds(setDoc(doc(anonDb, 'reactions/1'), { likes: 5, dislikes: 2 }, { merge: true }))
)

await check('jumping the count by 2 is refused', () =>
  assertFails(setDoc(doc(anonDb, 'reactions/1'), { likes: 7, dislikes: 2 }, { merge: true }))
)

await check('a wild inflation is refused', () =>
  assertFails(setDoc(doc(anonDb, 'reactions/1'), { likes: 99999, dislikes: 2 }, { merge: true }))
)

await check('a negative count is refused', () =>
  assertFails(setDoc(doc(anonDb, 'reactions/1'), { likes: -1, dislikes: 2 }, { merge: true }))
)

await check('a non-integer count is refused', () =>
  assertFails(setDoc(doc(anonDb, 'reactions/1'), { likes: 5.5, dislikes: 2 }, { merge: true }))
)

await check('an extra field is refused', () =>
  assertFails(
    setDoc(doc(anonDb, 'reactions/1'), { likes: 6, dislikes: 2, spam: true }, { merge: true })
  )
)

await check('a write that changes nothing is refused', () =>
  assertFails(setDoc(doc(anonDb, 'reactions/1'), { likes: 5, dislikes: 2 }, { merge: true }))
)

await check('counters for a recipe that does not exist are refused', () =>
  assertFails(setDoc(doc(anonDb, 'reactions/404'), { likes: 1, dislikes: 0 }))
)

await check('a visitor cannot delete the counters', () =>
  assertFails(deleteDoc(doc(anonDb, 'reactions/1')))
)

await check('an admin can delete the counters', () =>
  assertSucceeds(deleteDoc(doc(adminDb, 'reactions/1')))
)

// ------------------------------------------------------------- catch-all

group('everything else is closed')

await check('an unknown collection cannot be read', () =>
  assertFails(getDocs(collection(anonDb, 'secrets')))
)

await check('an unknown collection cannot be written, even by an admin', () =>
  assertFails(setDoc(doc(adminDb, 'secrets/1'), { anything: true }))
)

// --------------------------------------------------------------- storage

group('storage — public photos, admin uploads')

const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
const imageMeta = { contentType: 'image/png' }

await testEnv.withSecurityRulesDisabled(async (ctx) => {
  await uploadBytes(ref(ctx.storage(), 'recipe-images/seeded.png'), png, imageMeta)
})

await check('anyone can read a recipe photo', () =>
  assertSucceeds(getBytes(ref(anon.storage(), 'recipe-images/seeded.png')))
)

await check('a visitor cannot upload', () =>
  assertFails(uploadBytes(ref(anon.storage(), 'recipe-images/sneaky.png'), png, imageMeta))
)

await check('a signed-in non-admin cannot upload', () =>
  assertFails(uploadBytes(ref(stranger.storage(), 'recipe-images/sneaky.png'), png, imageMeta))
)

await check('an admin can upload an image', () =>
  assertSucceeds(uploadBytes(ref(admin.storage(), 'recipe-images/new.png'), png, imageMeta))
)

await check('a non-image upload is refused', () =>
  assertFails(
    uploadBytes(ref(admin.storage(), 'recipe-images/payload.html'), png, {
      contentType: 'text/html',
    })
  )
)

await check('an oversized upload is refused', () =>
  assertFails(
    uploadBytes(ref(admin.storage(), 'recipe-images/huge.png'), new Uint8Array(6 * 1024 * 1024), imageMeta)
  )
)

await check('an admin can delete a photo', () =>
  assertSucceeds(deleteObject(ref(admin.storage(), 'recipe-images/new.png')))
)

await check('a visitor cannot delete a photo', () =>
  assertFails(deleteObject(ref(anon.storage(), 'recipe-images/seeded.png')))
)

await check('writing outside recipe-images is refused', () =>
  assertFails(uploadBytes(ref(admin.storage(), 'elsewhere/file.png'), png, imageMeta))
)

// ----------------------------------------------------------------- report

await testEnv.cleanup()

// initializeTestEnvironment replaced the emulator's rules with the ones it
// loaded, and cleanup does not put them back — leaving the emulator denying
// everything, which looks exactly like a broken app. Restore them so
// `npm run dev:emulated` still works straight after a test run.
for (const [port, file] of [
  [8080, 'firestore.rules'],
  [9199, 'storage.rules'],
]) {
  const url =
    port === 8080
      ? `http://127.0.0.1:8080/emulator/v1/projects/avo-cooks:securityRules`
      : `http://127.0.0.1:9199/internal/setRules`
  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rules: { files: [{ name: file, content: readFileSync(file, 'utf8') }] } }),
  }).catch(() => {})
}

console.log(`\n${'-'.repeat(58)}`)
console.log(`  ${passed} passed, ${failures.length} failed`)
console.log('-'.repeat(58))

if (failures.length) {
  console.log('\nFailures:')
  for (const f of failures) console.log(`  · ${f.name}\n    ${f.err?.message ?? f.err}`)
  process.exit(1)
}
