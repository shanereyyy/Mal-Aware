import { Colors } from '@/constants/Colors';
import { BorderRadius, Shadows, Spacing } from '@/constants/Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
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

import { signUp } from '@/components/auth';
import TextBox from '@/components/ui/Input';
import { useRouter } from 'expo-router';

export default function Register() {

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

  // Check if passwords match and form is valid
  useEffect(() => {
    const match = password === confirmPassword && password.length > 0 && confirmPassword.length > 0;
    setPasswordsMatch(match);
    
    const valid = email.length > 0 && password.length > 0 && confirmPassword.length > 0 && 
                  firstName.length > 0 && lastName.length > 0 && match;
    setIsFormValid(valid);
  }, [email, password, confirmPassword, firstName, lastName]);

  async function register() {
    if (!isFormValid) return;
    
    setLoading(true);
    try {
      const result = await signUp(email, password, firstName, lastName);
      if (result.success && result.user) {
        setLoading(false);
        Alert.alert('Success', `Account created successfully!`);
        router.replace('/(app)/(tabs)/home');
      } else {
        setLoading(false);
        Alert.alert('Oops!', result.error || 'Something went wrong!');
      }
    } catch (error) {
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

        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>

            <View style={{ alignItems: 'center', marginBottom: Spacing.sm }}>
              <Image source={require('../assets/images/malaware-logo.png')} style={{ width: 120, height: 120, marginBottom: Spacing.sm }} />
            </View>

            <TextBox name="First name" onChangeText={setFirstName} value={firstName} />
            <TextBox name="Last name" onChangeText={setLastName} value={lastName} />
            <TextBox name="Email" onChangeText={setEmail} value={email} />
            <TextBox name="Password" onChangeText={setPassword} secureTextEntry showEye value={password} />
            <TextBox 
              name="Confirm password" 
              onChangeText={setConfirmPassword} 
              secureTextEntry 
              showEye 
              value={confirmPassword}
              borderColor={confirmPassword.length > 0 ? (passwordsMatch ? undefined : Colors.red) : undefined}
            />

            {confirmPassword.length > 0 && !passwordsMatch && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}

            <TouchableOpacity 
              style={[
                styles.button, 
                !isFormValid && styles.buttonDisabled
              ]} 
              onPress={register}
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <ActivityIndicator
                  size={'small'}
                  color={Colors.white}
                  animating={loading}
                />
              ) : (
                <Text style={styles.buttonText}>Sign up</Text>
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    width: '80%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.grey,
    marginRight: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    backgroundColor: Colors.lightBlue,
  },
  privacyText: {
    color: Colors.grey,
  },
  link: {
    color: Colors.lightBlue,
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
  buttonDisabled: {
    backgroundColor: Colors.grey,
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
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
  errorText: {
    color: Colors.red,
    fontSize: 14,
    marginBottom: Spacing.sm,
    width: '80%',
    textAlign: 'center',
  },
});
