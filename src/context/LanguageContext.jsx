import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    siteName: 'Avo Cooks',
    tagline: 'by Mona',
    home: 'Home',
    recipes: 'Recipes',
    featured: 'Featured Recipes',
    viewAll: 'View All Recipes',
    viewRecipe: 'View Recipe',
    ingredients: 'Ingredients',
    steps: 'Steps',
    notes: 'Notes',
    likes: 'Likes',
    dislikes: 'Dislikes',
    comments: 'Comments & Suggestions',
    yourName: 'Your Name',
    yourComment: 'Your comment or suggestion...',
    submit: 'Submit',
    backToRecipes: '← Back to Recipes',
    noComments: 'Be the first to comment!',
    nameRequired: 'Please enter your name.',
    commentRequired: 'Please write a comment.',
    footerText: 'Made with 🥑 love by Avo Cooks',
    followUs: 'Follow us on Instagram',
    gallery: 'Food Gallery',
    heroSub: 'Simple and warm meals for you',
    searchPlaceholder: 'Search recipes...',
    allCategories: 'All',
    postedOn: 'Posted',
    minutesRead: 'min read',
  },
  ar: {
    siteName: 'أفوكادو كوكس',
    tagline: 'وجبات بسيطة ودافئة لك',
    home: 'الرئيسية',
    recipes: 'الوصفات',
    featured: 'وصفات مميزة',
    viewAll: 'عرض كل الوصفات',
    viewRecipe: 'عرض الوصفة',
    ingredients: 'المكونات',
    steps: 'خطوات التحضير',
    notes: 'ملاحظات',
    likes: 'إعجاب',
    dislikes: 'لا يعجبني',
    comments: 'التعليقات والاقتراحات',
    yourName: 'اسمك',
    yourComment: 'تعليقك أو اقتراحك...',
    submit: 'إرسال',
    backToRecipes: 'العودة للوصفات ←',
    noComments: 'كن أول من يعلق!',
    nameRequired: 'الرجاء إدخال اسمك.',
    commentRequired: 'الرجاء كتابة تعليق.',
    footerText: 'صنع بـ 🥑 حب من أفوكادو كوكس',
    followUs: 'تابعونا على إنستغرام',
    gallery: 'معرض الأطعمة',
    heroSub: 'وصفات منزلية بكل حب، نشاركها معكم',
    searchPlaceholder: 'ابحث عن وصفة...',
    allCategories: 'الكل',
    postedOn: 'نُشر',
    minutesRead: 'دقائق قراءة',
  },
}

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
