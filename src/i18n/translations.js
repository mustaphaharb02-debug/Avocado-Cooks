// =============================================
//  AVO COOKS — Every word the interface says
//
//  Two dictionaries with identical keys. Add a key to one, add it
//  to the other, or that phrase disappears in the second language.
//  The provider that serves these lives in LanguageContext.jsx.
// =============================================

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
    replyFrom: 'Reply from Avo Cooks',
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
    replyFrom: 'ردّ من أفوكادو كوكس',
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

// Category names are typed freely on each recipe (in English), so they
// need their own small dictionary. A category with no entry here simply
// shows its own name — nothing breaks.
export const categoryNames = {
  ar: {
    All: 'الكل',
    Chicken: 'دجاج',
    Vegetarian: 'نباتي',
    Soup: 'شوربة',
    Pastry: 'معجنات',
    Pasta: 'باستا',
    Salad: 'سلطة',
    Dessert: 'حلويات',
    Breakfast: 'فطور',
    Seafood: 'مأكولات بحرية',
  },
}
