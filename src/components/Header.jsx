import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import './Header.css'

export default function Header() {
  const { lang, toggleLang, t, isRTL } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="header__inner">
        {/* Logo */}
        <Link to="/" className="header__brand">
          <img src="/images/logo.jpg" alt="Avocado Cooks Logo" className="header__logo" />
          <span className="header__name">{t.siteName}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="header__nav">
          <Link to="/" className={`header__link ${location.pathname === '/' ? 'active' : ''}`}>
            {t.home}
          </Link>
          <Link to="/recipes" className={`header__link ${location.pathname === '/recipes' ? 'active' : ''}`}>
            {t.recipes}
          </Link>
        </nav>

        {/* Right Side */}
        <div className="header__actions">
          <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
            <span className={lang === 'en' ? 'lang-toggle__active' : ''}>EN</span>
            <span className="lang-toggle__divider">|</span>
            <span className={lang === 'ar' ? 'lang-toggle__active' : ''}>AR</span>
          </button>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <Link to="/" className="mobile-menu__link">{t.home}</Link>
        <Link to="/recipes" className="mobile-menu__link">{t.recipes}</Link>
      </div>
    </header>
  )
}
