import React, { useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { useLang } from '../context/LanguageContext'
import { recipes } from '../data/recipes'
import './RecipesPage.css'

export default function RecipesPage() {
  const { lang, t, isRTL } = useLang()
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')

  const categories = ['All', ...new Set(recipes.map(r => r.category))]

  const filtered = recipes.filter(r => {
    const content = r[lang]
    const matchSearch =
      content.title.toLowerCase().includes(search.toLowerCase()) ||
      content.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || r.category === category
    return matchSearch && matchCategory
  })

  const catLabel = isRTL ? {
    All: 'الكل', Chicken: 'دجاج', Vegetarian: 'نباتي', Soup: 'شوربة', Pastry: 'معجنات'
  } : {}

  return (
    <main className="recipes-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Page Header */}
      <div className="recipes-page__header">
        <div className="recipes-page__header-inner">
          <h1 className="recipes-page__title">
            <span className="recipes-page__title-deco">🥑</span>
            {t.recipes}
          </h1>
          <p className="recipes-page__sub">{t.tagline}</p>

          {/* Search */}
          <div className="recipes-search-wrap">
            <span className="recipes-search__icon">🔍</span>
            <input
              type="text"
              className="recipes-search"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="categories">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat === 'All' ? t.allCategories : (catLabel[cat] || cat)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="recipes-page__grid-wrap">
        {filtered.length === 0 ? (
          <div className="recipes-page__empty">
            <span>🥑</span>
            <p>{isRTL ? 'لا توجد وصفات مطابقة' : 'No recipes found'}</p>
          </div>
        ) : (
          <div className="recipe-grid">
            {filtered.map((recipe, i) => (
              <div key={recipe.id} style={{ animationDelay: `${i * 0.08}s` }}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
