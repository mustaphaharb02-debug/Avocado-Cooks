import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useRecipes } from '../features/recipes/RecipesContext'
import CommentSection from '../features/comments/CommentSection'
import RecipeImage from '../features/recipes/RecipeImage'
import LikeButtons from '../features/likes/LikeButtons'
import useLikes from '../features/likes/useLikes'
import './RecipeDetails.css'

export default function RecipeDetails() {
  const { id } = useParams()
  const { lang, t, isRTL } = useLang()
  const { recipes, loading } = useRecipes()
  const recipe = recipes.find(r => r.id === Number(id))

  // Hooks must run on every render — before any conditional return.
  // The buttons live in <LikeButtons>; this is only here for the error line.
  const { error } = useLikes(recipe?.id ?? 0)

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
          <RecipeImage
            src={recipe.image}
            alt={content.title}
            className="recipe-details__img"
            fallbackClassName="recipe-details__img-placeholder"
            loading="eager"
            fallback={
              <>
                <span className="ingredient-dot">•</span>
                <p>{content.title}</p>
              </>
            }
          />
          <span className="recipe-details__category">{recipe.category}</span>
        </div>

        {/* Title & Description */}
        <div className="recipe-details__head">
          <h1 className="recipe-details__title">{content.title}</h1>
          <p className="recipe-details__desc">{content.description}</p>

          {/* Reactions */}
          <LikeButtons recipeId={recipe.id} variant="detail" />

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
