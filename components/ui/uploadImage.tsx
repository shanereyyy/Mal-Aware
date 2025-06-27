import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { handleScan, handleUpload } from './uploadImageUtils';

export default function UploadImage() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleUpload(setLoading, setResult, setImage)}
        activeOpacity={0.8}
        disabled={loading || scanning}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#7CB8F7" />
        ) : image ? (
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
            {scanning && (
              <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#7CB8F7" />
              </View>
            )}
          </View>
        ) : (
          <>
            <Ionicons name="arrow-up-circle-outline" size={52} color={Colors.darkBlue} style={{ marginBottom: 16 }} />
            <ThemedText style={styles.tapText}>Tap to</ThemedText>
            <ThemedText style={styles.uploadText}>Upload Image</ThemedText>
          </>
        )}
      </TouchableOpacity>

      {image && !result && !scanning && (
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => handleScan(setScanning, setResult)}
          disabled={scanning}
          activeOpacity={0.8}
        >
          <Text style={styles.scanButtonText}>Scan</Text>
        </TouchableOpacity>
      )}

      {result ? (
        <ThemedText style={styles.resultText}>{result}</ThemedText>
      ) : (
        <ThemedText style={styles.acceptedText}>Accepted File Type: jpg, png, jpeg.</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  card: {
    width: 260,
    height: 280,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#B3D6F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  tapText: {
    fontSize: 18,
    color: '#222',
    marginBottom: 2,
    fontWeight: '500',
  },
  uploadText: {
    fontSize: 20,
    color: Colors.darkBlue,
    fontWeight: '700',
    marginBottom: 8,
  },
  acceptedText: {
    fontSize: 13,
    color: '#8CA3B3',
    marginTop: 4,
  },
  resultText: {
    fontSize: 16,
    color: '#222',
    marginTop: 16,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  scanButton: {
    width: 220,
    height: 48,
    backgroundColor: '#2986E2',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
}); 