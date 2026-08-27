import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import useFirebaseReactions from '../hooks/useFirebaseReactions'
import './RecipeCard.css'

export default function RecipeCard({ recipe }) {
  const { lang, t, isRTL } = useLang()
  const [imgError, setImgError] = useState(false)

  const { likes, dislikes, liked, disliked, handleLike, handleDislike, saving } =
    useFirebaseReactions(recipe.id)

  const content = recipe[lang]

  const onLike    = (e) => { e.preventDefault(); handleLike() }
  const onDislike = (e) => { e.preventDefault(); handleDislike() }

  return (
    <article className="recipe-card animate-fadeInUp" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Image */}
      <Link to={`/recipe/${recipe.id}`} className="recipe-card__img-wrap">
        {!imgError && recipe.image ? (
          <img
            src={recipe.image}
            alt={content.title}
            className="recipe-card__img"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="recipe-card__img-placeholder">
            <span className="ingredient-dot">•</span>
          </div>
        )}
        <div className="recipe-card__overlay">
          <span>{t.viewRecipe} →</span>
        </div>
        <span className="recipe-card__category">{recipe.category}</span>
      </Link>

      {/* Body */}
      <div className="recipe-card__body">
        <Link to={`/recipe/${recipe.id}`} className="recipe-card__title">
          {content.title}
        </Link>
        <p className="recipe-card__desc">{content.description}</p>

        {/* Footer */}
        <div className="recipe-card__footer">
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

          <Link to={`/recipe/${recipe.id}`} className="recipe-card__cta">
            {t.viewRecipe}
          </Link>
        </div>
      </div>
    </article>
  )
}
