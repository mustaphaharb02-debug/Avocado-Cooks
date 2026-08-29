import React from 'react'

/** One line in the dashboard's recipe list, with its five actions. */
export default function RecipeRow({ recipe, reaction, busy, onToggleFlag, onComments, onEdit, onDelete }) {
  return (
    <li className={`admin-row ${recipe.published ? '' : 'is-hidden'}`}>
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
          onClick={() => onToggleFlag(recipe, 'featured')}
          disabled={busy}
          title="Show or hide on the homepage"
        >
          {recipe.featured ? '⭐ Featured' : '☆ Feature'}
        </button>
        <button
          className="admin-btn admin-btn--soft admin-btn--sm"
          onClick={() => onToggleFlag(recipe, 'published')}
          disabled={busy}
          title="Show or hide on the website"
        >
          {recipe.published ? '👁 Visible' : '🚫 Hidden'}
        </button>
        <button
          className="admin-btn admin-btn--soft admin-btn--sm"
          onClick={() => onComments(recipe)}
        >
          💬 Comments
        </button>
        <button className="admin-btn admin-btn--sm" onClick={() => onEdit(recipe)}>
          ✏️ Edit
        </button>
        <button
          className="admin-btn admin-btn--danger admin-btn--sm"
          onClick={() => onDelete(recipe)}
          disabled={busy}
        >
          🗑
        </button>
      </div>
    </li>
  )
}
