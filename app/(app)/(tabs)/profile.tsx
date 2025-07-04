import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';

import { signOutUser } from '@/components/auth';
import { useUserProfile } from '@/components/fetch/userData';
import { Button } from '@/components/ui/Button';
import TextBox from '@/components/ui/Input';
import { ProfileCard } from '@/components/ui/ProfileCard';
import { Colors } from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Styles';
import { useAuth } from '@/hooks/useAuth';
import { useProfileEdit } from '@/hooks/useProfileEdit';
import * as NavigationBar from 'expo-navigation-bar';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { firstName, lastName } = useUserProfile();
  const [modalVisible, setModalVisible] = useState(false);

  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  const {
    formData,
    loading,
    error,
    success,
    updateField,
    resetForm,
    saveProfile,
    hasChanges,
  } = useProfileEdit({
    user,
    initialFirstName: firstName,
    initialLastName: lastName,
    initialEmail: user?.email || '',
  });

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  const handleLogout = async () => {
    try {
      const result = await signOutUser();
      if (!result.success) {
        Alert.alert('Error', result.error || 'Failed to log out');
      }
    } catch {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  const handleEditProfile = () => {
    resetForm();
    setModalVisible(true);
  };

  const handleSaveProfile = async () => {
    await saveProfile();
    if (success) {
      setTimeout(() => setModalVisible(false), 1200);
    }
  };

  const handleCloseModal = () => {
    if (!loading) {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <ProfileCard 
        fullName={fullName}
        email={user?.email || ''}
      />

      {/* Action Buttons */}
      <View style={styles.buttonGroup}>
        <Button
          title="Edit Profile"
          variant="primary"
          style={styles.button}
          onPress={handleEditProfile}
        />
        
        <Button
          title="Log out"
          variant="danger"
          style={styles.button}
          onPress={handleLogout}
        />
      </View>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            {error && <Text style={styles.modalError}>{error}</Text>}
            {success && <Text style={styles.modalSuccess}>{success}</Text>}

            <TextBox 
              name="First Name" 
              value={formData.firstName} 
              onChangeText={(value) => updateField('firstName', value)} 
            />
            
            <TextBox 
              name="Last Name" 
              value={formData.lastName} 
              onChangeText={(value) => updateField('lastName', value)} 
            />
            
            <TextBox 
              name="Email" 
              value={formData.email} 
              onChangeText={(value) => updateField('email', value)} 
            />
            
            <TextBox 
              name="New Password" 
              value={formData.password} 
              onChangeText={(value) => updateField('password', value)} 
              secureTextEntry 
              showEye 
            />
            
            <TextBox 
              name="Confirm Password" 
              value={formData.confirmPassword} 
              onChangeText={(value) => updateField('confirmPassword', value)} 
              secureTextEntry 
              showEye 
            />

            <View style={styles.modalButtons}>
              <Button
                title={loading ? 'Saving...' : 'Save'}
                variant="primary"
                loading={loading}
                disabled={!hasChanges()}
                onPress={handleSaveProfile}
                style={styles.saveButton}
              />
              
              <Button
                title="Cancel"
                variant="secondary"
                disabled={loading}
                onPress={handleCloseModal}
                style={styles.cancelButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.md,
  },
  button: {
    width: '70%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
    color: Colors.darkBlue,
  },
  modalError: {
    color: Colors.red,
    marginBottom: Spacing.sm,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalSuccess: {
    color: Colors.green,
    marginBottom: Spacing.sm,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButtons: {
    width: '100%',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  saveButton: {
    marginBottom: 0,
  },
  cancelButton: {
    marginBottom: 0,
  },
});
