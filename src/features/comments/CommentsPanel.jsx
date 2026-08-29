import React, { useState } from 'react'

import useComments, { REPLY_MAX } from './useComments'
import { firestoreErrorMessage } from '../recipes/recipesApi'

/** Read, reply to and moderate the comments of one recipe. */
export default function CommentsPanel({ recipe, onClose }) {
  const { comments, replyToComment, deleteComment, loading, error } = useComments(recipe.id)
  const [busyId, setBusyId] = useState(null)
  const [actionError, setActionError] = useState('')

  // Which comment is being replied to, and what has been typed so far.
  const [replyingTo, setReplyingTo] = useState(null)
  const [draft, setDraft] = useState('')

  const startReply = (comment) => {
    setActionError('')
    setReplyingTo(comment.id)
    setDraft(comment.reply ?? '')
  }

  const cancelReply = () => {
    setReplyingTo(null)
    setDraft('')
  }

  const sendReply = async (commentId) => {
    setBusyId(commentId)
    setActionError('')
    try {
      await replyToComment(commentId, draft)
      cancelReply()
    } catch (err) {
      console.error('[admin] reply failed:', err)
      setActionError(firestoreErrorMessage(err))
    } finally {
      setBusyId(null)
    }
  }

  const clearReply = async (commentId) => {
    if (!window.confirm('Remove your reply from this comment?')) return
    setBusyId(commentId)
    setActionError('')
    try {
      await replyToComment(commentId, '')
    } catch (err) {
      setActionError(firestoreErrorMessage(err))
    } finally {
      setBusyId(null)
    }
  }

  const remove = async (commentId) => {
    setBusyId(commentId)
    setActionError('')
    try {
      await deleteComment(commentId)
    } catch (err) {
      setActionError(firestoreErrorMessage(err))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="admin-modal" role="dialog" aria-modal="true">
      <div className="admin-modal__panel">
        <div className="admin-modal__head">
          <h2>💬 Comments — {recipe.en.title || recipe.ar.title}</h2>
          <button className="admin-btn admin-btn--ghost" onClick={onClose}>
            Close
          </button>
        </div>

        {error && <p className="admin-alert admin-alert--error">{firestoreErrorMessage(error)}</p>}
        {actionError && <p className="admin-alert admin-alert--error">{actionError}</p>}

        {loading ? (
          <p className="admin-empty">Loading…</p>
        ) : comments.length === 0 ? (
          <p className="admin-empty">No comments on this recipe yet.</p>
        ) : (
          <ul className="admin-comments">
            {comments.map((c) => (
              <li key={c.id} className="admin-comment">
                <div className="admin-comment__body">
                  <strong>{c.name}</strong>
                  <span className="admin-comment__date">
                    {c.createdAt?.toDate
                      ? c.createdAt.toDate().toLocaleString('en-GB')
                      : 'just now'}
                  </span>
                  <p>{c.text}</p>

                  {/* An existing reply, shown the way visitors will see it */}
                  {c.reply && replyingTo !== c.id && (
                    <div className="admin-reply">
                      <span className="admin-reply__label">🥑 Your reply</span>
                      <p>{c.reply}</p>
                      <div className="admin-reply__actions">
                        <button
                          className="admin-btn admin-btn--soft admin-btn--sm"
                          onClick={() => startReply(c)}
                        >
                          Edit reply
                        </button>
                        <button
                          className="admin-btn admin-btn--ghost admin-btn--sm"
                          onClick={() => clearReply(c.id)}
                          disabled={busyId === c.id}
                        >
                          Remove reply
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Writing one */}
                  {replyingTo === c.id && (
                    <div className="admin-reply admin-reply--editing">
                      <label className="admin-field">
                        <span className="admin-field__label">
                          Your reply — visitors will see this under the comment
                        </span>
                        <textarea
                          className="admin-input admin-input--area"
                          rows={3}
                          maxLength={REPLY_MAX}
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          placeholder="Thank you! Glad you liked it…"
                          autoFocus
                        />
                      </label>
                      <div className="admin-reply__actions">
                        <button
                          className="admin-btn admin-btn--sm"
                          onClick={() => sendReply(c.id)}
                          disabled={busyId === c.id || !draft.trim()}
                        >
                          {busyId === c.id ? 'Saving…' : 'Post reply'}
                        </button>
                        <button
                          className="admin-btn admin-btn--ghost admin-btn--sm"
                          onClick={cancelReply}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="admin-comment__actions">
                  {!c.reply && replyingTo !== c.id && (
                    <button
                      className="admin-btn admin-btn--soft admin-btn--sm"
                      onClick={() => startReply(c)}
                    >
                      ↩ Reply
                    </button>
                  )}
                  <button
                    className="admin-btn admin-btn--danger admin-btn--sm"
                    onClick={() => remove(c.id)}
                    disabled={busyId === c.id}
                  >
                    {busyId === c.id ? '…' : 'Delete'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
