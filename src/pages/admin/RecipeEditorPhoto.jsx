import React, { useRef, useState } from 'react'

import { uploadRecipeImage, uploadErrorMessage } from '../../features/recipes/recipesApi'

/**
 * The photo half of the recipe form: upload a file, or paste a link.
 *
 * Uploading is the only part of the editor that talks to Cloud Storage,
 * so it keeps its own "uploading" and error state here rather than
 * adding two more flags to the form.
 */
export default function RecipeEditorPhoto({ image, suggestions, error, onChange, onUploadingChange }) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInput = useRef(null)

  const handleUpload = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = '' // let the same file be picked again after an error
    if (!file) return

    setUploading(true)
    onUploadingChange?.(true)
    setUploadError('')
    try {
      const url = await uploadRecipeImage(file)
      onChange(url)
    } catch (err) {
      console.error('[admin] image upload failed:', err)
      setUploadError(uploadErrorMessage(err))
    } finally {
      setUploading(false)
      onUploadingChange?.(false)
    }
  }

  return (
    <div className="admin-card">
      <h3 className="admin-card__title">Photo</h3>
      <div className="admin-photo">
        <div className="admin-photo__preview">
          {image ? (
            <img src={image} alt="" onError={(e) => { e.currentTarget.style.opacity = 0.15 }} />
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
              value={image}
              onChange={(e) => onChange(e.target.value)}
            />
            <datalist id="admin-images">
              {suggestions.map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </label>

          {uploadError && <p className="admin-alert admin-alert--warn">{uploadError}</p>}
          {error && <span className="admin-field__error">{error}</span>}
        </div>
      </div>
    </div>
  )
}
