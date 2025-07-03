import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { BorderRadius, Shadows, Spacing } from '@/constants/Styles';
import { LessonCardProps } from '@/types/lesson';

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons 
          name="book-outline" 
          size={24} 
          color={Colors.lightBlue} 
        />
      </View>
      
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {lesson.title}
        </ThemedText>
        
        {lesson.description && (
          <ThemedText style={styles.description} numberOfLines={2}>
            {lesson.description}
          </ThemedText>
        )}
        
        <View style={styles.metadata}>
          {lesson.difficulty && (
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>
                {lesson.difficulty}
              </ThemedText>
            </View>
          )}
          
          {lesson.duration && (
            <ThemedText style={styles.duration}>
              {lesson.duration} min
            </ThemedText>
          )}
        </View>
      </View>
      
      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color={Colors.grey} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    ...Shadows.small,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: 16,
    color: Colors.darkBlue,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: 14,
    color: Colors.grey,
    marginBottom: Spacing.sm,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  badge: {
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  duration: {
    fontSize: 12,
    color: Colors.grey,
  },
}); 