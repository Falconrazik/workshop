import { StyleSheet, Text, View, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from "react";
import CustomStatusBar from '../../components/customStatusBar';
import CONST from '../../CONST';
import fonts from '../../assets/fonts/fonts';
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';
import { db } from '../../firebase';

export default function CreateBio ( {route, navigation} ) {
    const [bio, onChangeText] = useState(null);
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    let uid = route.params.paramKey;
    let type = route.params.userType;

    var userRef = db.collection("users").doc(uid);

    const saveBio = () => {
        return userRef.update({
            bio: bio
        })
        .then(() => {
            console.log("Bio successfully saved!");
            directNavigation();
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating bio: ", error);
        })
    }

    const directNavigation = () => {
        if (type == 'learn') {
            navigation.navigate('Home');
        }
        else {
            navigation.navigate('CreateSocial', {paramKey: uid});
        }
    }

    var isValid = false;
    const countWord = () => {
        var words = bio;
        if (!words) {
            words = "";
        }
        count = 0;
        var split = words.split(' ');

        for (var i = 0; i < split.length; i++) {
            if (split[i] != '') {
                count += 1;
            }
        }

        if (count != 0 && count <= 50) {
            isValid = true;
        }
        else {
            isValid = false;
        }

        return count;
    }

  return (
    <>
        <CustomStatusBar color={CONST.STATUS_BAR_COLOR.TRANSPARENT}/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.title}>About yourself!</Text>
                <Text style={styles.description}>Add a short bio about who you are</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        multiline
                        style={styles.input}
                        placeholder = "Add bio"
                        onSubmitEditing={Keyboard.dismiss}
                        autoCorrect= {false}
                        autoCapitalize = "none"
                        onChangeText={onChangeText}
                        value={bio}
                    />
                    <Text style={styles.wordCount}>{countWord()}/50</Text>
                </View>

                <TouchableOpacity 
                    style={[styles.saveDisabled, isValid && styles.saveEnabled]}
                    disabled={!isValid}
                    onPress={saveBio}
                >
                    <Text style={[styles.text, style={color: '#9FA0BD'}, isValid && styles.enableText]}>
                        Save
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.skipButton}
                    onPress={directNavigation}
                >
                    <Text style={styles.smallBoldText}>I'll do this later</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center"
    },

    inputContainer: {
        height: 230,
        width: "80%",
        justifyContent: "center",
        borderRadius: 22,
        backgroundColor: "#F8F7FF",
        padding: 20
    },

    input: {
        flex: 1,
        fontSize: 20,
        fontFamily: 'text'
    },

    wordCount: {
        fontFamily: 'text',
        fontSize: 20,
        textAlign: 'right'
    },

    title: {
        height: "5%",
        width: "80%",
        marginTop: "20%",
        fontFamily: 'textBold',
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: "bold"
    },

    description: {
        height: "7%",
        width: "80%",
        marginTop: "5%",
        fontFamily: 'text',
        color: '#FFFFFF',
        fontSize: 19
    },

    changeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 80,
        borderRadius: 22,
        marginTop: '5%',
        backgroundColor: '#F8F7FF'
    },

    skipButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: 30,
        marginTop: '20%'
    },

    text: {
        fontFamily: 'text',
        textAlign: 'center',
        fontSize: 20
    },

    saveDisabled: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 80,
        borderRadius: 22,
        marginTop: '10%',
        backgroundColor: '#D3D0E5',
    },

    saveEnabled: {
        backgroundColor: '#1ADDA8'
    },

    enableText: {
        color: '#000000',
        fontFamily: 'textBold'
    },

    smallBoldText: {
        fontFamily: 'textBold',
        textDecorationLine: 'underline',
        color: '#FFFFFF',
        fontSize: 14
    }
});