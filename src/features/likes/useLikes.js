import { useCallback } from 'react'
import { useLikesContext } from './LikesContext'

/**
 * Likes / dislikes for one recipe.
 * All the Firestore work happens once in <LikesProvider>; this hook
 * just reads that shared state, so a page full of cards opens 1 listener.
 */
export default function useLikes(recipeId) {
  const { counts, votes, vote, error, pending } = useLikesContext()

  const id = String(recipeId ?? '')
  const current = counts[id] ?? { likes: 0, dislikes: 0 }
  const myVote = votes[id] ?? null

  const handleLike = useCallback(() => vote(id, 'like'), [vote, id])
  const handleDislike = useCallback(() => vote(id, 'dislike'), [vote, id])

  return {
    likes: current.likes,
    dislikes: current.dislikes,
    liked: myVote === 'like',
    disliked: myVote === 'dislike',
    handleLike,
    handleDislike,
    saving: !!pending[id],
    error,
  }
}
