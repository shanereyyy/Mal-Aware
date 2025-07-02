import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
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
          backgroundColor: Colors.darkBlue,
        }
      }}
    >

      {/* Define the tab screens with their respective icons and titles */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="house.fill" color={focused ? '#39A8FF' : Colors.white} />, // selected: #39A8FF, default: #005EA4
        }}
      />
      <Tabs.Screen
        name="(lessons)/lessons"
        options={{
          title: 'Lessons',
          headerShown: false,
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="book.fill" color={focused ? '#39A8FF' : Colors.white} />,
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
              backgroundColor: focused ? '#39A8FF' : Colors.white,
              width: 64,
              height: 64,
              borderRadius: 32,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 6,
              borderColor: Colors.darkBlue,
              elevation: 8,
            }}>
              <IconSymbol size={32} name="qrcode.viewfinder" color={Colors.darkBlue} />
            </View>
          ),
          tabBarButton: ({ children, onPress, style }) => (
            <TouchableOpacity
              onPress={onPress}
              style={[style, { top: -24 }]}>{children}</TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          headerShown: false,
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="clock.arrow.circlepath" color={focused ? '#39A8FF' : Colors.white} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => <IconSymbol size={28} name="person.fill" color={focused ? '#39A8FF' : Colors.white} />,
        }}
      />
    </Tabs>
  );
}
