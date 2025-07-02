import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">History</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
