import { LinearGradient } from 'expo-linear-gradient';
import * as NavigationBar from 'expo-navigation-bar';
import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type Props = PropsWithChildren<{}>;

export default function LinearBackground({ children, }: Props) {
    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
    }, []);
    return (
        <LinearGradient
            colors={['#FFFFFF', '#8ED6FF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradient}
        >
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.topMargin} />
                {children}
                <View style={styles.bottomMargin} />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
    },
    topMargin: {
        height: 48,
    },
    bottomMargin: {
        height: 48,
    },
    content: {
        padding: 32,
        gap: 16,
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
});