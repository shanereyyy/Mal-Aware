import { useCallback, useState } from 'react';

import { updateUserEmail, updateUserPassword, updateUserProfile } from '@/components/auth/authFunctions';

interface ProfileEditState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UseProfileEditProps {
  user: any;
  initialFirstName: string;
  initialLastName: string;
  initialEmail: string;
}

export const useProfileEdit = ({ 
  user, 
  initialFirstName, 
  initialLastName, 
  initialEmail 
}: UseProfileEditProps) => {
  const [formData, setFormData] = useState<ProfileEditState>({
    firstName: initialFirstName,
    lastName: initialLastName,
    email: initialEmail,
    password: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const updateField = useCallback((field: keyof ProfileEditState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear messages when user starts typing
    if (error || success) {
      setError('');
      setSuccess('');
    }
  }, [error, success]);

  const resetForm = useCallback(() => {
    setFormData({
      firstName: initialFirstName,
      lastName: initialLastName,
      email: initialEmail,
      password: '',
      confirmPassword: '',
    });
    setError('');
    setSuccess('');
  }, [initialFirstName, initialLastName, initialEmail]);

  const validateForm = useCallback(() => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('All fields except password are required.');
      return false;
    }
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    
    return true;
  }, [formData]);

  const saveProfile = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Update Firestore profile
      if (user?.uid) {
        const profileRes = await updateUserProfile(
          user.uid, 
          formData.firstName, 
          formData.lastName
        );
        if (!profileRes.success) throw new Error(profileRes.error);
      }

      // Update email if changed
      if (user && formData.email !== initialEmail) {
        const emailRes = await updateUserEmail(user, formData.email);
        if (!emailRes.success) throw new Error(emailRes.error);
      }

      // Update password if provided
      if (user && formData.password) {
        const passRes = await updateUserPassword(user, formData.password);
        if (!passRes.success) throw new Error(passRes.error);
      }

      setSuccess('Profile updated successfully!');
      
      // Reset password fields after successful update
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: '',
      }));
      
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  }, [formData, user, initialEmail, validateForm]);

  const hasChanges = useCallback(() => {
    return (
      formData.firstName !== initialFirstName ||
      formData.lastName !== initialLastName ||
      formData.email !== initialEmail ||
      formData.password !== '' ||
      formData.confirmPassword !== ''
    );
  }, [formData, initialFirstName, initialLastName, initialEmail]);

  return {
    formData,
    loading,
    error,
    success,
    updateField,
    resetForm,
    saveProfile,
    hasChanges,
  };
}; 