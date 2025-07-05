import { Colors } from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Styles';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HistoryScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate a refresh operation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastRefresh(new Date());
    setRefreshing(false);
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.tint}
          colors={[Colors.tint]}
          progressBackgroundColor={Colors.white}
          title="Pull to refresh"
          titleColor={Colors.grey}
        />
      }
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>
          Last updated: {lastRefresh.toLocaleTimeString()}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.historyItem}>
          <Text style={styles.historyTitle}>Scan Completed</Text>
          <Text style={styles.historyDescription}>
            System scan completed successfully. No threats detected.
          </Text>
          <Text style={styles.historyTime}>2 hours ago</Text>
        </View>

        <View style={styles.historyItem}>
          <Text style={styles.historyTitle}>Lesson Completed</Text>
          <Text style={styles.historyDescription}>
            Completed "AI Cybersecurity Basics" lesson with 95% score.
          </Text>
          <Text style={styles.historyTime}>1 day ago</Text>
        </View>

        <View style={styles.historyItem}>
          <Text style={styles.historyTitle}>Profile Updated</Text>
          <Text style={styles.historyDescription}>
            Updated profile information and security preferences.
          </Text>
          <Text style={styles.historyTime}>3 days ago</Text>
        </View>

        <View style={styles.historyItem}>
          <Text style={styles.historyTitle}>App Installed</Text>
          <Text style={styles.historyDescription}>
            Mal-Aware app installed and first-time setup completed.
          </Text>
          <Text style={styles.historyTime}>1 week ago</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.grey,
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  historyItem: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    marginHorizontal: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  historyDescription: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  historyTime: {
    fontSize: 14,
    color: Colors.grey,
    fontStyle: 'italic',
  },
});
