import { Colors } from '@/constants/Colors';
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

import TextBox from '@/components/ui/Input';
import { app } from '@/firebaseConfig';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Register() {

  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function register() {

    setLoading(true);
    try {

      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      const response = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      Alert.alert('Success', response.user.uid);

      return;

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
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>

            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <Image source={require('../assets/images/malaware-logo.png')} style={{ width: 120, height: 120, marginBottom: 10 }} />
            </View>

            <TextBox name="First name" />
            <TextBox name="Last name" />
            <TextBox name="Email" onChangeText={setEmail} />
            <TextBox name="Password" onChangeText={setPassword} secureTextEntry showEye />
            <TextBox name="Confirm password" secureTextEntry showEye />

            {/* <View style={styles.checkboxContainer}>
              <TouchableOpacity style={styles.checkbox} onPress={() => setAgree(!agree)}>
                {agree && <View style={styles.checkboxChecked} />}
              </TouchableOpacity>
              <Text style={styles.privacyText}>I Agree with <Text style={styles.link}>privacy</Text> and <Text style={styles.link}>policy</Text>.</Text>
            </View> */}

            <TouchableOpacity style={styles.button} onPress={register}>
              {loading ? (
                <ActivityIndicator
                  size={'small'}
                  color={'white'}
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
    marginBottom: 10,
    width: '80%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#7B8D93',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    backgroundColor: Colors.lightBlue,
  },
  privacyText: {
    color: '#7B8D93',
  },
  link: {
    color: Colors.lightBlue,
  },
  button: {
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
