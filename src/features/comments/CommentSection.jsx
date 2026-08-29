import React, { useState } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import useComments, { NAME_MAX, TEXT_MAX } from './useComments'
import './CommentSection.css'

export default function CommentSection({ recipeId }) {
  const { t, isRTL } = useLang()

  const { comments, addComment, loading, error } = useComments(recipeId)

  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}

    if (!name.trim()) e.name = t.nameRequired
    if (!text.trim()) e.text = t.commentRequired

    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errs = validate()
    setErrors(errs)
    setSendError('')

    if (Object.keys(errs).length > 0) return

    setSending(true)
    try {
      await addComment({ name: name.trim(), text: text.trim() })

      setName('')
      setText('')
      setErrors({})
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      console.error('[comments] could not post:', err)
      setSendError(
        isRTL
          ? 'تعذّر إرسال تعليقك. حاول مرة أخرى.'
          : 'Your comment could not be sent. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="comment-section" dir={isRTL ? 'rtl' : 'ltr'}>
      <h2 className="comment-section__title">
        <span className="comment-section__icon">💬</span>
        {t.comments}
      </h2>

      {/* Form */}
      <form className="comment-form" onSubmit={handleSubmit} noValidate>
        <div className="comment-form__row">
          <div className={`comment-form__field ${errors.name ? 'has-error' : ''}`}>
            <label className="comment-form__label">{t.yourName}</label>

            <input
              type="text"
              className="comment-form__input"
              value={name}
              maxLength={NAME_MAX}
              onChange={(e) => setName(e.target.value)}
              placeholder={isRTL ? 'اسمك هنا...' : 'Your name...'}
            />

            {errors.name && (
              <span className="comment-form__error">
                {errors.name}
              </span>
            )}
          </div>
        </div>

        <div className={`comment-form__field ${errors.text ? 'has-error' : ''}`}>
          <label className="comment-form__label">
            {t.yourComment}
          </label>

          <textarea
            className="comment-form__textarea"
            value={text}
            maxLength={TEXT_MAX}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.yourComment}
            rows={4}
          />

          {errors.text && (
            <span className="comment-form__error">
              {errors.text}
            </span>
          )}
        </div>

        <div className="comment-form__actions">
          <button type="submit" className="comment-form__submit" disabled={sending}>
            {sending ? (isRTL ? 'جارٍ الإرسال…' : 'Sending…') : t.submit}
          </button>

          {submitted && (
            <span className="comment-form__success animate-fadeIn">
              ✓ {isRTL ? 'تم الإرسال!' : 'Submitted!'}
            </span>
          )}

          {sendError && <span className="comment-form__error">{sendError}</span>}
        </div>
      </form>

      {/* Comments List */}
      <div className="comment-list">
        {loading ? (
          <p className="comment-list__empty">{isRTL ? 'جارٍ التحميل…' : 'Loading…'}</p>
        ) : error ? (
          <p className="comment-list__empty">
            {isRTL ? 'تعذّر تحميل التعليقات.' : 'Comments could not be loaded.'}
          </p>
        ) : comments.length === 0 ? (
          <p className="comment-list__empty">
            {t.noComments} 🥑
          </p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="comment-item animate-fadeInUp">
              <div className="comment-item__avatar">
                {c.name?.charAt(0).toUpperCase()}
              </div>

              <div className="comment-item__body">
                <div className="comment-item__header">
                  <strong className="comment-item__name">
                    {c.name}
                  </strong>

                  <span className="comment-item__date">
                    {c.createdAt?.toDate
                      ? c.createdAt.toDate().toLocaleDateString(
                          // ar-SA would print Hijri dates
                          isRTL ? 'ar-EG' : 'en-GB',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )
                      : ''}
                  </span>
                </div>

                <p className="comment-item__text">
                  {c.text}
                </p>

                {/* Mona's reply, when she has written one */}
                {c.reply && (
                  <div className="comment-reply">
                    <div className="comment-reply__head">
                      <span className="comment-reply__badge">🥑</span>
                      <strong className="comment-reply__who">{t.replyFrom}</strong>
                      {c.repliedAt?.toDate && (
                        <span className="comment-reply__date">
                          {c.repliedAt.toDate().toLocaleDateString(
                            isRTL ? 'ar-EG' : 'en-GB',
                            { year: 'numeric', month: 'short', day: 'numeric' }
                          )}
                        </span>
                      )}
                    </div>
                    <p className="comment-reply__text">{c.reply}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
