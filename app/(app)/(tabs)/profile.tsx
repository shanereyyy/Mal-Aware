import { signOutUser } from '@/components/auth';
import { useAuth } from '@/hooks/useAuth';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { updateUserEmail, updateUserPassword, updateUserProfile } from '@/components/auth/authFunctions';
import { useUserProfile } from '@/components/fetch/userData';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TextBox from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import Modal from 'react-native-modal';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { firstName, lastName } = useUserProfile();

  const [modalVisible, setModalVisible] = useState(false);
  const [editFirstName, setEditFirstName] = useState(firstName);
  const [editLastName, setEditLastName] = useState(lastName);
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editPassword, setEditPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  const handleLogout = async () => {
    try {
      const result = await signOutUser();
      if (!result.success) {
        Alert.alert('Error', result.error || 'Failed to log out');
      }
      // The root layout will automatically redirect to login
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  };

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  const handleEditProfile = () => {
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setEditEmail(user?.email || '');
    setEditPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    setModalVisible(true);
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (!editFirstName || !editLastName || !editEmail) {
        setError('All fields except password are required.');
        setLoading(false);
        return;
      }
      if (editPassword && editPassword !== confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
      // Update Firestore profile
      if (user?.uid) {
        const profileRes = await updateUserProfile(user.uid, editFirstName, editLastName);
        if (!profileRes.success) throw new Error(profileRes.error);
      }
      // Update email if changed
      if (user && editEmail !== user.email) {
        const emailRes = await updateUserEmail(user, editEmail);
        if (!emailRes.success) throw new Error(emailRes.error);
      }
      // Update password if provided
      if (user && editPassword) {
        const passRes = await updateUserPassword(user, editPassword);
        if (!passRes.success) throw new Error(passRes.error);
      }
      setSuccess('Profile updated successfully!');
      setTimeout(() => setModalVisible(false), 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const isEdited = () => {
    return (
      editFirstName !== firstName ||
      editLastName !== lastName ||
      editEmail !== (user?.email || '') ||
      editPassword !== '' ||
      confirmPassword !== ''
    );
  };

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.iconBackground}>
          <IconSymbol name="person.fill" size={90} color="white" />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <ThemedText style={styles.label}>FULL NAME</ThemedText>
            <ThemedText style={styles.value}>{fullName || 'Loading...'}</ThemedText>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailItem}>
            <ThemedText style={styles.label}>EMAIL</ThemedText>
            <ThemedText style={styles.value}>{user?.email}</ThemedText>
          </View>
        </View>
      </View>
      {/* Action Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.Button} onPress={handleEditProfile}>
          <ThemedText style={styles.logoutText}>Edit Profile</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutText}>Log out</ThemedText>
        </TouchableOpacity>
      </View>
      {/* Edit Profile Modal */}
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Edit Profile</ThemedText>
          {error ? <ThemedText style={styles.modalError}>{error}</ThemedText> : null}
          {success ? <ThemedText style={styles.modalSuccess}>{success}</ThemedText> : null}
          <TextBox name="First Name" value={editFirstName} onChangeText={setEditFirstName} />
          <TextBox name="Last Name" value={editLastName} onChangeText={setEditLastName} />
          <TextBox name="Email" value={editEmail} onChangeText={setEditEmail} />
          <TextBox name="New Password" value={editPassword} onChangeText={setEditPassword} secureTextEntry showEye />
          <TextBox name="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry showEye />
          <TouchableOpacity style={[styles.Button, { marginTop: 10, opacity: isEdited() ? 1 : 0.5 }]} onPress={handleSaveProfile} disabled={loading || !isEdited()}>
            <ThemedText style={styles.logoutText}>{loading ? 'Saving...' : 'Save'}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Button, styles.cancelButton]} onPress={() => setModalVisible(false)} disabled={loading}>
            <ThemedText style={[styles.logoutText, { color: Colors.darkBlue }]}>Cancel</ThemedText>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  profileCard: {
    borderRadius: 24,
    marginHorizontal: 24,
    marginTop: 128,
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 32,
    shadowColor: Colors.black,
    borderColor: Colors.grey,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 4,
    borderColor: Colors.grey,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 24,
  },
  detailItem: {
    marginBottom: 12,
    alignItems: 'flex-start',
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.grey,
    opacity: 0.9,
    letterSpacing: 1,
  },
  value: {
    fontSize: 18,
    color: Colors.black,
    marginTop: 2,
    fontWeight: '600',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.grey,
    marginVertical: 8,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  Button: {
    width: '80%',
    height: 48,
    backgroundColor: Colors.darkBlue,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  logOutButton: {
    width: '80%',
    height: 48,
    backgroundColor: Colors.red,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.darkBlue,
  },
  modalError: {
    color: Colors.red,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  modalSuccess: {
    color: Colors.green,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: Colors.grey,
    marginTop: 0,
    marginBottom: 0,
  },
});
