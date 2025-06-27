import { Colors } from '@/constants/Colors';
import React from "react";
import { StyleSheet, TextInput } from 'react-native';

interface Props {
    name: string;
}

export default function TextBox({ name }: Props): React.ReactElement {

    return(
        <TextInput style={styles.input} placeholder={name} placeholderTextColor="#7B8D93" />
    );

}

const styles = StyleSheet.create({

    input: {
        width: '80%',
        height: 50,
        backgroundColor: Colors.white,
        borderRadius: 25,
        marginBottom: 15,
        paddingHorizontal: 20,
        borderWidth: 0,
        elevation: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      
});