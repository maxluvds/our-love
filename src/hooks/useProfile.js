// src/hooks/useProfile.js

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

function useProfile(uid) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (!uid) {
      setName('');
      return;
    }

    const fetchName = async () => {
      try {
        const snap = await getDoc(doc(db, 'users', uid));
        if (snap.exists() && snap.data().name) {
          setName(snap.data().name);
        }
      } catch (e) {
        console.error('Не удалось получить имя:', e);
      }
    };

    fetchName();
  }, [uid]);

  return name;
}

export default useProfile;