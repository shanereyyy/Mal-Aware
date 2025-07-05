import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Styles';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from 'react-native';

interface PullToRefreshProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  onRefresh: () => Promise<void>;
  refreshing?: boolean;
  contentContainerStyle?: any;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement;
  showsVerticalScrollIndicator?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  numColumns?: number;
  horizontal?: boolean;
  style?: any;
}

export function PullToRefresh<T>({
  data,
  renderItem,
  keyExtractor,
  onRefresh,
  refreshing = false,
  contentContainerStyle,
  ListEmptyComponent,
  showsVerticalScrollIndicator = true,
  onEndReached,
  onEndReachedThreshold = 0.1,
  numColumns,
  horizontal = false,
  style,
}: PullToRefreshProps<T>) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return; // Prevent multiple refreshes
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [onRefresh, isRefreshing]);

  const renderRefreshControl = () => (
    <RefreshControl
      refreshing={refreshing || isRefreshing}
      onRefresh={handleRefresh}
      tintColor={Colors.tint}
      colors={[Colors.tint]}
      progressBackgroundColor={Colors.white}
      title="Pull to refresh"
      titleColor={Colors.grey}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={renderRefreshControl()}
      contentContainerStyle={contentContainerStyle}
      ListEmptyComponent={ListEmptyComponent}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      numColumns={numColumns}
      horizontal={horizontal}
      style={style}
    />
  );
}

// Custom loading indicator component
export function RefreshIndicator({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <View style={styles.refreshIndicator}>
      <ActivityIndicator size="small" color={Colors.tint} />
      <Text style={styles.refreshText}>Refreshing...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  refreshIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  refreshText: {
    color: Colors.grey,
    fontSize: 14,
  },
}); 