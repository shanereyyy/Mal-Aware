import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';

export default function TabLayout() {

  // Hide the navigation bar on Android devices
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  return (
    // Set the navigation bar color to match the app theme
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          backgroundColor: Colors.lightBlue,
        },
        tabBarActiveTintColor: Colors.darkBlue,
        tabBarInactiveTintColor: Colors.white,
        tabBarItemStyle: {
          // Remove ripple effect
          elevation: 0,
          shadowOpacity: 0,
          ...(Platform.OS === 'android' && {
            // Android specific styles to disable ripple
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderColor: 'transparent',
          }),
        },
        tabBarButton: ({ children, onPress, style }) => (
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={style}
          >
            {children}
          </TouchableOpacity>
        ),
      }}
    >

      {/* Define the tab screens with their respective icons and titles */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="house.fill" color={focused ? Colors.darkBlue : Colors.white} />,
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: 'Lessons',
          headerShown: false,
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="book.fill" color={focused ? Colors.darkBlue : Colors.white} />,
        }}
      />

      {/* Custom scan button with a larger icon and a floating effect */}
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? Colors.darkBlue : Colors.white,
              width: 64,
              height: 64,
              borderRadius: 32,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 6,
              borderColor: Colors.lightBlue,
              elevation: 8,
              top: -8,
            }}>
              <IconSymbol size={32} name="qrcode.viewfinder" color={Colors.lightBlue} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          headerShown: false,
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="clock.arrow.circlepath" color={focused ? Colors.darkBlue : Colors.white} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="person.fill" color={focused ? Colors.darkBlue : Colors.white} />,
        }}
      />
    </Tabs>
  );
}
