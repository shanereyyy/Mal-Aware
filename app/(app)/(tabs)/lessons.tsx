import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useLessons } from '@/components/fetch/lessons';
import SearchBar from '@/components/SearchBar';
import { LessonCard } from '@/components/ui/LessonCard';
import { LessonSkeleton } from '@/components/ui/LessonSkeleton';
import { PullToRefresh } from '@/components/ui/PullToRefresh';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Styles';
import { Lesson } from '@/types/lesson';

export default function LessonsScreen() {
  const { lessons, loading, error, refetch } = useLessons();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter lessons by search input (case-insensitive)
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return lessons;
    
    return lessons.filter(lesson =>
      lesson.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [lessons, searchQuery]);

  const handleLessonPress = (lesson: Lesson) => {
    // TODO: Navigate to lesson detail screen
    console.log('Navigate to lesson:', lesson.id);
  };

  const renderLessonCard = ({ item }: { item: Lesson }) => (
    <LessonCard 
      lesson={item} 
      onPress={() => handleLessonPress(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>
        {error ? error : searchQuery ? 'No lessons found.' : 'No lessons available.'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <LessonSkeleton />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      
      <PullToRefresh
        data={filteredLessons}
        renderItem={renderLessonCard}
        keyExtractor={(item) => item.id}
        onRefresh={refetch}
        refreshing={loading}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  listContainer: {
    paddingBottom: Spacing.xl,
    margin: Spacing.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl * 2,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.text,
    fontSize: 16,
  },
});
