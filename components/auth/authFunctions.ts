import { auth, db } from '@/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  User
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Sign in function
export const signIn = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: response.user };
  } catch (error: any) {
    console.error('Sign in error:', error);
    let errorMessage = 'Invalid email or password!';

    // Handle specific Firebase auth errors
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email address.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Please try again later.';
    }

    return { success: false, error: errorMessage };
  }
};

// Sign up function
export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    // Save user profile to Firestore
    await setDoc(doc(db, 'user', response.user.uid), {
      firstName,
      lastName,
      email,
      createdAt: new Date(),
    });
    return { success: true, user: response.user };
  } catch (error: any) {
    console.error('Sign up error:', error);
    let errorMessage = 'Something went wrong!';

    // Handle specific Firebase auth errors
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'An account with this email already exists.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters.';
    } else if (error.code === 'auth/operation-not-allowed') {
      errorMessage = 'Email/password accounts are not enabled.';
    }

    return { success: false, error: errorMessage };
  }
};

// Sign out function
export const signOutUser = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { success: false, error: 'Failed to log out' };
  }
};

// Auth state listener function
export const setupAuthStateListener = (
  onUserChange: (user: User | null) => void,
  onLoadingChange: (loading: boolean) => void,
  onError?: (error: any) => void
) => {
  console.log('Setting up auth state listener');

  try {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log('Auth state changed:', user?.email, 'isLoading:', false);
        onUserChange(user);
        onLoadingChange(false);
      },
      (error) => {
        console.error('Auth state listener error:', error);
        onLoadingChange(false);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Auth state listener setup error:', error);
    onLoadingChange(false);
    if (onError) onError(error);
    return () => { };
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null;
};

// Update user profile fields in Firestore
export const updateUserProfile = async (uid: string, firstName: string, lastName: string) => {
  try {
    await setDoc(doc(db, 'user', uid), { firstName, lastName }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: 'Failed to update profile' };
  }
};

// Update user email
export const updateUserEmail = async (user: User, newEmail: string) => {
  try {
    await updateEmail(user, newEmail);
    return { success: true };
  } catch (error) {
    console.error('Update email error:', error);
    return { success: false, error: 'Failed to update email' };
  }
};

// Update user password
export const updateUserPassword = async (user: User, newPassword: string) => {
  try {
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error) {
    console.error('Update password error:', error);
    return { success: false, error: 'Failed to update password' };
  }
}; 