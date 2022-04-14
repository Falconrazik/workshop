import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useFonts} from 'expo-font';
import fonts from '../assets/fonts/fonts';

export default function CategoryCapsule({category, color}) {
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    return (
        <TouchableOpacity
            style={[styles.categoryCapsule, {backgroundColor: color}]}
        >
            <Text style={styles.text}>{category}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    categoryCapsule: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 4,
    },
    text: {
        fontFamily: 'textSemiBold',
        color: 'black',
        fontSize: 14,
        lineHeight: 17.07,
    },
})
