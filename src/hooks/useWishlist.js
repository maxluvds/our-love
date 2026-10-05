// src/hooks/useWishlist.js

import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

function useWishlist(coupleId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coupleId) {
      setItems([]);
      setLoading(false);
      return;
    }

    const ref = collection(db, 'couples', coupleId, 'wishlist');
    const q = query(ref, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setItems(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [coupleId]);

  const addItem = async ({ title, price, link }) => {
    if (!coupleId) return;
    const ref = collection(db, 'couples', coupleId, 'wishlist');
    await addDoc(ref, {
      title,
      price: price || '',
      link: link || '',
      createdAt: serverTimestamp(),
    });
  };

  const removeItem = async (id) => {
    if (!coupleId) return;
    await deleteDoc(doc(db, 'couples', coupleId, 'wishlist', id));
  };

  return { items, addItem, removeItem, loading };
}

export default useWishlist;