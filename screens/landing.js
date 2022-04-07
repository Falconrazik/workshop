import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useState } from "react";
import fonts from '../assets/fonts/fonts';
import {useFonts} from 'expo-font';
import * as Google from 'expo-google-app-auth';
import { auth, Firebase } from '../firebase'
import { IOS_CLIENT_ID } from '../CONST';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export default function Landing ( {navigation} ) {

    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }
    const imagePath = "../assets/landing-background.png";
    const appleImgPath = "../assets/apple-logo.png";
    const googleImgPath = "../assets/google-logo.png";

    const auth = getAuth();
    let email;
    let password;

    signInWithGoogle = async() => {
        try {
          const config = {
            iosClientId: IOS_CLIENT_ID, //enter ios client id
            scopes: ['profile', 'email']
          };
          
          const { type, accessToken, user } = await Google.logInAsync(config);

          if (type  === 'success') {
            email = user.email
            password = user.id
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    navigation.navigate('Home');
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    createUserWithEmailAndPassword(auth, email, password)
            });
          }
        } catch ({ message }) {
          alert('login: Error:' + message);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require(imagePath)} resizeMode="cover" style={styles.image}>
                <Text style={styles.appTitle}>Workshop.</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={signInWithGoogle}
                    >
                        <Image
                            style={styles.tinyLogo}
                            source={require(appleImgPath)}
                        />
                        <Text style={styles.text}>Sign in with Apple</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.googleBackground]}
                        onPress={signInWithGoogle}
                    >
                        <Image
                            style={styles.tinyLogo}
                            source={require(googleImgPath)}
                        />
                        <Text style={[styles.text, styles.textLarge]}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
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
    },

    appTitle: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: "60%",
        fontFamily: 'textBold',
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: "bold"
    },

    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop: 30,
        borderRadius: 40,
        height: 45,
        backgroundColor: "#FFFFFF",
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: "30%",
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