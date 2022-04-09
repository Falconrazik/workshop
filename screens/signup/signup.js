import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, useState, Image } from 'react-native';
import CONST from '../../CONST';
import CustomStatusBar from '../../components/customStatusBar';
import fonts from '../../assets/fonts/fonts';
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-gesture-handler';
import CustomSwitch from "../../components/customSwitch";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore"; 
import { NavigationContainer } from "@react-navigation/native";
import NativeI18nManager from "react-native/Libraries/ReactNative/NativeI18nManager";
import { create } from "lodash";

export default function SignUp ( {route, navigation} ) {
    const [username, onChangeText] = React.useState(null);
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    let type = 'learn';
    const onSelectSwitch = index => {
        if (index === 1) {
            type = 'learn';
        }
        else {
            type = 'teach';
        }
    }

    const blackArrow = "../../assets/black-arrow.png";
    const purpleArrow = "../../assets/purple-arrow.png";

    let icon = !username ? blackArrow : purpleArrow;

    const auth = getAuth();
    // Get user form landing page
    const addUserInFireStore = (user) => {
        try {
            console.log(username);
            console.log(type);
            console.log(user.name);
            console.log(user.email);
            const docRef = addDoc(collection(db, "users"), {
                name: user.name,
                email: user.email,
                uid: "",
                userName: username,
                userType: type
            });
          
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    const createUser = () => {
        let user = route.params.paramKey;
        if (user === null) 
        console.log('Google acc does not exist');
        
        createUserWithEmailAndPassword(auth, user.email, user.id)
        .then((userCredential) => {
            // Signed in 
            const newUser = userCredential.user;
            addUserInFireStore(user);
            navigation.navigate('CreateAvatar');

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
          
    }

    return (
        <>
            <CustomStatusBar color={CONST.STATUS_BAR_COLOR.TRANSPARENT}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text style={styles.title}>Create your account</Text>

                    <View style={styles.inputContainer}>
                        <Text style={[styles.text, styles.textLarge]}>@</Text>
                        <TextInput
                            style={styles.input}
                            placeholder = "username"
                            onSubmitEditing={Keyboard.dismiss}
                            autoCorrect= {false}
                            autoCapitalize = "none"
                            onChangeText={onChangeText}
                            value={username}
                        />
                    </View>

                    <View style={styles.switchContainer}>
                        <Text style={[styles.text, styles.textSmall]}>I want to </Text>
                        <CustomSwitch
                            selectionMode={1}
                            roundCorner={true}
                            option1={'learn'}
                            option2={'teach'}
                            onSelectSwitch={onSelectSwitch}
                            selectionColor={'white'}
                            style={styles.switch}
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            username && styles.enableButton
                        ]}
                        disabled={!username}
                        onPress={createUser}
                    >
                        <Text 
                            style={[
                                styles.textSmall,
                                styles.textBlack,
                                !username && styles.textDisabled
                            ]}
                        >
                            Sign me up
                        </Text>
                        <Image
                            style={styles.tinyLogo}
                            source={ !username ? require(purpleArrow) : require(blackArrow) }
                        />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center"
    },

    title: {
        height: "10%",
        width: "80%",
        marginTop: "20%",
        fontFamily: 'textBold',
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: "bold"
    },

    inputContainer: {
        height: 75,
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "10%",
        borderRadius: 40,
        backgroundColor: "#F8F7FF"

    },

    input: {
        flex: 8,
        fontSize: 25
    },

    switchContainer: {
        height: 75,
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "10%"
    },

    switch: {
        flex: 3
    },  

    button: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "10%",
        borderRadius: 40,
        height: 75,
        width: "90%",
        backgroundColor: "#D3D0E5",
    },

    enableButton: {
        backgroundColor: '#1ADDA8'
    },

    text: {
        fontFamily: 'textBold',
        color: '#000000',
        textAlign: "right",
        padding: 10
    },

    textLarge: {
        fontSize: 30,
        flex: 1
    },

    textSmall: {
        textAlign: "center",
        fontSize: 20,
        color: '#FFFFFFCC'
    },

    textBlack: {
        fontFamily: 'textBold',
        marginLeft: "5%",
        color: '#000000'
    },
    
    textDisabled: {
        color: "#656580"
    },  

    tinyLogo: {
        width: 25,
        height: 19,
        marginRight: "5%"
    }

});