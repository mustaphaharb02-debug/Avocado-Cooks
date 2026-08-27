import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import RecipeCard from '../components/RecipeCard'
import { useLang } from '../context/LanguageContext'
import { useRecipes, useFeaturedRecipes } from '../context/RecipesContext'
import './HomePage.css'

export default function HomePage() {
  const { t, isRTL } = useLang()
  const { recipes, loading } = useRecipes()

  // Which recipes appear here is set with the ⭐ toggle in /admin.
  const featured = useFeaturedRecipes(6)

  return (
    <main className="home-page">
      <Hero />

      {/* Featured Recipes */}
      <section className="featured-section" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="featured-section__inner">
          {/* Section Header */}
          <div className="section-header">
            <span className="section-header__deco">🥑</span>
            <h2 className="section-header__title">{t.featured}</h2>
            <span className="section-header__deco">🥑</span>
          </div>

          {/* Cards Grid */}
          {loading && featured.length === 0 ? (
            <div className="page-state">
              <span className="page-state__icon">🥑</span>
              <p>{isRTL ? 'جارٍ التحميل…' : 'Loading recipes…'}</p>
            </div>
          ) : (
            <div className="recipe-grid">
              {featured.map((recipe, i) => (
                <div key={recipe.id} style={{ animationDelay: `${i * 0.12}s` }}>
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="featured-section__cta">
            <Link to="/recipes" className="btn btn--outline">
              {t.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Banner */}
      <section className="gallery-banner" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="gallery-banner__inner">
          <div className="gallery-banner__text">
            <h3 className="gallery-banner__title">{t.gallery}</h3>
            <p className="gallery-banner__sub">{t.heroSub}</p>
            <Link to="/recipes" className="btn btn--primary">{t.viewAll}</Link>
          </div>
          <div className="gallery-banner__mosaic">
            {recipes.map(r => (
              <Link key={r.id} to={`/recipe/${r.id}`} className="gallery-thumb">
                <GalleryThumb recipe={r} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function GalleryThumb({ recipe }) {
  const [err, setErr] = React.useState(false)
  return err || !recipe.image ? (
    <div className="gallery-thumb__placeholder">🥑</div>
  ) : (
    <img
      src={recipe.image}
      alt=""
      className="gallery-thumb__img"
      loading="lazy"
      decoding="async"
      onError={() => setErr(true)}
    />
  )
}
