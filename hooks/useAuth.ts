import { setupAuthStateListener } from '@/components/auth';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useAuth hook - setting up auth listener');

    const unsubscribe = setupAuthStateListener(
      (user) => setUser(user),
      (loading) => setIsLoading(loading),
      (error) => {
        console.error('useAuth hook - auth error:', error);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  console.log('useAuth hook - returning state:', { user: user?.email, isLoading });
  return { user, isLoading };
} 