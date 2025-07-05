import { Colors } from '@/constants/Colors';
import { BorderRadius, Shadows, Spacing } from '@/constants/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { signIn } from '@/components/auth';
import TextBox from '@/components/ui/Input';
import { useRouter } from 'expo-router';

export default function LogIn() {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function login() {
    setLoading(true);

    try {
      const result = await signIn(email, password);

      if (result.success && result.user) {
        setLoading(false);
        Alert.alert('Success', `Logged in as ${result.user.email}`);
        router.replace('/(app)/(tabs)/home');
      } else {
        setLoading(false);
        Alert.alert('Oops!', result.error || 'Invalid email or password!');
      }
    } catch {
      setLoading(false);
      Alert.alert('Oops!', 'Something went wrong!');
    }
  }

  return (

    <LinearGradient

      colors={['#FFFFFF', '#8ED6FF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingVertical: Spacing.md
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.container}>

            <View style={{ alignItems: 'center', marginBottom: Spacing.sm }}>
              <Image source={require('../assets/images/malaware-logo.png')} style={{ width: 120, height: 120, marginBottom: Spacing.sm }} />
            </View>

            <TextBox name="Email" onChangeText={setEmail} />
            <TextBox name="Password" onChangeText={setPassword} secureTextEntry showEye />
            <TouchableOpacity style={styles.button} onPress={login} disabled={loading}>
              {loading ? (
                <ActivityIndicator size={'small'} color={Colors.white} animating={loading} />
              ) : (
                <Text style={styles.buttonText}>Log in</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style='auto' />
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
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: Spacing.md,
    zIndex: 1000,
    padding: Spacing.sm,
  },

  backButtonText: {
    fontSize: 16,
    color: Colors.darkBlue,
    fontWeight: '600',
  },

  button: {
    width: '80%',
    height: 48,
    backgroundColor: Colors.darkBlue,
    borderRadius: BorderRadius.xxl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },

  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },

});
