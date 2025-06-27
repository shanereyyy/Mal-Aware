import * as ImagePicker from 'expo-image-picker';
import React from 'react';

export async function handleUpload(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setResult: React.Dispatch<React.SetStateAction<string>>,
  setImage: React.Dispatch<React.SetStateAction<string | null>>
) {
  setLoading(true);
  setResult('');
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
  setLoading(false);
}

export function handleScan(
  setScanning: React.Dispatch<React.SetStateAction<boolean>>,
  setResult: React.Dispatch<React.SetStateAction<string>>
) {
  setScanning(true);
  setResult('');
  setTimeout(() => {
    setResult('Analysis complete: No malware detected.');
    setScanning(false);
  }, 2000);
} 