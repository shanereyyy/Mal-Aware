import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      
      <View style={styles.content}>
        <Text style={styles.title}>
          {lesson.title}
        </Text>
        
        <Text style={styles.description} numberOfLines={2}>
          {lesson.description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {lesson.difficulty}
            </Text>
          </View>
          
          <Text style={styles.duration}>
            {lesson.duration} min
          </Text>
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
  footer: {
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