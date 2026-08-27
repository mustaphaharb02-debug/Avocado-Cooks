import React from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { t, isRTL } = useLang()

  return (
    <footer className="footer" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="footer__inner">
        <div className="footer__brand">
          <img src="/images/logo.jpg" alt="Avo Cooks Logo" className="footer__logo" />
          <div>
            <p className="footer__name">{t.siteName}</p>
            <p className="footer__tagline">{t.tagline}</p>
          </div>
        </div>

        <nav className="footer__nav">
          <Link to="/" className="footer__link">{t.home}</Link>
          <Link to="/recipes" className="footer__link">{t.recipes}</Link>
          <a
            href="https://instagram.com/avo_cooks"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link footer__link--ig"
          >
            📸 {t.followUs}
          </a>
        </nav>

        <p className="footer__copy">
          {t.footerText}
          {/* discreet way in to the recipe manager */}
          <Link to="/admin" className="footer__admin" aria-label="Admin dashboard" title="Admin">
            {' '}·
          </Link>
        </p>
      </div>

      {/* Decorative wave top */}
      <div className="footer__wave" aria-hidden>
        <div className="footer__deco">🥑 🌿 💛 🥑 🌿 💛 🥑 🌿 💛</div>
      </div>
    </footer>
  )
}
