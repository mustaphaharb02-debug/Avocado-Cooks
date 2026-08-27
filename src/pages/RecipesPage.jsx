import React, { useMemo, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { useLang } from '../context/LanguageContext'
import { useRecipes } from '../context/RecipesContext'
import './RecipesPage.css'

export default function RecipesPage() {
  const { lang, t, isRTL } = useLang()
  const { recipes, loading } = useRecipes()
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(
    () => ['All', ...new Set(recipes.map(r => r.category).filter(Boolean))],
    [recipes]
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return recipes.filter(r => {
      const content = r[lang]
      const matchSearch =
        !q ||
        content.title.toLowerCase().includes(q) ||
        content.description.toLowerCase().includes(q)
      const matchCategory = category === 'All' || r.category === category
      return matchSearch && matchCategory
    })
  }, [recipes, lang, search, category])

  // Arabic labels for the categories that have one; anything a new recipe
  // introduces simply shows its own name.
  const catLabel = isRTL ? {
    All: 'الكل', Chicken: 'دجاج', Vegetarian: 'نباتي', Soup: 'شوربة', Pastry: 'معجنات',
    Pasta: 'باستا', Salad: 'سلطة', Dessert: 'حلويات', Breakfast: 'فطور', Seafood: 'مأكولات بحرية',
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
        {loading && recipes.length === 0 ? (
          <div className="page-state">
            <span className="page-state__icon">🥑</span>
            <p>{isRTL ? 'جارٍ التحميل…' : 'Loading recipes…'}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="recipes-page__empty">
            <span className="ingredient-dot">•</span>
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
