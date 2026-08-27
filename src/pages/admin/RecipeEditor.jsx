import React, { useMemo, useRef, useState } from 'react'
import {
  listToText,
  textToList,
  validateRecipe,
} from '../../lib/recipeModel'
import { uploadRecipeImage, uploadErrorMessage } from '../../lib/adminApi'

const LANG_TABS = [
  { key: 'en', label: '🇬🇧 English' },
  { key: 'ar', label: '🇱🇧 العربية' },
]

/**
 * The add / edit form. Lists (ingredients, steps) are edited as plain
 * text — one item per line — which is far easier than a JSON array.
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
  const [uploadError, setUploadError] = useState('')
  const fileInput = useRef(null)

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

  const handleUpload = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = '' // let the same file be picked again after an error
    if (!file) return

    setUploading(true)
    setUploadError('')
    try {
      const url = await uploadRecipeImage(file)
      set({ image: url })
    } catch (err) {
      console.error('[admin] image upload failed:', err)
      setUploadError(uploadErrorMessage(err))
    } finally {
      setUploading(false)
    }
  }

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

  const side = draft[tab]
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
      <div className="admin-card">
        <h3 className="admin-card__title">Photo</h3>
        <div className="admin-photo">
          <div className="admin-photo__preview">
            {draft.image ? (
              <img src={draft.image} alt="" onError={(e) => { e.currentTarget.style.opacity = 0.15 }} />
            ) : (
              <span>🥑</span>
            )}
          </div>

          <div className="admin-photo__controls">
            <button
              type="button"
              className="admin-btn admin-btn--soft"
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Uploading…' : '📤 Upload a photo'}
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={handleUpload}
            />

            <label className="admin-field">
              <span className="admin-field__label">…or paste an image link / path</span>
              <input
                className="admin-input"
                list="admin-images"
                placeholder="/images/my-dish.jpg or https://…"
                value={draft.image}
                onChange={(e) => set({ image: e.target.value })}
              />
              <datalist id="admin-images">
                {imageSuggestions.map((i) => (
                  <option key={i} value={i} />
                ))}
              </datalist>
            </label>

            {uploadError && <p className="admin-alert admin-alert--warn">{uploadError}</p>}
            {errors.image && <span className="admin-field__error">{errors.image}</span>}
          </div>
        </div>
      </div>

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

        <div className="admin-lang-body" dir={isArabic ? 'rtl' : 'ltr'}>
          <label className="admin-field">
            <span className="admin-field__label">{isArabic ? 'اسم الوصفة' : 'Title'}</span>
            <input
              className="admin-input"
              value={side.title}
              onChange={(e) => setLang(tab, { title: e.target.value })}
            />
          </label>

          <label className="admin-field">
            <span className="admin-field__label">{isArabic ? 'وصف قصير' : 'Short description'}</span>
            <textarea
              className="admin-input admin-input--area"
              rows={2}
              value={side.description}
              onChange={(e) => setLang(tab, { description: e.target.value })}
            />
          </label>

          <label className="admin-field">
            <span className="admin-field__label">
              {isArabic ? 'المكونات — مكون في كل سطر' : 'Ingredients — one per line'}
            </span>
            <textarea
              className="admin-input admin-input--area"
              rows={8}
              value={side.ingredients}
              onChange={(e) => setLang(tab, { ingredients: e.target.value })}
            />
          </label>

          <label className="admin-field">
            <span className="admin-field__label">
              {isArabic ? 'خطوات التحضير — خطوة في كل سطر' : 'Steps — one per line'}
            </span>
            <textarea
              className="admin-input admin-input--area"
              rows={8}
              value={side.steps}
              onChange={(e) => setLang(tab, { steps: e.target.value })}
            />
          </label>

          <label className="admin-field">
            <span className="admin-field__label">{isArabic ? 'ملاحظات (اختياري)' : 'Notes (optional)'}</span>
            <textarea
              className="admin-input admin-input--area"
              rows={2}
              value={side.notes}
              onChange={(e) => setLang(tab, { notes: e.target.value })}
            />
          </label>
        </div>

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
