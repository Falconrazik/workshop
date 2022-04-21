import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from "react";
import CustomStatusBar from '../../components/customStatusBar';
import CONST from '../../CONST';
import { db, auth, storage } from '../../firebase';
import Avatar from '../../components/avatar';
import fonts from '../../assets/fonts/fonts';
import { useFonts } from 'expo-font';

const UserProfile = ( {uid, navigation} ) => {
    const [methodType, setMethodType] = useState(false);
    const chooseSelection = () => {
            setMethodType(!methodType);
    }

    const [imageURL, setImage] = useState('');
    useEffect(() => {
        const fileName = uid + '.jpg';
        var fileRef = storage.ref().child(`avatar/${fileName}`);
        fileRef.getDownloadURL()
        .then((url) => {
            // `url` is the download URL for 'avatar/uid.jpg'
            setImage(url);
          })
          .catch((error) => {
            // Handle any errors
          });
    }, [] );

    const [userDetail, setUser] = useState(null);
    useEffect(() => {
        var docRef = db.collection("users").doc(uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setUser(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    
    }, [] );

    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    const logOut = () => {

        auth.signOut().then(() => {
            // Sign-out successful.
                // navigation.navigate('Landing')
                navigation.navigate("Landing");
                console.log('Sign out successful!')
            }).catch((error) => {
            // An error happened.
            });
    }   

    const showName = () => {
        if (userDetail) {
            return <Text style={styles.name}>@{userDetail.userName}</Text> ;
        }
        else {
            return <Text></Text>;
        }
    }

    const showBio = () => {
        if (userDetail) {
            return <Text style={styles.description}>{userDetail.bio}</Text> ;
        }
    }

    const showPreview = () => {
        if (!imageURL) {
            return  <Avatar width={100} height={100} borderRadius={20} borderWidth={5}/>
        }
        else {
            return <Avatar width={100} height={100} borderRadius={20} borderWidth={5} src={imageURL}/>
        }
    }

    return (
        <>
        <CustomStatusBar color={CONST.STATUS_BAR_COLOR.TRANSPARENT}/>

        <View style={styles.container}>
            {showPreview()}
            {showName()}
            <Image style={styles.rating} source={require("../../assets/rating.png")}/>
            {showBio()}
            <Text style={styles.paymentInfo}>Payment info</Text>

            <TouchableOpacity style={styles.paymentContainer}>
                <Image style={styles.paymentLogo} source={require("../../assets/credit-card.png")}/>
                <Text style={styles.paymentType}>**** **** **** XXXX</Text>
                <Image style={[styles.tinyLogo, methodType !== "card" && styles.disableSelection]} source={require("../../assets/selection-check.png")}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentContainer}>
                <Image style={styles.paymentLogo} source={require("../../assets/apple-logo.png")}/>
                <Text style={styles.paymentType}>Apple Pay</Text>
                <Image style={[styles.tinyLogo]} source={require("../../assets/selection-check.png")}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentContainer}>
                <Image style={styles.paymentLogo} source={require("../../assets/plus.png")}/>
                <Text style={[styles.paymentType, styles.purpleText]}>add payment method</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.googleBackground]}
                        onPress={logOut}

                    >
                        <Text style={[styles.text, styles.textLarge]}>Log Out</Text>
                    </TouchableOpacity>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        paddingTop: "12%"
    },

    name: {
        height: "5%",
        width: "80%",
        marginTop: "5%",
        fontFamily: 'textBold',
        fontSize: 22,
        textAlign: "center",
        color: '#F8F7FF'
    },

    rating: {
        width: "35%",
        height: "5%"
    },

    description: {
        height: "5%",
        width: "90%",
        marginTop: "5%",
        fontFamily: 'text',
        fontSize: 15,
        textAlign: "center",
        color: '#F8F7FF'
    },

    paymentInfo: {
        width: "85%",
        height: "5%",
        marginTop: "7%",
        fontFamily: 'textBold',
        fontSize: 22,
        textAlign: "left",
        color: '#F8F7FF'
    },

    paymentContainer: {
        width: "85%",
        height: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "5%"
    },

    paymentType: {
        fontFamily: 'textBold',
        fontSize: 18,
        color: '#F8F7FF',
        paddingLeft: 15,
        flex: 1,
        textAlign: "left"
    },

    paymentLogo: {
        width: 40,
        height: 40
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        height: 45,
        backgroundColor: "#FFFFFF",
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: "20%",
        width: "50%",
    },

    googleBackground: {
        backgroundColor: "#E2E9FE"
    },

    text: {
        fontFamily: 'textBold',
        color: '#000000',
        textAlign: "center"
    },

    tinyLogo: {
        width: 20,
        height: 20,
    },

    disableSelection: {
        opacity: 0
    },

    purpleText: {
        color: '#6248FF'
    },

});

export default UserProfile;
