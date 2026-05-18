import { useEffect, useState } from "react";
import { doc, onSnapshot, runTransaction } from "firebase/firestore";
import { db } from "../firebase";

export default function useFirebaseReactions(recipeId) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [myVote, setMyVote] = useState(localStorage.getItem(`vote-${recipeId}`));

  useEffect(() => {
    if (!recipeId) return;

    const ref = doc(db, "reactions", String(recipeId));

    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setLikes(snap.data().likes || 0);
        setDislikes(snap.data().dislikes || 0);
      }
    });

    return () => unsubscribe();
  }, [recipeId]);

  const vote = async (type) => {
    if (!recipeId) return;

    const ref = doc(db, "reactions", String(recipeId));
    const oldVote = localStorage.getItem(`vote-${recipeId}`);

    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(ref);
      const data = snap.exists() ? snap.data() : { likes: 0, dislikes: 0 };

      let newLikes = data.likes || 0;
      let newDislikes = data.dislikes || 0;
      let newVote = type;

      if (oldVote === type) {
        if (type === "like") newLikes--;
        if (type === "dislike") newDislikes--;
        newVote = null;
      } else {
        if (oldVote === "like") newLikes--;
        if (oldVote === "dislike") newDislikes--;

        if (type === "like") newLikes++;
        if (type === "dislike") newDislikes++;
      }

      transaction.set(ref, {
        likes: Math.max(0, newLikes),
        dislikes: Math.max(0, newDislikes),
      });

      if (newVote) {
        localStorage.setItem(`vote-${recipeId}`, newVote);
      } else {
        localStorage.removeItem(`vote-${recipeId}`);
      }

      setMyVote(newVote);
    });
  };

  return {
    likes,
    dislikes,
    liked: myVote === "like",
    disliked: myVote === "dislike",
    handleLike: () => vote("like"),
    handleDislike: () => vote("dislike"),
    onLike: () => vote("like"),
    onDislike: () => vote("dislike"),
  };
}