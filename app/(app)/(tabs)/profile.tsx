import { signOutUser } from '@/components/auth';
import { useAuth } from '@/hooks/useAuth';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useUserProfile } from '@/components/fetch/userData';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { firstName, lastName } = useUserProfile();

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView
        contentContainerStyle={[styles.content, styles.contentCentered]}
        showsVerticalScrollIndicator={false}
      >
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

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <ThemedText style={styles.logoutText}>Log out</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  logoutButton: {
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
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    padding: 24,
    gap: 16,
    marginHorizontal: 16,
    marginTop: 64,
    borderRadius: 16,
  },
  contentCentered: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 0,
  },
});
