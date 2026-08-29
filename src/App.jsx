import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { RecipesProvider } from './features/recipes/RecipesContext'
import { LikesProvider } from './features/likes/LikesContext'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetails from './pages/RecipeDetails'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

// The dashboard is only downloaded when someone opens /admin.
const AdminArea = lazy(() => import('./pages/admin/AdminArea'))

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

function PublicSite() {
  return (
    <Layout>
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/recipes"    element={<RecipesPage />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="*"           element={<HomePage />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <RecipesProvider>
          <LikesProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<div className="route-loading">🥑</div>}>
                <Routes>
                  {/* Admin — its own login, no site header/footer */}
                  <Route path="/admin/*" element={<AdminArea />} />

                  {/* Public website */}
                  <Route path="/*" element={<PublicSite />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </LikesProvider>
        </RecipesProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}
