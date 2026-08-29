import React, { useState } from 'react'
import useComments from './useComments'
import { firestoreErrorMessage } from '../recipes/recipesApi'

/** Read and moderate the comments of one recipe. */
export default function CommentsPanel({ recipe, onClose }) {
  const { comments, deleteComment, loading, error } = useComments(recipe.id)
  const [busyId, setBusyId] = useState(null)
  const [actionError, setActionError] = useState('')

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
                <div>
                  <strong>{c.name}</strong>
                  <span className="admin-comment__date">
                    {c.createdAt?.toDate
                      ? c.createdAt.toDate().toLocaleString('en-GB')
                      : 'just now'}
                  </span>
                  <p>{c.text}</p>
                </div>
                <button
                  className="admin-btn admin-btn--danger admin-btn--sm"
                  onClick={() => remove(c.id)}
                  disabled={busyId === c.id}
                >
                  {busyId === c.id ? '…' : 'Delete'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
