import { IconSymbol } from '@/components/ui/IconSymbol';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

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
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: '#F8FCFC',
        },
        headerShown: false,
      }}
    >

      {/* Define the tab screens with their respective icons and titles */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="house.fill" color={focused ? '#39A8FF' : '#005EA4'} />, // selected: #39A8FF, default: #005EA4
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: 'Lessons',
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="book.fill" color={focused ? '#39A8FF' : '#005EA4'} />,
        }}
      />

      {/* Custom scan button with a larger icon and a floating effect */}
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={{
              backgroundColor: focused ? '#39A8FF' : '#005EA4',
              width: 64,
              height: 64,
              borderRadius: 32,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 6,
              borderColor: '#F8FCFC',
              elevation: 8,
            }}>
              <IconSymbol size={32} name="qrcode.viewfinder" color="#fff" />
            </View>
          ),
          tabBarButton: ({ children, onPress, style }) => (
            <TouchableOpacity onPress={onPress} style={[style, { top: -24 }]}>{children}</TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="clock.arrow.circlepath" color={focused ? '#39A8FF' : '#005EA4'} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="person.fill" color={focused ? '#39A8FF' : '#005EA4'} />,
        }}
      />
    </Tabs>
  );
}
