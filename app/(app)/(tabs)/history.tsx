
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import LinearBackground from '@/components/ui/LinearBackground';

export default function HistoryScreen() {

  return (
    <LinearBackground>

      <View style={styles.titleContainer}>
        <ThemedText type="title">History</ThemedText>
      </View>

    </LinearBackground>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
