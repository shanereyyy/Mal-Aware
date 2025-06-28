import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useAuth hook - setting up auth listener');
    
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('useAuth hook - auth state changed:', user?.email, 'isLoading:', false);
        setUser(user);
        setIsLoading(false);
      }, (error) => {
        console.error('useAuth hook - auth error:', error);
        setIsLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error('useAuth hook - setup error:', error);
      setIsLoading(false);
      return () => {};
    }
  }, []);

  console.log('useAuth hook - returning state:', { user: user?.email, isLoading });
  return { user, isLoading };
} 