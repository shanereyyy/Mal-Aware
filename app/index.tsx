import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Debug logging
  console.log('Index screen - isLoading:', isLoading, 'user:', user?.email);

  // Show loading indicator while checking authentication
  if (isLoading) {
    console.log('Index screen - showing loading');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#005EA4" />
      </View>
    );
  }

  // If user is authenticated, redirect to main app
  if (user) {
    console.log('Index screen - user authenticated, redirecting to app');
    return <Redirect href="/(app)/(tabs)/home" />;
  }

  // If user is not authenticated, show welcome screen
  console.log('Index screen - showing welcome screen');
  return (
    <LinearGradient
      colors={['#FFFFFF', '#8ED6FF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image source={require('../assets/images/malaware-logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>MAL-AWARE</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signupButton} activeOpacity={0.8} onPress={() => router.push('/Register')}>
            <Text style={styles.signupText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signinButton} activeOpacity={0.8} onPress={() => router.push('/LogIn')}>
            <Text style={styles.signinText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 12,
    marginTop: 12,
  },

  title: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.lightBlue,
    fontFamily: 'SpaceMono-Regular',
    textTransform: 'uppercase',
    letterSpacing: 4,
    textShadowColor: '#8ED6FF',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    marginBottom: 40,
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },

  signupButton: {
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

  signupText: {
    color: Colors.white,
    fontSize: 18,
    letterSpacing: 1,
  },

  signinButton: {
    width: '80%',
    height: 48,
    backgroundColor: Colors.white,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },

  signinText: {
    color: Colors.darkBlue,
    fontSize: 18,
    letterSpacing: 1,
  },
});