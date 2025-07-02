import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar({ value, onChangeText }: { value: string; onChangeText: (text: string) => void; }) {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchBarWrapper}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor={Colors.darkBlue}
                    value={value}
                    onChangeText={onChangeText}
                />
                <Ionicons name="search" size={20} color={Colors.darkBlue} style={styles.searchIcon} />
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
    searchBarWrapper: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: Colors.darkBlue,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    searchBar: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        color: Colors.black,
        backgroundColor: 'transparent',
        borderRadius: 24,
    },
    searchIcon: {
        marginRight: 12,
    },
});