import LinearBackground from '@/components/ui/LinearBackground';
import UploadImage from '@/components/ui/uploadImage';
import React from 'react';

export default function ScanScreen() {
  return (
    <LinearBackground centered>
      <UploadImage />
    </LinearBackground>
  );
}
