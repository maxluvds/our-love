// src/hooks/useEvents.js

import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

function useEvents(coupleId) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Подписываемся на события пары в реальном времени
  useEffect(() => {
    if (!coupleId) {
      setEvents([]);
      setLoading(false);
      return;
    }

    const eventsRef = collection(db, 'couples', coupleId, 'events');
    const q = query(eventsRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setEvents(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [coupleId]);

  // Добавить событие на конкретный день
  const addEvent = async (year, month, day, text) => {
    if (!coupleId) return;
    const eventsRef = collection(db, 'couples', coupleId, 'events');
    await addDoc(eventsRef, {
      year,
      month,
      day,
      text,
      createdAt: serverTimestamp(),
    });
  };

  // Удалить событие
  const removeEvent = async (id) => {
    if (!coupleId) return;
    await deleteDoc(doc(db, 'couples', coupleId, 'events', id));
  };

  // Получить события на конкретный день
  const getEvents = (year, month, day) => {
    return events.filter(
      (e) => e.year === year && e.month === month && e.day === day
    );
  };

  // Проверить, есть ли события на день
  const hasEvents = (year, month, day) => {
    return events.some(
      (e) => e.year === year && e.month === month && e.day === day
    );
  };

  return { addEvent, removeEvent, getEvents, hasEvents, loading };
}

export default useEvents;