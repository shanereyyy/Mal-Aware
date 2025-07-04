import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.content}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hi! {user?.email}</Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Step 1: Try it</Text>
        <Text style={styles.description}>
          Edit <Text style={styles.bold}>app/(tabs)/index.tsx</Text> to see changes.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Step 2: Explore</Text>
        <Text style={styles.description}>
          Tap the explore tab to learn more about what&apos;s included in this starter app.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.subtitle}>Step 3: Get a fresh start</Text>
        <Text style={styles.description}>
          When you&apos;re ready, run <Text style={styles.bold}>npm run reset-project</Text> to get a fresh{' '}
          <Text style={styles.bold}>app</Text> directory. This will move the current{' '}
          <Text style={styles.bold}>app</Text> to{' '}
          <Text style={styles.bold}>app-example</Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
    gap: 16,
    marginHorizontal: 16,
    marginTop: 64,
    borderRadius: 16,
  },
  titleContainer: {},
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11181C',
    paddingBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#11181C',
  },
  description: {
    fontSize: 16,
    color: '#11181C',
    lineHeight: 24,
  },
  bold: {
    fontWeight: '600',
  },
});
