import UploadImage from '@/components/ui/uploadImage';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <UploadImage />
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
});
