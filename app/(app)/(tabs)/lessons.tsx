import SearchBar from '@/components/SearchBar';
import { ThemedText } from '@/components/ThemedText';
import { useLessons } from '@/components/fetch/lessons';
import LinearBackground from '@/components/ui/LinearBackground';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LessonsScreen() {
  const { lessons, loading } = useLessons();
  const [search, setSearch] = useState('');

  // Filter lessons by search input (case-insensitive)
  const filteredLessons = useMemo(() =>
    lessons.filter(lesson =>
      lesson.title?.toLowerCase().includes(search.toLowerCase())
    ), [lessons, search]);

  return (
    <LinearBackground>
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
    </LinearBackground>
  );
}

function LessonCard({ lesson }: { lesson: any }) {

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.iconBox}>
        <Ionicons size={36} color={Colors.lightBlue} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{lesson.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E6F3FF',
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
