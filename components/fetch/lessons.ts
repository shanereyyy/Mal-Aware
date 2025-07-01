import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'; // Adjust path if needed

export function useLessons() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'lessons'));
        const lessonList: Array<{ id: string; [key: string]: any }> = [];
        querySnapshot.forEach((doc) => {
          lessonList.push({ id: doc.id, ...doc.data() });
        });
        setLessons(lessonList);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  return { lessons, loading };
}