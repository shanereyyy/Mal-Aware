import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useUserProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const docRef = doc(db, 'user', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
      }
    }
    fetchUserData();
  }, []);

  return { firstName, lastName };
}