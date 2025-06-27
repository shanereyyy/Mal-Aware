import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar() {

    return (

        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                placeholderTextColor="#888"
            />
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
});