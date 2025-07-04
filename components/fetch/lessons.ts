import { Lesson } from '@/types/lesson';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';

interface UseLessonsReturn {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useLessons(): UseLessonsReturn {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const querySnapshot = await getDocs(collection(db, 'lessons'));
      const lessonList: Lesson[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lessonList.push({
          id: doc.id,
          title: data.title || 'Untitled Lesson',
          description: data.description,
          content: data.content,
          category: data.category,
          difficulty: data.difficulty,
          duration: data.duration,
        });
      });
      
      setLessons(lessonList);
    } catch (err) {
      console.error('Error fetching lessons:', err);
      setError('Failed to load lessons. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return { 
    lessons, 
    loading, 
    error, 
    refetch: fetchLessons 
  };
}