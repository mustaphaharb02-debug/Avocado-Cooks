import { useState } from 'react'

// ─────────────────────────────────────────────
//  localStorage keys
//    recipe-reactions  → { "1": { likes: 5, dislikes: 1 }, ... }
//    recipe-my-votes   → { "1": "like" | "dislike" | null, ... }
// ─────────────────────────────────────────────

function readJSON(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or private-browsing block — fail silently
  }
}

export function useReactions(recipeId) {
  const id = String(recipeId)

  // ── initialise from localStorage ──────────────────────────────
  const [counts, setCounts] = useState(() => {
    const all = readJSON('recipe-reactions')
    return all[id] ?? { likes: 0, dislikes: 0 }
  })

  // myVote: "like" | "dislike" | null
  const [myVote, setMyVote] = useState(() => {
    const votes = readJSON('recipe-my-votes')
    return votes[id] ?? null
  })

  // ── persist helpers ────────────────────────────────────────────
  function saveCounts(next) {
    const all = readJSON('recipe-reactions')
    all[id] = next
    writeJSON('recipe-reactions', all)
    setCounts(next)
  }

  function saveMyVote(next) {
    const votes = readJSON('recipe-my-votes')
    votes[id] = next
    writeJSON('recipe-my-votes', votes)
    setMyVote(next)
  }

  // ── handlers ──────────────────────────────────────────────────
  function handleLike() {
    if (myVote === 'like') {
      // undo like
      saveCounts({ likes: Math.max(0, counts.likes - 1), dislikes: counts.dislikes })
      saveMyVote(null)
    } else if (myVote === 'dislike') {
      // switch dislike → like
      saveCounts({ likes: counts.likes + 1, dislikes: Math.max(0, counts.dislikes - 1) })
      saveMyVote('like')
    } else {
      // fresh like
      saveCounts({ likes: counts.likes + 1, dislikes: counts.dislikes })
      saveMyVote('like')
    }
  }

  function handleDislike() {
    if (myVote === 'dislike') {
      // undo dislike
      saveCounts({ likes: counts.likes, dislikes: Math.max(0, counts.dislikes - 1) })
      saveMyVote(null)
    } else if (myVote === 'like') {
      // switch like → dislike
      saveCounts({ likes: Math.max(0, counts.likes - 1), dislikes: counts.dislikes + 1 })
      saveMyVote('dislike')
    } else {
      // fresh dislike
      saveCounts({ likes: counts.likes, dislikes: counts.dislikes + 1 })
      saveMyVote('dislike')
    }
  }

  return {
    likes:    counts.likes,
    dislikes: counts.dislikes,
    liked:    myVote === 'like',
    disliked: myVote === 'dislike',
    handleLike,
    handleDislike,
  }
}
