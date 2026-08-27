// =============================================
//  Shared shape of a recipe, used by both the
//  public website and the admin dashboard.
// =============================================

const LANGS = ['en', 'ar']

function cleanList(value) {
  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((v) => v.trim())
      .filter(Boolean)
  }
  return []
}

function cleanSide(side = {}) {
  return {
    title: String(side.title ?? '').trim(),
    description: String(side.description ?? '').trim(),
    ingredients: cleanList(side.ingredients),
    steps: cleanList(side.steps),
    notes: String(side.notes ?? '').trim(),
  }
}

// Only ordinary web links may reach an <img src>. Anything else —
// javascript:, data:, vbscript: — is dropped rather than rendered, so a
// bad value in the database cannot turn into a script on the page.
const SAFE_IMAGE = /^(https?:\/\/|\/)\S*$/i

export function safeImage(value) {
  const url = String(value ?? '').trim()
  return SAFE_IMAGE.test(url) ? url : ''
}

/** Firestore document (or static seed object) → the shape components use. */
export function normalizeRecipe(raw = {}, docId) {
  const id = Number(raw.id ?? docId)

  const recipe = {
    id: Number.isFinite(id) ? id : 0,
    image: safeImage(raw.image),
    category: String(raw.category ?? 'Other').trim() || 'Other',
    featured: raw.featured === true,
    published: raw.published !== false, // default: visible
    order: Number.isFinite(Number(raw.order)) ? Number(raw.order) : Number(id) || 0,
  }

  for (const lang of LANGS) recipe[lang] = cleanSide(raw[lang])

  // A recipe with no Arabic text still has to render in Arabic mode.
  if (!recipe.ar.title) recipe.ar = { ...recipe.ar, title: recipe.en.title }
  if (!recipe.en.title) recipe.en = { ...recipe.en, title: recipe.ar.title }

  return recipe
}

/** The shape components use → the document we store in Firestore. */
export function toFirestoreRecipe(recipe) {
  const normalized = normalizeRecipe(recipe)
  return {
    id: normalized.id,
    image: normalized.image,
    category: normalized.category,
    featured: normalized.featured,
    published: normalized.published,
    order: normalized.order,
    en: normalized.en,
    ar: normalized.ar,
  }
}

/** An empty recipe for the "new recipe" form. */
export function emptyRecipe(nextId = 1) {
  return {
    id: nextId,
    image: '',
    category: '',
    featured: false,
    published: true,
    order: nextId,
    en: { title: '', description: '', ingredients: [], steps: [], notes: '' },
    ar: { title: '', description: '', ingredients: [], steps: [], notes: '' },
  }
}

/** Returns a map of field → message. Empty object means "all good". */
export function validateRecipe(recipe) {
  const errors = {}

  if (!Number.isFinite(Number(recipe.id)) || Number(recipe.id) <= 0) {
    errors.id = 'ID must be a positive number.'
  }
  if (!recipe.en?.title?.trim() && !recipe.ar?.title?.trim()) {
    errors.title = 'Give the recipe a title (English or Arabic).'
  }
  if (!recipe.category?.trim()) {
    errors.category = 'Pick or type a category.'
  }
  if (!recipe.image?.trim()) {
    errors.image = 'Add a photo — upload one or paste an image link.'
  } else if (!safeImage(recipe.image)) {
    errors.image = 'The image link must start with https:// (or with / for a file in this project).'
  }
  const hasIngredients =
    cleanList(recipe.en?.ingredients).length || cleanList(recipe.ar?.ingredients).length
  if (!hasIngredients) errors.ingredients = 'Add at least one ingredient.'

  const hasSteps = cleanList(recipe.en?.steps).length || cleanList(recipe.ar?.steps).length
  if (!hasSteps) errors.steps = 'Add at least one step.'

  return errors
}

/** Lists are edited as one-item-per-line text in the dashboard. */
export const listToText = (list) => (Array.isArray(list) ? list.join('\n') : String(list ?? ''))
export const textToList = cleanList

export function nextRecipeId(recipes = []) {
  return recipes.reduce((max, r) => Math.max(max, Number(r.id) || 0), 0) + 1
}
