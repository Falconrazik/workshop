import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Image } from 'react-native'
import React, { useState, useEffect } from "react";
import CustomStatusBar from '../../components/customStatusBar'
import CONST from '../../CONST'
import fonts from '../../assets/fonts/fonts'
import { useFonts } from 'expo-font'
import { TextInput } from 'react-native-gesture-handler'
import { db, auth } from '../../firebase';

export default function CreateRate ( {navigation}) {
    const [rate, onChangeRate] = useState(null);
    const [time, onChangeTime] = useState(null);
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    const instaLogo = "../../assets/insta-logo.png";
    const youtubeLogo = "../../assets/youtube-logo.png";
    const tiktokLogo = "../../assets/tiktok-logo.png";

    const isValid = rate && time;

    let uid = auth.currentUser.uid;
    var userRef = db.collection("users").doc(uid);

    const setRate = () => {
        var setWithMerge = userRef.set({
            rate: rate,
            sessionDuration: time
        }, { merge: true });

        navigateHome();
    }

    const navigateHome = () => {
        navigation.navigate("Home");
    }

  return (
    <>
        <CustomStatusBar color={CONST.STATUS_BAR_COLOR.TRANSPARENT}/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
            <Text style={styles.title}>Rates</Text>
                <Text style={styles.description}>Set up rates for booking sessions with you</Text>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.rateText}>$</Text>
                    <TextInput
                        style={styles.input}
                        placeholder = "Rate"
                        placeholderTextColor = "#FFFFFFCC"
                        onSubmitEditing={Keyboard.dismiss}
                        autoCorrect= {false}
                        autoCapitalize = "none"
                        onChangeText={onChangeRate}
                        value={rate}
                    />
                    <Text style={styles.rateText}>/ Session</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder = "Duration"
                        placeholderTextColor = "#FFFFFFCC"
                        onSubmitEditing={Keyboard.dismiss}
                        autoCorrect= {false}
                        autoCapitalize = "none"
                        onChangeText={onChangeTime}
                        value={time}
                    />
                    <Text style={styles.rateText}> minutes</Text>
                </View>


                <TouchableOpacity 
                    style={[styles.saveDisabled, isValid && styles.saveEnabled]}
                    disabled={!isValid}
                    onPress={setRate}
                >
                    <Text style={[styles.text, style={color: '#9FA0BD'}, isValid && styles.enableText]}>
                        Save
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.skipButton}
                    onPress={navigateHome}
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

    input: {
        flex: 1,
        fontSize: 20,
        fontFamily: 'textBold',
        color: '#FFFFFF',
        paddingLeft: 20
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

    inputContainer: {
        width: "50%",
        height: "7%",
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    rateText: {
        color: '#9FA0BD',
        fontFamily: 'textBold',
        fontSize: 20
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
        marginTop: '15%',
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