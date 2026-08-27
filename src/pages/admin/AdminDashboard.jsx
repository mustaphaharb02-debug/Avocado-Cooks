import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import useAdminRecipes from './useAdminRecipes'
import { useReactionsContext } from '../../context/ReactionsContext'
import {
  deleteRecipe,
  firestoreErrorMessage,
  importSeedRecipes,
  saveRecipe,
  SEED_RECIPE_COUNT,
} from '../../lib/adminApi'
import { emptyRecipe, nextRecipeId } from '../../lib/recipeModel'
import RecipeEditor from './RecipeEditor'
import CommentsPanel from './CommentsPanel'
import './Admin.css'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { allRecipes, loading, error, isEmpty, usingFallback } = useAdminRecipes()
  const { counts } = useReactionsContext()

  const [editing, setEditing] = useState(null) // recipe draft or null
  const [isNew, setIsNew] = useState(false)
  const [commentsFor, setCommentsFor] = useState(null)
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState('')
  const [problem, setProblem] = useState('')
  const [busy, setBusy] = useState(false)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return allRecipes
    return allRecipes.filter((r) =>
      [r.en.title, r.ar.title, r.category, String(r.id)]
        .join(' ')
        .toLowerCase()
        .includes(q)
    )
  }, [allRecipes, search])

  const startNew = () => {
    setProblem('')
    setNotice('')
    setEditing(emptyRecipe(nextRecipeId(allRecipes)))
    setIsNew(true)
  }

  const startEdit = (recipe) => {
    setProblem('')
    setNotice('')
    setEditing(recipe)
    setIsNew(false)
  }

  const handleSave = async (recipe) => {
    try {
      await saveRecipe(recipe)
      setEditing(null)
      setNotice(`Saved “${recipe.en.title || recipe.ar.title}”. It is live on the website now.`)
    } catch (err) {
      console.error('[admin] save failed:', err)
      throw new Error(firestoreErrorMessage(err))
    }
  }

  const handleDelete = async (recipe) => {
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
  }

  const toggleFlag = async (recipe, field) => {
    setBusy(true)
    setProblem('')
    try {
      await saveRecipe({ ...recipe, [field]: !recipe[field] })
    } catch (err) {
      setProblem(firestoreErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  const handleImport = async () => {
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
  }

  return (
    <div className="admin">
      <header className="admin__bar">
        <div className="admin__brand">
          <img src="/images/logo.jpg" alt="" className="admin__logo" />
          <div>
            <strong>Avo Cooks</strong>
            <span className="admin__subtitle">Recipe manager</span>
          </div>
        </div>

        <div className="admin__bar-actions">
          <Link to="/" className="admin-btn admin-btn--ghost" target="_blank" rel="noreferrer">
            View website ↗
          </Link>
          <span className="admin__user" title={user?.email}>
            {user?.email}
          </span>
          <button className="admin-btn admin-btn--soft" onClick={logout}>
            Sign out
          </button>
        </div>
      </header>

      <main className="admin__body">
        {error && (
          <p className="admin-alert admin-alert--error">
            Could not read recipes from Firestore: {firestoreErrorMessage(error)}
          </p>
        )}
        {isEmpty && !editing && (
          <div className="admin-alert admin-alert--info">
            <strong>The database has no recipes yet.</strong> The website is currently showing the
            {SEED_RECIPE_COUNT} recipes bundled in the code. Import them once, then you can edit
            everything here.
            <button className="admin-btn admin-btn--sm" onClick={handleImport} disabled={busy}>
              📥 Import the built-in recipes
            </button>
          </div>
        )}
        {usingFallback && !isEmpty && !error && (
          <p className="admin-alert admin-alert--warn">
            Showing the built-in recipe list — changes here need Firestore.
          </p>
        )}
        {notice && <p className="admin-alert admin-alert--ok">{notice}</p>}
        {problem && <p className="admin-alert admin-alert--error">{problem}</p>}

        {editing ? (
          <RecipeEditor
            initial={editing}
            isNew={isNew}
            existingRecipes={allRecipes}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <>
            <div className="admin__toolbar">
              <input
                className="admin-input admin-input--search"
                placeholder="🔍 Search recipes…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="admin__toolbar-right">
                <span className="admin__count">{allRecipes.length} recipes</span>
                <button className="admin-btn" onClick={startNew}>
                  ➕ New recipe
                </button>
              </div>
            </div>

            {loading ? (
              <p className="admin-empty">Loading recipes…</p>
            ) : filtered.length === 0 ? (
              <p className="admin-empty">No recipe matches “{search}”.</p>
            ) : (
              <ul className="admin-list">
                {filtered.map((recipe) => {
                  const reaction = counts[String(recipe.id)] ?? { likes: 0, dislikes: 0 }
                  return (
                    <li key={recipe.id} className={`admin-row ${recipe.published ? '' : 'is-hidden'}`}>
                      <div className="admin-row__thumb">
                        {recipe.image ? (
                          <img src={recipe.image} alt="" loading="lazy" />
                        ) : (
                          <span>🥑</span>
                        )}
                      </div>

                      <div className="admin-row__main">
                        <div className="admin-row__titles">
                          <strong>{recipe.en.title || '—'}</strong>
                          <span dir="rtl">{recipe.ar.title || '—'}</span>
                        </div>
                        <div className="admin-row__meta">
                          <span className="admin-chip">#{recipe.id}</span>
                          <span className="admin-chip">{recipe.category}</span>
                          <span className="admin-chip admin-chip--quiet">
                            💚 {reaction.likes} · ✕ {reaction.dislikes}
                          </span>
                          {recipe.featured && <span className="admin-chip admin-chip--star">⭐ homepage</span>}
                          {!recipe.published && <span className="admin-chip admin-chip--off">hidden</span>}
                        </div>
                      </div>

                      <div className="admin-row__actions">
                        <button
                          className="admin-btn admin-btn--soft admin-btn--sm"
                          onClick={() => toggleFlag(recipe, 'featured')}
                          disabled={busy}
                          title="Show or hide on the homepage"
                        >
                          {recipe.featured ? '⭐ Featured' : '☆ Feature'}
                        </button>
                        <button
                          className="admin-btn admin-btn--soft admin-btn--sm"
                          onClick={() => toggleFlag(recipe, 'published')}
                          disabled={busy}
                          title="Show or hide on the website"
                        >
                          {recipe.published ? '👁 Visible' : '🚫 Hidden'}
                        </button>
                        <button
                          className="admin-btn admin-btn--soft admin-btn--sm"
                          onClick={() => setCommentsFor(recipe)}
                        >
                          💬 Comments
                        </button>
                        <button className="admin-btn admin-btn--sm" onClick={() => startEdit(recipe)}>
                          ✏️ Edit
                        </button>
                        <button
                          className="admin-btn admin-btn--danger admin-btn--sm"
                          onClick={() => handleDelete(recipe)}
                          disabled={busy}
                        >
                          🗑
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </>
        )}
      </main>

      {commentsFor && (
        <CommentsPanel recipe={commentsFor} onClose={() => setCommentsFor(null)} />
      )}
    </div>
  )
}
