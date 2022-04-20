import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Image } from 'react-native'
import React, { useState, useEffect } from "react";
import CustomStatusBar from '../../components/customStatusBar'
import CONST from '../../CONST'
import fonts from '../../assets/fonts/fonts'
import { useFonts } from 'expo-font'
import { TextInput } from 'react-native-gesture-handler'
import { db } from '../../firebase';

export default function CreateSocial ( {route, navigation}) {
    const [instaURL, onChangeInsta] = useState(null);
    const [youtubeURL, onChangeYoutube] = useState(null);
    const [tiktokURL, onChangeTiktok] = useState(null);
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    const instaLogo = "../../assets/insta-logo.png";
    const youtubeLogo = "../../assets/youtube-logo.png";
    const tiktokLogo = "../../assets/tiktok-logo.png";

    const isValid = instaURL || youtubeURL || tiktokURL;

    let uid = route.params.paramKey;
    var userRef = db.collection("users").doc(uid);

    const saveSocial = () => {
        return userRef.update({
            instaURL: instaURL,
            youtubeURL: youtubeURL,
            tiktokURL: tiktokURL
        })
        .then(() => {
            console.log("Socials successfully saved!");
            navigateRate();
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating socials: ", error);
        })
    }

    const navigateRate = () => {
        navigation.navigate("CreateRate");
    }

  return (
    <>
        <CustomStatusBar color={CONST.STATUS_BAR_COLOR.TRANSPARENT}/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Social media</Text>
                <Text style={styles.description}>Link your social media accounts</Text>
                
                <View style={styles.inputContainer}>
                    <Image 
                        style={[styles.logo, instaURL && styles.lightLogo]}
                        source={require(instaLogo)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = "Instagram URL"
                        placeholderTextColor = "#FFFFFFCC"
                        onSubmitEditing={Keyboard.dismiss}
                        autoCorrect= {false}
                        autoCapitalize = "none"
                        onChangeText={onChangeInsta}
                        value={instaURL}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Image 
                        style={[styles.logo, youtubeURL && styles.lightLogo]}
                        source={require(youtubeLogo)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = "Youtube URL"
                        placeholderTextColor = "#FFFFFFCC"
                        onSubmitEditing={Keyboard.dismiss}
                        autoCorrect= {false}
                        autoCapitalize = "none"
                        onChangeText={onChangeYoutube}
                        value={youtubeURL}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Image 
                        style={[styles.logo, tiktokURL && styles.lightLogo]}
                        source={require(tiktokLogo)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = "TikTok URL"
                        placeholderTextColor = "#FFFFFFCC"
                        onSubmitEditing={Keyboard.dismiss}
                        autoCorrect= {false}
                        autoCapitalize = "none"
                        onChangeText={onChangeTiktok}
                        value={tiktokURL}
                    />
                </View>

                <TouchableOpacity 
                    style={[styles.saveDisabled, isValid && styles.saveEnabled]}
                    disabled={!isValid}
                    onPress={saveSocial}
                >
                    <Text style={[styles.text, style={color: '#9FA0BD'}, isValid && styles.enableText]}>
                        Save
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.skipButton}
                    onPress={navigateRate}
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
        width: "80%",
        height: "7%",
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    logo: {
        height: 50,
        width: 50,
        opacity: 0.4
    },

    lightLogo: {
        opacity: 1
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