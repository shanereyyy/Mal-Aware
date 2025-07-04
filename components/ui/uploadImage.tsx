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
            <Text style={styles.tapText}>Tap to</Text>
            <Text style={styles.uploadText}>Upload Image</Text>
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
        <Text style={styles.resultText}>{result}</Text>
      ) : (
        <Text style={styles.acceptedText}>Accepted File Type: jpg, png, jpeg.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 260,
    height: 280,
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  tapText: {
    fontSize: 18,
    color: Colors.black,
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
    color: Colors.grey,
    marginTop: 4,
  },
  resultText: {
    fontSize: 16,
    color: Colors.black,
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
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  scanButton: {
    width: 220,
    height: 48,
    backgroundColor: Colors.lightBlue,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  scanButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
}); 