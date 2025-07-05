import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    name: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    showEye?: boolean;
    value?: string;
    borderColor?: string;
}

export default function TextBox({ name, onChangeText, secureTextEntry = false, showEye = false, value, borderColor }: Props): React.ReactElement {
    const [visible, setVisible] = useState(false);
    const isPassword = secureTextEntry;
    return (
        <View style={styles.inputWrapper}>
            <TextInput
                style={[
                    styles.input,
                    borderColor && { borderWidth: 2, borderColor }
                ]}
                placeholder={name}
                placeholderTextColor={Colors.grey}
                onChangeText={onChangeText}
                secureTextEntry={isPassword && !visible}
                value={value}
            />
            {showEye && isPassword && (
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setVisible(v => !v)}>
                    <Ionicons name={visible ? 'eye' : 'eye-off'} size={22} color={Colors.grey} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        width: '80%',
        marginBottom: 15,
        position: 'relative',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.white,
        borderRadius: 25,
        paddingHorizontal: 20,
        borderWidth: 0,
        elevation: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        color: Colors.black,
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
        top: 14,
    },
});