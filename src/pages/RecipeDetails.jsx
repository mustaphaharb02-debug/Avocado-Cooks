import React, { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { recipes } from '../data/recipes'
import CommentSection from '../components/CommentSection'
import useFirebaseReactions from "../hooks/useFirebaseReactions";
import './RecipeDetails.css'

export default function RecipeDetails() {
  const { id } = useParams()
  const { lang, t, isRTL } = useLang()
  const recipe = recipes.find(r => r.id === Number(id))
  const [imgError, setImgError] = useState(false)

  // Hook is always called — before any conditional return
  const { likes, dislikes, liked, disliked, handleLike, handleDislike } =
    useFirebaseReactions(recipe?.id ?? 0)

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
          {!imgError ? (
            <img
              src={recipe.image}
              alt={content.title}
              className="recipe-details__img"
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
            >
              <span>💚</span>
              <span>{likes} {t.likes}</span>
            </button>
            <button
              className={`reaction-btn-lg reaction-btn-lg--dis ${disliked ? 'disliked' : ''}`}
              onClick={handleDislike}
            >
              <span>✕</span>
              <span>{dislikes} {t.dislikes}</span>
            </button>
          </div>
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
