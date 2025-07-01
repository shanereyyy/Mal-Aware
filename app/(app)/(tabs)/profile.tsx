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
import LinearBackground from '@/components/ui/LinearBackground';
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
    <LinearBackground centered>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
            <View style={styles.iconBackground}>
              <IconSymbol name="person.fill" size={80} color="white" />
            </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <ThemedText style={styles.label}>FULL NAME</ThemedText>
            <ThemedText style={styles.value}>{fullName || 'Loading...'}</ThemedText>
          </View>
          <View style={styles.detailItem}>
            <ThemedText style={styles.label}>EMAIL</ThemedText>
            <ThemedText style={styles.value}>{user?.email}</ThemedText>
          </View>
        </View>

        <TouchableOpacity style={styles.Button} onPress={handleEditProfile}>
          <ThemedText style={styles.logoutText}>Edit Profile</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutText}>Log out</ThemedText>
        </TouchableOpacity>

        {/* Edit Profile Modal */}
        {/* Edit Profile Modal */}
        {/* Edit Profile Modal */}
        <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>

          <View style={{ backgroundColor: Colors.white, borderRadius: 16, padding: 24, alignItems: 'center' }}>
            
            <ThemedText style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Edit Profile</ThemedText>
            {error ? <ThemedText style={{ color: Colors.red, marginBottom: 8 }}>{error}</ThemedText> : null}
            {success ? <ThemedText style={{ color: Colors.green, marginBottom: 8 }}>{success}</ThemedText> : null}
            <TextBox name="First Name" value={editFirstName} onChangeText={setEditFirstName} />
            <TextBox name="Last Name" value={editLastName} onChangeText={setEditLastName} />
            <TextBox name="Email" value={editEmail} onChangeText={setEditEmail} />
            <TextBox name="New Password" value={editPassword} onChangeText={setEditPassword} secureTextEntry showEye />
            <TextBox name="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry showEye />

            <TouchableOpacity style={[styles.Button, { marginTop: 10, opacity: isEdited() ? 1 : 0.5 }]} onPress={handleSaveProfile} disabled={loading || !isEdited()}>
              <ThemedText style={styles.logoutText}>{loading ? 'Saving...' : 'Save'}</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.Button, { backgroundColor: Colors.grey, marginTop: 0 }]} onPress={() => setModalVisible(false)} disabled={loading}>
              <ThemedText style={styles.logoutText}>Cancel</ThemedText>
            </TouchableOpacity>

          </View>
        </Modal>
      </View>
    </LinearBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  iconBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  detailItem: {
    marginBottom: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.black,
    opacity: 0.8,
  },
  value: {
    fontSize: 18,
    color: Colors.black,
    marginTop: 4,
  },
  Button: {
    width: '80%',
    height: 48,
    backgroundColor: Colors.darkBlue,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  logOutButton: {
    width: '80%',
    height: 48,
    backgroundColor: Colors.red,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    color: Colors.white,
    fontSize: 16,
  },
});
