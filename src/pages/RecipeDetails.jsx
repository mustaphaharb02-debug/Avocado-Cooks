import React, { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useRecipes } from '../context/RecipesContext'
import CommentSection from '../components/CommentSection'
import useFirebaseReactions from '../hooks/useFirebaseReactions'
import './RecipeDetails.css'

export default function RecipeDetails() {
  const { id } = useParams()
  const { lang, t, isRTL } = useLang()
  const { recipes, loading } = useRecipes()
  const [imgError, setImgError] = useState(false)

  const recipe = recipes.find(r => r.id === Number(id))

  // Hooks must run on every render — before any conditional return.
  const { likes, dislikes, liked, disliked, handleLike, handleDislike, saving, error } =
    useFirebaseReactions(recipe?.id ?? 0)

  // Recipes arrive from Firestore, so wait before deciding it doesn't exist.
  if (!recipe && loading) {
    return (
      <main className="recipe-details">
        <div className="page-state">
          <span className="page-state__icon">🥑</span>
          <p>{isRTL ? 'جارٍ التحميل…' : 'Loading recipe…'}</p>
        </div>
      </main>
    )
  }

  if (!recipe) return <Navigate to="/recipes" replace />

  const content = recipe[lang]

  return (
    <main className="recipe-details" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="recipe-details__inner">
        {/* Back Button */}
        <Link to="/recipes" className="back-btn">
          {t.backToRecipes}
        </Link>

        {/* Hero Image */}
        <div className="recipe-details__img-wrap">
          {!imgError && recipe.image ? (
            <img
              src={recipe.image}
              alt={content.title}
              className="recipe-details__img"
              decoding="async"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="recipe-details__img-placeholder">
              <span className="ingredient-dot">•</span>
              <p>{content.title}</p>
            </div>
          )}
          <span className="recipe-details__category">{recipe.category}</span>
        </div>

        {/* Title & Description */}
        <div className="recipe-details__head">
          <h1 className="recipe-details__title">{content.title}</h1>
          <p className="recipe-details__desc">{content.description}</p>

          {/* Reactions */}
          <div className="recipe-details__reactions">
            <button
              className={`reaction-btn-lg ${liked ? 'liked' : ''}`}
              onClick={handleLike}
              disabled={saving}
              aria-pressed={liked}
            >
              <span>💚</span>
              <span>{likes} {t.likes}</span>
            </button>
            <button
              className={`reaction-btn-lg reaction-btn-lg--dis ${disliked ? 'disliked' : ''}`}
              onClick={handleDislike}
              disabled={saving}
              aria-pressed={disliked}
            >
              <span>✕</span>
              <span>{dislikes} {t.dislikes}</span>
            </button>
          </div>

          {error && (
            <p className="reaction-error">
              {isRTL
                ? 'تعذّر حفظ إعجابك. حاول مرة أخرى.'
                : 'Your like could not be saved. Please try again.'}
            </p>
          )}
        </div>

        {/* Content Grid */}
        <div className="recipe-details__body">
          {/* Ingredients */}
          <section className="recipe-section">
            <h2 className="recipe-section__title">
              <span className="recipe-section__icon">🛒</span>
              {t.ingredients}
            </h2>
            <ul className="ingredients-list">
              {content.ingredients.map((item, i) => (
                <li key={i} className="ingredients-list__item">
                  <span className="ingredients-list__bullet">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Steps */}
          <section className="recipe-section">
            <h2 className="recipe-section__title">
              <span className="recipe-section__icon">📝</span>
              {t.steps}
            </h2>
            <ol className="steps-list">
              {content.steps.map((step, i) => (
                <li key={i} className="steps-list__item">
                  <span className="steps-list__num">{i + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Notes */}
        {content.notes && (
          <div className="recipe-notes">
            <span className="recipe-notes__icon">💡</span>
            <div>
              <strong>{t.notes}:</strong> {content.notes}
            </div>
          </div>
        )}

        {/* Comments */}
        <CommentSection recipeId={recipe.id} />
      </div>
    </main>
  )
}
