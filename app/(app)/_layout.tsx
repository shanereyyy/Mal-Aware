import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  console.log('App layout - isLoading:', isLoading, 'user:', user?.email);

  if (isLoading) {
    console.log('App layout - showing loading');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#005EA4" />
      </View>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    console.log('App layout - user not authenticated, redirecting to login');
    return <Redirect href="/LogIn" />;
  }

  // If user is authenticated, show the app layout
  console.log('App layout - user authenticated, showing app layout');
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
} 