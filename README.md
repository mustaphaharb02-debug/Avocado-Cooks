# 🥑 Avo Cooks

A bilingual (English / Arabic) recipe website built with React + Vite, with a
built-in **admin dashboard** so recipes are added from the browser — no code
editing needed.

---

## ⚡ First-time setup (do this once)

The website talks to Firebase. Three things must be set up in the
[Firebase console](https://console.firebase.google.com/project/avo-cooks) —
without them likes, comments and the dashboard will not work.

Do them **in this order** — each step depends on the one before it.

### 1. Publish the database rules  ← **this is what breaks likes**

Until this is done Firestore refuses every read and write, and the site
quietly falls back to the recipes bundled in the code: it looks normal, but
likes and comments do nothing.

Either paste them in the console:

1. Firebase Console → **Firestore Database → Rules**
2. Delete what is there, paste the whole contents of [`firestore.rules`](firestore.rules)
3. Press **Publish**, then do the same for [`storage.rules`](storage.rules) under **Storage → Rules**

…or publish both from the project root with the Firebase CLI:

```bash
npx firebase-tools login
npx firebase-tools deploy --only firestore:rules,storage
```

`firebase.json` and `.firebaserc` in the repo point the CLI at the `avo-cooks`
project, so there is nothing else to configure.

### 2. Create the admin account

1. Firebase Console → **Authentication → Sign-in method** → enable **Email/Password**
2. **Authentication → Users → Add user** → e-mail + password
3. That e-mail must appear in **both** places:
   - `isAdmin()` inside `firestore.rules` (and `storage.rules`), then publish again
   - `ADMIN_EMAILS` in `src/firebase.js` (or `VITE_ADMIN_EMAILS` in `.env`)

The e-mail list in `src/firebase.js` only decides who *sees* the dashboard.
The list inside the rules is what actually protects the data, so the two must
match — an address in the first but not the second gets a dashboard where
every save fails.

### 3. (Optional) Enable photo uploads

Firebase Console → **Storage → Get started**, then paste
[`storage.rules`](storage.rules) into **Storage → Rules** and publish.
If Storage is not enabled, the dashboard still works — you just paste an image
link instead of uploading a file.

---

## 🔐 Using the admin dashboard

Open **`/admin`** on the site (or click the small `·` at the end of the footer)
and sign in with the admin account.

| What you can do | How |
|---|---|
| Add a recipe | **➕ New recipe** → fill in English + Arabic → **Save** |
| Edit a recipe | **✏️ Edit** on any row |
| Photo | **📤 Upload a photo**, or paste `/images/name.jpg` / a link |
| Show on homepage | the **⭐ Feature** button |
| Hide from visitors | the **👁 Visible** button (keeps likes and comments) |
| Delete | 🗑 (asks for confirmation) |
| Read / delete comments | **💬 Comments** |

Ingredients and steps are typed **one per line** — no commas, no brackets.

**The first time**, the database has no recipes yet, so the dashboard shows a
banner with **📥 Import the built-in recipes**. Press it once to copy the
recipes from `src/data/recipes.js` into Firestore. After that, everything is
edited from the dashboard and the site reads from the database.

Do not skip this step. The rules tie every like and every comment to a real
recipe document, so on a recipe that exists only in the bundled fallback list
both are refused.

> `src/data/recipes.js` stays in the project as a safety net: if Firestore is
> unreachable, visitors still see those recipes instead of an empty site.

---

## 🚀 Running it locally

```bash
npm install     # once
npm run dev     # http://localhost:5173
npm run build   # production build into dist/
npm run preview # check the production build locally
```

Node 20+ (`.nvmrc`).

---

## 🧪 Testing the security rules

The rules are the whole security system — the browser talks to the database
directly, so nothing else stands between a stranger and the data. They have a
test suite that runs against the Firebase emulators, no internet or real
project needed.

```bash
npm run emulators        # one terminal (needs Java)
npm run test:rules       # another
```

48 checks: that hidden recipes stay hidden, that an unfiltered read of the
collection is refused, that comments cannot be back-dated or given extra
fields, that likes can only move by one and only on a recipe that exists, that
photos are admin-only, and that everything outside those paths is closed.

To click around a full copy of the site with a throwaway database:

```bash
npm run emulators
npm run dev:emulated
```

Create a test admin in the Auth emulator first:

```bash
curl -X POST "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=any" -H "Content-Type: application/json" -d "{\"email\":\"mustapha.harb02@gmail.com\",\"password\":\"whatever\",\"returnSecureToken\":true}"
```

Nothing here touches the real project: `.env.emulated` only applies to
`dev:emulated`, and the emulators forget everything when they stop.

---

## 🌍 Deploying

The site is a folder of static files, so any static host works. Two are
configured; you only need one.

### Firebase Hosting (`firebase.json`)

Serves the site from the same project that holds the database, so the admin
login works with no extra configuration — `avo-cooks.web.app` is already an
authorised sign-in domain.

```bash
npm run build
npx firebase-tools login          # once, opens your browser
npx firebase-tools deploy --only hosting
```

The site lands on `https://avo-cooks.web.app` (and `.firebaseapp.com`).
`firebase.json` sets a rewrite so `/recipe/5` and `/admin` survive a hard
refresh, caches the hashed files in `assets/` for a year, and keeps
`index.html` uncached so a deploy is picked up immediately.

To publish the rules at the same time:

```bash
npx firebase-tools deploy --only hosting,firestore:rules,storage
```

### Render (`render.yaml`)

A static site that builds on push:

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- **Rewrite rule `/*` → `/index.html`** — without it, opening `/recipe/5` or
  `/admin` directly returns 404. If the service was created by hand, add the
  rule under **Redirects/Rewrites** in the Render dashboard.

If you use a custom domain here, add it under **Firebase Console →
Authentication → Settings → Authorised domains**, or admin sign-in is refused
on that domain.

`dist/` and `node_modules/` are not committed — the host builds them.

---

## 📁 Project structure

```
src/
├── components/     Header, Footer, Hero, RecipeCard, CommentSection, …
├── context/
│   ├── LanguageContext.jsx   EN/AR + RTL, remembered between visits
│   ├── RecipesContext.jsx    recipes from Firestore (+ offline fallback)
│   ├── ReactionsContext.jsx  likes/dislikes — one shared listener
│   └── AuthContext.jsx       admin sign-in (loaded only on /admin)
├── hooks/          useFirebaseReactions, useFirebaseComments
├── lib/            recipeModel (shape + validation), adminApi (writes)
├── pages/
│   ├── HomePage, RecipesPage, RecipeDetails
│   └── admin/      AdminArea, AdminLogin, AdminDashboard, RecipeEditor
├── data/recipes.js seed + offline fallback
└── firebase.js     Firebase config and admin e-mail list
```

---

## 💾 How the data is stored

| Firestore path | What |
|---|---|
| `recipes/{id}` | one document per recipe (`en`, `ar`, `image`, `category`, `featured`, `published`) |
| `recipes/{id}/comments/{auto}` | visitor comments (`name`, `text`, `createdAt`) |
| `reactions/{id}` | `{ likes, dislikes }` counters |

A visitor's own vote is remembered in their browser (`localStorage`), so the
same person can't like the same recipe twice from that browser. The counts
themselves always come from the database.

---

## 🔒 What is public and what is protected

Everything on the website is enforced by `firestore.rules` and `storage.rules`
in the database itself, not by the browser — so it holds even for someone
using the API directly.

| Who | Can |
|---|---|
| Anyone | read **published** recipes, read likes and comments |
| Anyone | post a comment (name ≤ 50, text ≤ 1000 chars, server-stamped time) |
| Anyone | like/dislike a real recipe, ±1 at a time, never below zero |
| Admin only | create/edit/delete recipes, see **hidden** ones, delete comments, upload photos |
| Nobody | edit a comment after posting, or touch anything outside these paths |

The Firebase keys in `src/firebase.js` are **public by design** — they only
name the project. They are not a password, and the rules above are what keep
the data safe.

Worth knowing:

- Comments are not moderated before they appear. Delete unwanted ones from
  **💬 Comments** in the dashboard.
- A visitor's own vote is remembered only in their browser, so someone
  determined can vote repeatedly by clearing it. The counters can only move
  one at a time, so it stays slow and visible.
- To lock both of those down further, turn on **App Check** in the Firebase
  console — it rejects traffic that did not come from your website.

---

## 🎨 Customising colours

Edit the CSS variables at the top of `src/index.css`.
