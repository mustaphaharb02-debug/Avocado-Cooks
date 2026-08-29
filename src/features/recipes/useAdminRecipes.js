import { useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'

import { db } from '../../firebase'
import { fallbackRecipes } from './RecipesContext'
import { normalizeRecipe } from './recipeModel'

// The dashboard's own view of the recipes collection.
//
// It differs from the public one in a single, deliberate way: it reads
// the whole collection, hidden recipes included. The security rules only
// hand that over to a signed-in admin, which is why this listener lives
// in the admin chunk and never runs for an ordinary visitor.

export default function useAdminRecipes() {
  const [docs, setDocs] = useState(null) // null = not loaded yet
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'recipes'),
      (snapshot) => {
        const loaded = snapshot.docs.map((d) => normalizeRecipe(d.data(), d.id))
        loaded.sort((a, b) => a.order - b.order || a.id - b.id)
        setDocs(loaded)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('[admin/recipes] could not read Firestore:', err)
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return useMemo(() => {
    const fromDb = docs ?? []
    const usingFallback = error != null || fromDb.length === 0

    return {
      /** Everything, including hidden recipes. */
      allRecipes: usingFallback ? fallbackRecipes : fromDb,
      loading,
      error,
      usingFallback,
      /** True when Firestore answered, even with an empty collection. */
      isEmpty: !error && docs != null && docs.length === 0,
    }
  }, [docs, loading, error])
}
