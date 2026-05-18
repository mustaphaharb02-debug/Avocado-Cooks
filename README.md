# 🥑 Avocado Cooks Website

A bilingual (English/Arabic) food recipe website built with React + Vite.

---

## 📁 Project Structure

```
avo_cooks/
├── public/
│   └── images/              ← 📸 PUT ALL YOUR IMAGES HERE
│       ├── logo.jpg         ← Your avocado logo (required)
│       ├── musakhan-rolls.jpg
│       ├── avocado-toast.jpg
│       └── lentil-soup.jpg
├── src/
│   ├── components/
│   │   ├── Header.jsx        ← Top navigation bar
│   │   ├── Hero.jsx          ← Homepage hero section
│   │   ├── RecipeCard.jsx    ← Recipe card for gallery
│   │   ├── CommentSection.jsx← Comments & suggestions
│   │   └── Footer.jsx        ← Footer
│   ├── context/
│   │   └── LanguageContext.jsx ← EN/AR language system
│   ├── data/
│   │   └── recipes.js        ← ✏️ EDIT YOUR RECIPES HERE
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── RecipesPage.jsx
│   │   └── RecipeDetails.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Setup in PyCharm

### Step 1 — Install Node.js
1. Go to https://nodejs.org and download the **LTS** version
2. Install it (check "Add to PATH" if prompted)
3. Verify: open a terminal and run `node --version`

### Step 2 — Open the project in PyCharm
1. Open PyCharm
2. Click **File → Open** and select the `avo_cooks` folder
3. PyCharm will detect it as a JavaScript/Node project

### Step 3 — Install dependencies
Open the **Terminal** inside PyCharm (bottom panel) and run:
```bash
npm install
```
This installs React, Vite, and all required packages.

### Step 4 — Run the website locally
```bash
npm run dev
```
Then open your browser at: **http://localhost:5173**

### Step 5 — Build for production (when ready to publish)
```bash
npm run build
```
The built files will be in the `dist/` folder.

---

## 🖼️ Where to Place Images

All images go inside `public/images/`:

| File | Purpose |
|------|---------|
| `logo.jpg` | Your avocado logo (used in header & hero) |
| `musakhan-rolls.jpg` | Photo for Musakhan Rolls recipe |
| `avocado-toast.jpg` | Photo for Avocado Toast recipe |
| `lentil-soup.jpg` | Photo for Lentil Soup recipe |

**Rules:**
- Images can be `.jpg`, `.jpeg`, `.png`, or `.webp`
- Keep file names lowercase with hyphens (no spaces)
- Recommended size: 800×600px or larger
- If an image is missing, the site shows a 🥑 placeholder automatically

---

## ✏️ How to Add or Edit Recipes

Open `src/data/recipes.js`

Each recipe looks like this:
```js
{
  id: 4,                          // unique number
  image: '/images/your-dish.jpg', // photo file name
  category: 'Chicken',            // category label
  en: {
    title: 'My Recipe',
    description: 'Short description.',
    ingredients: ['item 1', 'item 2'],
    steps: ['Step one.', 'Step two.'],
    notes: 'Optional tip.',        // or remove this line
  },
  ar: {
    title: 'وصفتي',
    description: 'وصف قصير.',
    ingredients: ['مكون 1', 'مكون 2'],
    steps: ['الخطوة الأولى.', 'الخطوة الثانية.'],
    notes: 'ملاحظة اختيارية.',
  },
},
```

Add it at the end of the `recipes` array in that file, then save.

---

## 🌍 Language System

- Click the **EN | AR** button in the header to switch languages
- Arabic switches to Right-to-Left (RTL) layout automatically
- To add new translations, edit `src/context/LanguageContext.jsx` under the `translations` object

---

## 💬 Comments

Comments are saved in the browser's **localStorage** per recipe.
They are NOT shared between visitors — each visitor sees their own comments only.

To enable shared comments in the future, you would need a backend (e.g. Firebase or Supabase).

---

## 🎨 Customizing Colors

Open `src/index.css` and edit the CSS variables at the top:
```css
:root {
  --green-dark: #4a7c59;
  --cream: #fdf8f0;
  /* ... */
}
```

---

## 📱 Mobile

The website is fully responsive and works on phones and tablets.
