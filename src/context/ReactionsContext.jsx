import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { collection, doc, onSnapshot, runTransaction } from 'firebase/firestore'
import { db } from '../firebase'

// =====================================================================
//  Likes / dislikes
//
//  • ONE Firestore listener for the whole `reactions` collection instead
//    of one listener per recipe card.
//  • The click updates the screen immediately (optimistic), then writes
//    to Firestore. If the write fails the screen is rolled back and the
//    error is shown — it never silently "disappears" any more.
//  • localStorage only remembers *this browser's* vote, never the count.
// =====================================================================

const VOTES_KEY = 'avo-cooks:my-votes'

const ReactionsContext = createContext(null)

function readVotes() {
  try {
    const raw = localStorage.getItem(VOTES_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeVotes(votes) {
  try {
    localStorage.setItem(VOTES_KEY, JSON.stringify(votes))
  } catch {
    // private browsing / storage full — voting still works this session
  }
}

const EMPTY = { likes: 0, dislikes: 0 }

export function ReactionsProvider({ children }) {
  const [counts, setCounts] = useState({}) // { [recipeId]: { likes, dislikes } }
  const [votes, setVotes] = useState(readVotes)
  const [error, setError] = useState(null)
  const [pending, setPending] = useState({}) // { [recipeId]: true }

  // Guards against two clicks racing on the same recipe.
  const inFlight = useRef(new Set())

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'reactions'),
      (snapshot) => {
        const next = {}
        snapshot.forEach((d) => {
          const data = d.data() || {}
          next[d.id] = {
            likes: Number(data.likes) || 0,
            dislikes: Number(data.dislikes) || 0,
          }
        })
        setCounts(next)
        setError(null)
      },
      (err) => {
        console.error('[reactions] listener failed:', err)
        setError(err)
      }
    )

    return () => unsubscribe()
  }, [])

  const vote = useCallback(
    async (recipeId, type) => {
      const id = String(recipeId)
      if (!id || id === '0' || inFlight.current.has(id)) return

      const previous = votes[id] ?? null
      const next = previous === type ? null : type // clicking again undoes it

      const likeDelta = (next === 'like' ? 1 : 0) - (previous === 'like' ? 1 : 0)
      const dislikeDelta = (next === 'dislike' ? 1 : 0) - (previous === 'dislike' ? 1 : 0)
      if (!likeDelta && !dislikeDelta) return

      const before = counts[id] ?? EMPTY

      // 1. optimistic update, so the button reacts instantly
      inFlight.current.add(id)
      setPending((p) => ({ ...p, [id]: true }))
      setCounts((c) => ({
        ...c,
        [id]: {
          likes: Math.max(0, (c[id]?.likes ?? 0) + likeDelta),
          dislikes: Math.max(0, (c[id]?.dislikes ?? 0) + dislikeDelta),
        },
      }))
      const nextVotes = { ...votes }
      if (next) nextVotes[id] = next
      else delete nextVotes[id]
      setVotes(nextVotes)
      writeVotes(nextVotes)

      // 2. the real write. Deltas are plain numbers, so the transaction
      //    body is pure and safe to retry — no side effects inside.
      try {
        const ref = doc(db, 'reactions', id)
        await runTransaction(db, async (transaction) => {
          const snap = await transaction.get(ref)
          const data = snap.exists() ? snap.data() : EMPTY
          transaction.set(
            ref,
            {
              likes: Math.max(0, (Number(data.likes) || 0) + likeDelta),
              dislikes: Math.max(0, (Number(data.dislikes) || 0) + dislikeDelta),
            },
            { merge: true }
          )
        })
        setError(null)
      } catch (err) {
        // 3. roll the screen back so it matches the database again
        console.error('[reactions] vote failed:', err)
        setCounts((c) => ({ ...c, [id]: before }))
        const revertedVotes = { ...votes }
        if (previous) revertedVotes[id] = previous
        else delete revertedVotes[id]
        setVotes(revertedVotes)
        writeVotes(revertedVotes)
        setError(err)
      } finally {
        inFlight.current.delete(id)
        setPending((p) => {
          const { [id]: _drop, ...rest } = p
          return rest
        })
      }
    },
    [counts, votes]
  )

  const value = useMemo(
    () => ({ counts, votes, vote, error, pending }),
    [counts, votes, vote, error, pending]
  )

  return <ReactionsContext.Provider value={value}>{children}</ReactionsContext.Provider>
}

export function useReactionsContext() {
  const ctx = useContext(ReactionsContext)
  if (!ctx) throw new Error('useReactionsContext must be used inside <ReactionsProvider>')
  return ctx
}
