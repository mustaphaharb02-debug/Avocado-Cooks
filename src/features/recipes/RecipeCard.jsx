import React from 'react'
import { Link } from 'react-router-dom'

import { useLang } from '../../i18n/LanguageContext'
import LikeButtons from '../likes/LikeButtons'
import RecipeImage from './RecipeImage'
import './RecipeCard.css'

// One recipe tile. Used on the home page and the recipes page.

export default function RecipeCard({ recipe }) {
  const { lang, t, isRTL } = useLang()
  const content = recipe[lang]

  return (
    <article className="recipe-card animate-fadeInUp" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Image */}
      <Link to={`/recipe/${recipe.id}`} className="recipe-card__img-wrap">
        <RecipeImage
          src={recipe.image}
          alt={content.title}
          className="recipe-card__img"
          fallbackClassName="recipe-card__img-placeholder"
          fallback={<span className="ingredient-dot">•</span>}
        />
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
          <LikeButtons recipeId={recipe.id} variant="card" />

          <Link to={`/recipe/${recipe.id}`} className="recipe-card__cta">
            {t.viewRecipe}
          </Link>
        </div>
      </div>
    </article>
  )
}
