import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Styles';

interface ProfileCardProps {
  fullName: string;
  email: string;
  avatarSize?: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ 
  fullName, 
  email, 
  avatarSize = 120 
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.avatar, { width: avatarSize, height: avatarSize }]}>
        <IconSymbol 
          name="person.fill" 
          size={avatarSize * 0.75} 
          color="white" 
        />
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>FULL NAME</Text>
          <Text style={styles.value}>
            {fullName || 'Loading...'}
          </Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.detailItem}>
          <Text style={styles.label}>EMAIL</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xxl,
    marginHorizontal: Spacing.lg,
    marginTop: 128,
    marginBottom: Spacing.md,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    borderColor: Colors.grey,
  },
  avatar: {
    borderRadius: 9999,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 4,
    borderColor: Colors.grey,
  },
  details: {
    width: '100%',
    paddingHorizontal: Spacing.lg,
  },
  detailItem: {
    marginBottom: Spacing.md,
    alignItems: 'flex-start',
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.grey,
    opacity: 0.9,
    letterSpacing: 1,
  },
  value: {
    fontSize: 18,
    color: Colors.black,
    marginTop: 2,
    fontWeight: '600',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.grey,
    marginVertical: Spacing.sm,
  },
}); 