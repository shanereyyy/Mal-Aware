import { LinearGradient } from 'expo-linear-gradient';
import * as NavigationBar from 'expo-navigation-bar';
import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';

type Props = PropsWithChildren<{
    centered?: boolean;
}>;

export default function LinearBackground({ children, centered = false }: Props) {

    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
    }, []);
    
    const contentStyle: (ViewStyle | false)[] = [
        styles.content,
        centered && styles.contentCentered,
    ];

    return (

        <LinearGradient
            colors={['#FFFFFF', '#8ED6FF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradient}
        >

            <ScrollView 
                contentContainerStyle={contentStyle} 
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    
    gradient: {
        flex: 1,
    },

    content: {
        padding: 24,
        gap: 16,
        marginHorizontal: 16,
        marginTop: 64,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },

    contentCentered: {
        flexGrow: 1,
        justifyContent: 'center',
        marginTop: 0,
    }
});