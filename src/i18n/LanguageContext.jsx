import React, { createContext, useContext, useState, useEffect } from 'react'

import { translations } from './translations'

const LanguageContext = createContext()

const LANG_KEY = 'avo-cooks:lang'

function initialLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === 'en' || saved === 'ar') return saved
  } catch {
    // private browsing — fall through to the browser language
  }
  return typeof navigator !== 'undefined' && navigator.language?.startsWith('ar') ? 'ar' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.body.className = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem(LANG_KEY, lang)
    } catch {
      // ignore — the choice just won't survive a refresh
    }
  }, [lang])

  const t = translations[lang]
  const isRTL = lang === 'ar'

  const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en')

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
