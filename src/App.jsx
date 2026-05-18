import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetails from './pages/RecipeDetails'
import './App.css'
import ScrollToTop from "./components/ScrollToTop";

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/"            element={<HomePage />} />
            <Route path="/recipes"     element={<RecipesPage />} />
            <Route path="/recipe/:id"  element={<RecipeDetails />} />
            <Route path="*"            element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  )
}
