import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React from "react";
import fonts from '../assets/fonts/fonts';
import {useFonts} from 'expo-font';
import * as Google from 'expo-google-app-auth';
import CONST, { IOS_CLIENT_ID } from '../CONST';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import CustomStatusBar from '../components/customStatusBar';
import { auth } from '../firebase';

export default function Landing ( {navigation} ) {
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }
    const imagePath = "../assets/landing-background.png";
    const appleImgPath = "../assets/apple-logo.png";
    const googleImgPath = "../assets/google-logo.png";
    const logoPath = "../assets/logo.png";

    let email;
    let password;

    const signInWithGoogle = async() => {
        try {
          const config = {
            iosClientId: IOS_CLIENT_ID, //enter ios client id
            scopes: ['profile', 'email']
          };

          const { type, accessToken, user } = await Google.logInAsync(config);

          if (type  === 'success') {
            email = user.email
            password = user.id
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    navigation.navigate('Home');
                })
                .catch((error) => {
                    console.log('User does not exist - Redirect to Sign Up');
                    navigation.navigate('SignUp', { paramKey: user });
            });
          }
        } catch ({ message }) {
          alert('login: Error:' + message);
        }
    }

    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            navigation.navigate('Home');

            // ...
        } else {
            // User is signed out
            // ...
        }
    });
      

    return (
        <>
            <CustomStatusBar color={CONST.STATUS_BAR_COLOR.TRANSPARENT}/>
            <View style={styles.container}>
                <ImageBackground source={require(imagePath)} resizeMode="cover" style={styles.image}>
                    <View style={styles.appTitle}>
                        <Image style={styles.logo} source={require(logoPath)}/>
                        <Text style={styles.logoTitle}>backstage</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.googleBackground]}
                            onPress={signInWithGoogle}
                        >
                            <Image
                                style={styles.tinyLogo}
                                source={require(googleImgPath)}
                            />
                            <Text style={[styles.text]}>Sign in with Google</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000000'
    },

    logo: {
        width: 60,
        height: 84
    },

    appTitle: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: "60%"
    },

    logoTitle: {
        fontFamily: 'textBold',
        fontSize: 45,
        color: '#FFFFFF',
        shadowColor: '#FFFFFF',
        shadowOpacity: 0.9,
        shadowRadius: 30
    },

    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        marginTop: 30,
        borderRadius: 40,
        height: 45,
        backgroundColor: "#FFFFFF",
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: "40%",
        width: "70%",
    },

    googleBackground: {
        backgroundColor: "#E2E9FE"
    },

    text: {
        fontFamily: 'textBold',
        color: '#000000',
        textAlign: "center",
        flexGrow: 1
    },

    tinyLogo: {
        width: 50,
        height: 50,
        marginTop: -15,
    }
  });
