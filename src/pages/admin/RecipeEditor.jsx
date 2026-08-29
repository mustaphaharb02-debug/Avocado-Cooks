import React, { useMemo, useState } from 'react'

import {
  listToText,
  textToList,
  validateRecipe,
} from '../../features/recipes/recipeModel'
import RecipeEditorPhoto from './RecipeEditorPhoto'
import RecipeEditorLangTab from './RecipeEditorLangTab'

const LANG_TABS = [
  { key: 'en', label: '🇬🇧 English' },
  { key: 'ar', label: '🇱🇧 العربية' },
]

/**
 * The add / edit form.
 *
 * This file owns the draft recipe and what happens when you press Save.
 * The photo controls live in RecipeEditorPhoto, and everything inside a
 * language tab lives in RecipeEditorLangTab — both were making this file
 * hard to read.
 *
 * Lists (ingredients, steps) are held as plain text while you edit — one
 * item per line — and turned back into lists on save.
 */
export default function RecipeEditor({ initial, existingRecipes, onSave, onCancel, isNew }) {
  const [draft, setDraft] = useState(() => ({
    ...initial,
    en: { ...initial.en, ingredients: listToText(initial.en.ingredients), steps: listToText(initial.en.steps) },
    ar: { ...initial.ar, ingredients: listToText(initial.ar.ingredients), steps: listToText(initial.ar.steps) },
  }))
  const [tab, setTab] = useState('en')
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [uploading, setUploading] = useState(false)

  const categories = useMemo(
    () => [...new Set(existingRecipes.map((r) => r.category).filter(Boolean))].sort(),
    [existingRecipes]
  )
  const imageSuggestions = useMemo(
    () => [...new Set(existingRecipes.map((r) => r.image).filter((i) => i?.startsWith('/images/')))].sort(),
    [existingRecipes]
  )

  const idTaken = useMemo(() => {
    if (!isNew) return false
    return existingRecipes.some((r) => Number(r.id) === Number(draft.id))
  }, [isNew, draft.id, existingRecipes])

  const set = (patch) => setDraft((d) => ({ ...d, ...patch }))
  const setLang = (lang, patch) => setDraft((d) => ({ ...d, [lang]: { ...d[lang], ...patch } }))

  const toRecipe = () => ({
    ...draft,
    id: Number(draft.id),
    en: { ...draft.en, ingredients: textToList(draft.en.ingredients), steps: textToList(draft.en.steps) },
    ar: { ...draft.ar, ingredients: textToList(draft.ar.ingredients), steps: textToList(draft.ar.steps) },
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const recipe = toRecipe()

    const found = validateRecipe(recipe)
    if (idTaken) found.id = 'Another recipe already uses this ID.'
    setErrors(found)
    if (Object.keys(found).length) return

    setSaving(true)
    setSaveError('')
    try {
      await onSave(recipe)
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const isArabic = tab === 'ar'

  return (
    <form className="admin-editor" onSubmit={handleSubmit}>
      <div className="admin-editor__head">
        <h2>{isNew ? '➕ New recipe' : `✏️ Editing “${draft.en.title || draft.ar.title}”`}</h2>
        <div className="admin-editor__head-actions">
          <button type="button" className="admin-btn admin-btn--ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="admin-btn" disabled={saving || uploading}>
            {saving ? 'Saving…' : 'Save recipe'}
          </button>
        </div>
      </div>

      {saveError && <p className="admin-alert admin-alert--error">{saveError}</p>}

      {/* ---------- shared settings ---------- */}
      <div className="admin-card">
        <div className="admin-grid">
          <label className="admin-field">
            <span className="admin-field__label">Recipe ID</span>
            <input
              type="number"
              min="1"
              className="admin-input"
              value={draft.id}
              disabled={!isNew}
              onChange={(e) => set({ id: e.target.value })}
            />
            <span className="admin-field__hint">
              {isNew ? 'Used in the recipe link. Keep the suggested number.' : 'Cannot change — likes and comments are attached to it.'}
            </span>
            {errors.id && <span className="admin-field__error">{errors.id}</span>}
          </label>

          <label className="admin-field">
            <span className="admin-field__label">Category</span>
            <input
              className="admin-input"
              list="admin-categories"
              placeholder="Chicken, Pasta, Salad…"
              value={draft.category}
              onChange={(e) => set({ category: e.target.value })}
            />
            <datalist id="admin-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {errors.category && <span className="admin-field__error">{errors.category}</span>}
          </label>
        </div>

        <div className="admin-toggles">
          <label className="admin-toggle">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) => set({ published: e.target.checked })}
            />
            <span>Visible on the website</span>
          </label>
          <label className="admin-toggle">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) => set({ featured: e.target.checked })}
            />
            <span>⭐ Show on the homepage</span>
          </label>
        </div>
      </div>

      {/* ---------- photo ---------- */}
      <RecipeEditorPhoto
        image={draft.image}
        suggestions={imageSuggestions}
        error={errors.image}
        onChange={(image) => set({ image })}
        onUploadingChange={setUploading}
      />

      {/* ---------- language tabs ---------- */}
      <div className="admin-card">
        <div className="admin-tabs">
          {LANG_TABS.map((l) => (
            <button
              key={l.key}
              type="button"
              className={`admin-tab ${tab === l.key ? 'is-active' : ''}`}
              onClick={() => setTab(l.key)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <RecipeEditorLangTab
          side={draft[tab]}
          isArabic={isArabic}
          onChange={(patch) => setLang(tab, patch)}
        />

        {(errors.title || errors.ingredients || errors.steps) && (
          <p className="admin-alert admin-alert--error">
            {errors.title || errors.ingredients || errors.steps}{' '}
            <span className="admin-field__hint">(check both language tabs)</span>
          </p>
        )}
      </div>

      <div className="admin-editor__foot">
        <button type="button" className="admin-btn admin-btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="admin-btn" disabled={saving || uploading}>
          {saving ? 'Saving…' : 'Save recipe'}
        </button>
      </div>
    </form>
  )
}
