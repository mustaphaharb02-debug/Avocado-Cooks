import { useCallback, useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'

import { db } from '../../firebase'

export const NAME_MAX = 50
export const TEXT_MAX = 1000

/** Comments for one recipe, stored at recipes/{recipeId}/comments. */
export default function useComments(recipeId) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!recipeId) {
      setLoading(false)
      return
    }

    setLoading(true)
    const commentsRef = collection(db, 'recipes', String(recipeId), 'comments')
    const q = query(commentsRef, orderBy('createdAt', 'desc'), limit(200))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setComments(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error('[comments] listener failed:', err)
        setError(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [recipeId])

  const addComment = useCallback(
    async (comment) => {
      const name = String(comment?.name ?? '').trim().slice(0, NAME_MAX)
      const text = String(comment?.text ?? '').trim().slice(0, TEXT_MAX)
      if (!recipeId || !name || !text) return

      const commentsRef = collection(db, 'recipes', String(recipeId), 'comments')

      // Errors bubble up so the form can tell the visitor what happened.
      await addDoc(commentsRef, { name, text, createdAt: serverTimestamp() })
    },
    [recipeId]
  )

  /** Admin-only (allowed by the security rules); used for moderation. */
  const deleteComment = useCallback(
    async (commentId) => {
      if (!recipeId || !commentId) return
      await deleteDoc(doc(db, 'recipes', String(recipeId), 'comments', commentId))
    },
    [recipeId]
  )

  return { comments, addComment, deleteComment, loading, error }
}
