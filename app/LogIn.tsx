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
import { auth } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';


export default function LogIn() {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function login() {

    setLoading(true);

    try {

      const response = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      Alert.alert('Success', `Logged in as ${response.user.email}`);

      router.replace('/(app)/(tabs)/home');

    } catch (error) {

      setLoading(false);
      Alert.alert('Oops!', 'Invalid email or password!');

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
        <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1, 
          justifyContent: 'center',
          paddingVertical: 20
           }} 
           keyboardShouldPersistTaps="handled"
           showsVerticalScrollIndicator={false}
           >

          <View style={styles.container}>

            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <Image source={require('../assets/images/malaware-logo.png')} style={{ width: 120, height: 120, marginBottom: 10 }} />
            </View>

            <TextBox name="Email" onChangeText={setEmail} />
            <TextBox name="Password" onChangeText={setPassword} secureTextEntry showEye />
            <TouchableOpacity style={styles.button} onPress={login} disabled={loading}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'white'} animating={loading} />
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
