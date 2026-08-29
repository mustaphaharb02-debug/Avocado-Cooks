import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { recipes as seedRecipes } from './seedRecipes'
import { normalizeRecipe } from './recipeModel'

// Recipes live in Firestore so they can be managed from /admin.
//
// This provider is the PUBLIC view of them. It asks Firestore for
// published recipes only — not as a convenience, but because the
// security rules refuse an unfiltered read of the collection to anyone
// who is not a signed-in admin (see firestore.rules → match /recipes).
// Dropping the where() clause here would break the whole website.
//
// The dashboard needs hidden recipes too, so it runs its own listener in
// src/features/recipes/useAdminRecipes.js — inside the admin-only chunk.
//
// The built-in list in seedRecipes.js is kept as a seed (the admin
// dashboard can import it) and as an offline fallback, so the website
// never shows an empty page if Firestore is unreachable.

const RecipesContext = createContext(null)

const fallbackRecipes = seedRecipes.map((r) => normalizeRecipe(r))

export function RecipesProvider({ children }) {
  const [docs, setDocs] = useState(null) // null = not loaded yet
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const publishedOnly = query(collection(db, 'recipes'), where('published', '==', true))

    const unsubscribe = onSnapshot(
      publishedOnly,
      (snapshot) => {
        const loaded = snapshot.docs.map((d) => normalizeRecipe(d.data(), d.id))
        loaded.sort((a, b) => a.order - b.order || a.id - b.id)
        setDocs(loaded)
        setLoading(false)
        setError(null)
      },
      (err) => {
        // Most likely cause: security rules deny reads, or the browser is
        // offline. Fall back to the bundled recipes instead of a blank site.
        console.error('[recipes] could not read Firestore:', err)
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const value = useMemo(() => {
    const fromDb = docs ?? []
    const usingFallback = error != null || fromDb.length === 0

    return {
      /** What visitors are allowed to see. */
      recipes: usingFallback ? fallbackRecipes.filter((r) => r.published) : fromDb,
      loading,
      error,
      usingFallback,
    }
  }, [docs, loading, error])

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
}

export function useRecipes() {
  const ctx = useContext(RecipesContext)
  if (!ctx) throw new Error('useRecipes must be used inside <RecipesProvider>')
  return ctx
}

/** Featured picks for the homepage, with a sensible fallback. */
export function useFeaturedRecipes(count = 6) {
  const { recipes } = useRecipes()
  return useMemo(() => {
    const flagged = recipes.filter((r) => r.featured)
    return (flagged.length ? flagged : recipes).slice(0, count)
  }, [recipes, count])
}

export { fallbackRecipes }
