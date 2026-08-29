import { useCallback, useState } from 'react'

import {
  deleteRecipe,
  firestoreErrorMessage,
  importSeedRecipes,
  saveRecipe,
  SEED_RECIPE_COUNT,
} from '../../features/recipes/recipesApi'

/**
 * Every write the dashboard can perform, plus the "busy / it worked /
 * it failed" state that goes with them.
 *
 * Keeping this out of AdminDashboard leaves that file describing what
 * the screen looks like, and this one describing what the buttons do.
 */
export default function useDashboardActions() {
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [problem, setProblem] = useState('')

  const clearMessages = useCallback(() => {
    setNotice('')
    setProblem('')
  }, [])

  /** Used by the editor, which shows the failure itself — so this re-throws. */
  const save = useCallback(async (recipe) => {
    try {
      await saveRecipe(recipe)
      setNotice(`Saved “${recipe.en.title || recipe.ar.title}”. It is live on the website now.`)
    } catch (err) {
      console.error('[admin] save failed:', err)
      throw new Error(firestoreErrorMessage(err))
    }
  }, [])

  const remove = useCallback(async (recipe) => {
    const name = recipe.en.title || recipe.ar.title
    if (!window.confirm(`Delete “${name}”? This cannot be undone.`)) return

    setBusy(true)
    setProblem('')
    try {
      await deleteRecipe(recipe.id)
      setNotice(`Deleted “${name}”.`)
    } catch (err) {
      setProblem(firestoreErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }, [])

  const toggleFlag = useCallback(async (recipe, field) => {
    setBusy(true)
    setProblem('')
    try {
      await saveRecipe({ ...recipe, [field]: !recipe[field] })
    } catch (err) {
      setProblem(firestoreErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }, [])

  const importSeed = useCallback(async () => {
    if (
      !window.confirm(
        `Copy the ${SEED_RECIPE_COUNT} built-in recipes into the database? Existing ones are kept.`
      )
    ) {
      return
    }
    setBusy(true)
    setProblem('')
    try {
      const { imported, skipped } = await importSeedRecipes()
      setNotice(`Imported ${imported} recipe(s). ${skipped ? `${skipped} already existed.` : ''}`)
    } catch (err) {
      setProblem(firestoreErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }, [])

  return { busy, notice, problem, clearMessages, save, remove, toggleFlag, importSeed }
}
