import { Colors } from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Styles';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_HEIGHT = 120;
const CARD_WIDTH = SCREEN_WIDTH - Spacing.lg * 2;

export const LessonSkeleton: React.FC = () => {
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-CARD_WIDTH, CARD_WIDTH],
  });

  return (
    <View style={styles.card}>
      <View style={styles.title} />
      <View style={styles.description} />
      <View style={styles.category} />
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    padding: Spacing.md,
    justifyContent: 'center',
  },
  title: {
    width: '60%',
    height: Spacing.xl,
    backgroundColor: Colors.grey,
    borderRadius: BorderRadius.sm,
    marginBottom: 12,
  },
  description: {
    width: '90%',
    height: 14,
    backgroundColor: Colors.grey,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  category: {
    width: '30%',
    height: 14,
    backgroundColor: Colors.grey,
    borderRadius: BorderRadius.sm,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 80,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: BorderRadius.lg,
    opacity: 0.7,
  },
}); 