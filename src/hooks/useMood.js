import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

function useMood(coupleId) {
  // moods: { [uid]: 'happy' }
  const [moods, setMoods] = useState({});

  useEffect(() => {
    if (!coupleId) return;

    const moodsRef = collection(db, 'couples', coupleId, 'moods');
    const unsubscribe = onSnapshot(moodsRef, (snapshot) => {
      const data = {};
      snapshot.docs.forEach((docSnap) => {
        const uid = docSnap.id;
        const mood = docSnap.data().mood;
        if (mood) data[uid] = mood;
      });
      setMoods(data);
    });

    return () => unsubscribe();
  }, [coupleId]);

  const updateMyMood = async (uid, moodId) => {
    if (!coupleId || !uid) return;
    setMoods((prev) => ({ ...prev, [uid]: moodId }));
    const ref = doc(db, 'couples', coupleId, 'moods', uid);
    await setDoc(ref, { mood: moodId, updatedAt: serverTimestamp() }, { merge: true });
  };

  return { moods, updateMyMood };
}

export default useMood;