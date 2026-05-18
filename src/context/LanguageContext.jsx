import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    siteName: 'Avocado Cooks',
    tagline: 'Simple and warm meals for you',
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
    footerText: 'Made with 🥑 love by Avocado Cooks',
    followUs: 'Follow us on Instagram',
    gallery: 'Food Gallery',
    heroSub: 'Homemade recipes with heart, shared with you',
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

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    document.body.className = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
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
