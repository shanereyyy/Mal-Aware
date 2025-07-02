import SearchBar from '@/components/SearchBar';
import { ThemedText } from '@/components/ThemedText';
import { useLessons } from '@/components/fetch/lessons';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function LessonsScreen() {
  const { lessons, loading } = useLessons();
  const [search, setSearch] = useState('');

  // Filter lessons by search input (case-insensitive)
  const filteredLessons = useMemo(() =>
    lessons.filter(lesson =>
      lesson.title?.toLowerCase().includes(search.toLowerCase())
    ), [lessons, search]);

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />
      {loading ? (
        <ActivityIndicator size="large" color={Colors.icon} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredLessons}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item }) => <LessonCard lesson={item} />}
          ListEmptyComponent={<ThemedText style={{ textAlign: 'center', marginTop: 40 }}>No lessons found.</ThemedText>}
        />
      )}
    </View>
  );
}

function LessonCard({ lesson }: { lesson: any }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.iconBox}>
        <Ionicons size={36} color={Colors.lightBlue} />
      </View>
      <View style={{ flex: 1 }}>
        <ThemedText type="defaultSemiBold">{lesson.title}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 24,
    gap: 16,
    borderRadius: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkBlue,
  },
});
