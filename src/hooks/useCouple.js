// src/hooks/useCouple.js

import { useState, useEffect } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Генерация случайного 6-значного кода
const generateCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

function useCouple(user) {
  const [coupleId, setCoupleId] = useState(null);
  const [couple, setCouple] = useState(null);
  const [loading, setLoading] = useState(true);

  // При входе — ищем, в какой паре состоит пользователь
  useEffect(() => {
    if (!user) {
      setCoupleId(null);
      setCouple(null);
      setLoading(false);
      return;
    }

    let unsubscribeCouple = null;

    const init = async () => {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().coupleId) {
        const id = userSnap.data().coupleId;
        setCoupleId(id);

        // Слушаем изменения в паре в реальном времени
        unsubscribeCouple = onSnapshot(doc(db, 'couples', id), (snap) => {
          if (snap.exists()) setCouple({ id, ...snap.data() });
        });
      }
      setLoading(false);
    };

    init();

    return () => {
      if (unsubscribeCouple) unsubscribeCouple();
    };
  }, [user]);

  // Создать новую пару (только для первого пользователя)
  const createCouple = async () => {
    if (!user) return;
    const code = generateCode();

    // Создаём документ пары
    await setDoc(doc(db, 'couples', code), {
      createdAt: serverTimestamp(),
      members: [user.uid],
    });

    // Привязываем пользователя к паре
    await setDoc(doc(db, 'users', user.uid), { coupleId: code }, { merge: true });

    setCoupleId(code);
    return code;
  };

  // Присоединиться к существующей паре по коду
  const joinCouple = async (code) => {
    if (!user) return;
    const cleanCode = code.trim().toUpperCase();

    const coupleRef = doc(db, 'couples', cleanCode);
    const snap = await getDoc(coupleRef);

    if (!snap.exists()) throw new Error('Пара с таким кодом не найдена');
    if (snap.data().members.includes(user.uid)) throw new Error('Вы уже в этой паре');
    if (snap.data().members.length >= 2) throw new Error('В этой паре уже два участника');

    await updateDoc(coupleRef, { members: arrayUnion(user.uid) });
    await setDoc(doc(db, 'users', user.uid), { coupleId: cleanCode }, { merge: true });

    setCoupleId(cleanCode);
    return cleanCode;
  };

  return { coupleId, couple, loading, createCouple, joinCouple };
}

export default useCouple;