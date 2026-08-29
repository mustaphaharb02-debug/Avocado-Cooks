import React from 'react'

/**
 * One language's worth of a recipe: title, description, ingredients,
 * steps and notes. Rendered once for English and once for Arabic.
 *
 * Ingredients and steps are edited as plain text, one item per line —
 * far kinder than asking anyone to type a list in code.
 */
export default function RecipeEditorLangTab({ side, isArabic, onChange }) {
  return (
    <div className="admin-lang-body" dir={isArabic ? 'rtl' : 'ltr'}>
      <label className="admin-field">
        <span className="admin-field__label">{isArabic ? 'اسم الوصفة' : 'Title'}</span>
        <input
          className="admin-input"
          value={side.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </label>

      <label className="admin-field">
        <span className="admin-field__label">{isArabic ? 'وصف قصير' : 'Short description'}</span>
        <textarea
          className="admin-input admin-input--area"
          rows={2}
          value={side.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </label>

      <label className="admin-field">
        <span className="admin-field__label">
          {isArabic ? 'المكونات — مكون في كل سطر' : 'Ingredients — one per line'}
        </span>
        <textarea
          className="admin-input admin-input--area"
          rows={8}
          value={side.ingredients}
          onChange={(e) => onChange({ ingredients: e.target.value })}
        />
      </label>

      <label className="admin-field">
        <span className="admin-field__label">
          {isArabic ? 'خطوات التحضير — خطوة في كل سطر' : 'Steps — one per line'}
        </span>
        <textarea
          className="admin-input admin-input--area"
          rows={8}
          value={side.steps}
          onChange={(e) => onChange({ steps: e.target.value })}
        />
      </label>

      <label className="admin-field">
        <span className="admin-field__label">{isArabic ? 'ملاحظات (اختياري)' : 'Notes (optional)'}</span>
        <textarea
          className="admin-input admin-input--area"
          rows={2}
          value={side.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
        />
      </label>
    </div>
  )
}
