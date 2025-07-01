import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar({ value, onChangeText }: { value: string; onChangeText: (text: string) => void; }) {
    return (
        <View style={styles.searchContainer}>
            <View style={{ position: 'relative' }}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor="#888"
                    value={value}
                    onChangeText={onChangeText}
                />
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 8,
    },
    searchBar: {
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        position: 'absolute',
        right: 16,
        top: 12,
        zIndex: 1,
    },
});