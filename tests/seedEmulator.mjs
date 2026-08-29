// =====================================================================
//  Fill the local emulator with the built-in recipes.
//
//  The rules test suite has to start from an empty database, so it wipes
//  the emulator and leaves two dummy recipes behind. Without this, the
//  site at `npm run dev:emulated` would show those dummies instead of
//  your recipes, which looks alarmingly like everything got deleted.
//
//  Run on its own:      npm run seed:emulator
//  It also runs automatically at the end of  npm run test:rules.
// =====================================================================

import { readFileSync } from 'node:fs'
import { initializeTestEnvironment } from '@firebase/rules-unit-testing'
import { doc, setDoc } from 'firebase/firestore'

import { recipes } from '../src/features/recipes/seedRecipes.js'
import { toFirestoreRecipe } from '../src/features/recipes/recipeModel.js'

/** Puts the rules files back after a test environment has replaced them. */
async function restoreRules() {
  const jobs = [
    ['http://127.0.0.1:8080/emulator/v1/projects/avo-cooks:securityRules', 'firestore.rules'],
    ['http://127.0.0.1:9199/internal/setRules', 'storage.rules'],
  ]
  for (const [url, file] of jobs) {
    await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rules: { files: [{ name: file, content: readFileSync(file, 'utf8') }] },
      }),
    }).catch(() => {})
  }
}

export default async function seedEmulator({ quiet = false } = {}) {
  const testEnv = await initializeTestEnvironment({
    projectId: 'avo-cooks',
    firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 },
  })

  await testEnv.clearFirestore()
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    for (const recipe of recipes) {
      const data = toFirestoreRecipe(recipe)
      await setDoc(doc(db, 'recipes', String(data.id)), data)
    }
  })

  await testEnv.cleanup()
  await restoreRules()

  if (!quiet) console.log(`  seeded the emulator with ${recipes.length} recipes`)
  return recipes.length
}

// Allow `node tests/seedEmulator.mjs` as well as importing it.
const runDirectly = process.argv[1]?.replace(/\\/g, '/').endsWith('tests/seedEmulator.mjs')
if (runDirectly) await seedEmulator()
