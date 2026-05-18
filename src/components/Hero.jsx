import React from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import './Hero.css'

export default function Hero() {
  const { t, isRTL } = useLang()

  return (
    <section className="hero" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Decorative blobs */}
      <div className="hero__blob hero__blob--1" aria-hidden />
      <div className="hero__blob hero__blob--2" aria-hidden />

      {/* Floating avocados */}
      <div className="hero__deco hero__deco--a" aria-hidden>🥑</div>
      <div className="hero__deco hero__deco--b" aria-hidden>🌿</div>
      <div className="hero__deco hero__deco--c" aria-hidden>💛</div>
      <div className="hero__deco hero__deco--d" aria-hidden>🥑</div>

      <div className="hero__content">
        {/* Logo */}
        <div className="hero__logo-wrap animate-scaleIn">
          <img src="/images/logo.jpg" alt="Avo Cooks Logo" className="hero__logo" />
        </div>

        <h1 className="hero__title animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          {t.siteName}
        </h1>

        <p className="hero__tagline animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {t.tagline}
        </p>

        <p className="hero__sub animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          {t.heroSub}
        </p>

        <div className="hero__cta animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <Link to="/recipes" className="btn btn--primary">
            {t.viewAll}
          </Link>
        </div>
      </div>

      {/* Wave divider */}
      <div className="hero__wave" aria-hidden>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--cream)" />
        </svg>
      </div>
    </section>
  )
}
