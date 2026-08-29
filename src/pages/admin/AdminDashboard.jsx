import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import useAdminRecipes from '../../features/recipes/useAdminRecipes'
import { useLikesContext } from '../../features/likes/LikesContext'
import { firestoreErrorMessage, SEED_RECIPE_COUNT } from '../../features/recipes/recipesApi'
import { emptyRecipe, nextRecipeId } from '../../features/recipes/recipeModel'
import CommentsPanel from '../../features/comments/CommentsPanel'
import RecipeEditor from './RecipeEditor'
import RecipeRow from './RecipeRow'
import useDashboardActions from './useDashboardActions'
import './Admin.css'

/**
 * The recipe manager. This file lays out the screen; the writes it
 * performs live in useDashboardActions, and one row of the list lives
 * in RecipeRow.
 */
export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { allRecipes, loading, error, isEmpty, usingFallback } = useAdminRecipes()
  const { counts } = useLikesContext()
  const { busy, notice, problem, clearMessages, save, remove, toggleFlag, importSeed } =
    useDashboardActions()

  const [editing, setEditing] = useState(null) // recipe draft or null
  const [isNew, setIsNew] = useState(false)
  const [commentsFor, setCommentsFor] = useState(null)
  const [search, setSearch] = useState('')

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
    clearMessages()
    setEditing(emptyRecipe(nextRecipeId(allRecipes)))
    setIsNew(true)
  }

  const startEdit = (recipe) => {
    clearMessages()
    setEditing(recipe)
    setIsNew(false)
  }

  const handleSave = async (recipe) => {
    await save(recipe)
    setEditing(null)
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
            {' '}{SEED_RECIPE_COUNT} recipes bundled in the code. Import them once, then you can edit
            everything here.
            <button className="admin-btn admin-btn--sm" onClick={importSeed} disabled={busy}>
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
                {filtered.map((recipe) => (
                  <RecipeRow
                    key={recipe.id}
                    recipe={recipe}
                    reaction={counts[String(recipe.id)] ?? { likes: 0, dislikes: 0 }}
                    busy={busy}
                    onToggleFlag={toggleFlag}
                    onComments={setCommentsFor}
                    onEdit={startEdit}
                    onDelete={remove}
                  />
                ))}
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
