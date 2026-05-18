import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

export default function useFirebaseComments(recipeId) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!recipeId) return;

    const commentsRef = collection(
      db,
      "recipes",
      String(recipeId),
      "comments"
    );

    const q = query(commentsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(loadedComments);
    });

    return () => unsubscribe();
  }, [recipeId]);

  const addComment = async (comment) => {
    if (!comment.text.trim()) return;

    const commentsRef = collection(
      db,
      "recipes",
      String(recipeId),
      "comments"
    );

    await addDoc(commentsRef, {
      name: comment.name,
      text: comment.text,
      createdAt: serverTimestamp(),
    });
  };

  return {
    comments,
    addComment,
  };
}