// src/hooks/useGoals.js

import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

function useGoals(coupleId) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coupleId) {
      setGoals([]);
      setLoading(false);
      return;
    }

    const ref = collection(db, 'couples', coupleId, 'goals');
    const q = query(ref, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setGoals(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [coupleId]);

  const addGoal = async (title) => {
    if (!coupleId || !title.trim()) return;
    const ref = collection(db, 'couples', coupleId, 'goals');
    await addDoc(ref, {
      title: title.trim(),
      progress: 0,
      createdAt: serverTimestamp(),
    });
  };

  const updateProgress = async (id, delta) => {
    if (!coupleId) return;
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;
    const next = Math.max(0, Math.min(100, (goal.progress || 0) + delta));
    await updateDoc(doc(db, 'couples', coupleId, 'goals', id), {
      progress: next,
    });
  };

  const removeGoal = async (id) => {
    if (!coupleId) return;
    await deleteDoc(doc(db, 'couples', coupleId, 'goals', id));
  };

  return { goals, addGoal, updateProgress, removeGoal, loading };
}

export default useGoals;