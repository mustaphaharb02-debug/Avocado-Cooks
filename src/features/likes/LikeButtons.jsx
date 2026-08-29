import React from 'react'

import { useLang } from '../../i18n/LanguageContext'
import useLikes from './useLikes'

// The 💚 / ✕ pair, in the two sizes the site uses.
//
//   variant="card"   small buttons on a recipe tile
//   variant="detail" large buttons on the recipe page
//
// Both used to be written out by hand in their own file with the same
// logic behind them. The markup and class names below are exactly what
// each place had before, so the design is unchanged — only the
// duplication is gone.

export default function LikeButtons({ recipeId, variant = 'card' }) {
  const { t } = useLang()
  const { likes, dislikes, liked, disliked, handleLike, handleDislike, saving } =
    useLikes(recipeId)

  if (variant === 'detail') {
    return (
      <div className="recipe-details__reactions">
        <button
          className={`reaction-btn-lg ${liked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={saving}
          aria-pressed={liked}
        >
          <span>💚</span>
          <span>
            {likes} {t.likes}
          </span>
        </button>
        <button
          className={`reaction-btn-lg reaction-btn-lg--dis ${disliked ? 'disliked' : ''}`}
          onClick={handleDislike}
          disabled={saving}
          aria-pressed={disliked}
        >
          <span>✕</span>
          <span>
            {dislikes} {t.dislikes}
          </span>
        </button>
      </div>
    )
  }

  // On a card the buttons sit inside a link, so a click must not follow it.
  const onLike = (e) => {
    e.preventDefault()
    handleLike()
  }
  const onDislike = (e) => {
    e.preventDefault()
    handleDislike()
  }

  return (
    <div className="recipe-card__reactions">
      <button
        className={`reaction-btn reaction-btn--like ${liked ? 'active' : ''}`}
        onClick={onLike}
        disabled={saving}
        aria-pressed={liked}
        aria-label={`${t.likes}: ${likes}`}
      >
        <span className="reaction-btn__icon">💚</span>
        <span>{likes}</span>
      </button>
      <button
        className={`reaction-btn reaction-btn--dislike ${disliked ? 'active' : ''}`}
        onClick={onDislike}
        disabled={saving}
        aria-pressed={disliked}
        aria-label={`${t.dislikes}: ${dislikes}`}
      >
        <span className="reaction-btn__icon">✕</span>
        <span>{dislikes}</span>
      </button>
    </div>
  )
}
