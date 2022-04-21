import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";
import CustomStatusBar from '../../components/customStatusBar';
import CONST from '../../CONST';
import { db, auth } from '../../firebase';
import UserProfile from './userProfile';
import CreatorProfile from './creatorProfile';

/**
 * Depending on account type conditionally display CreatorAccount or UserAccount
 */

export default function Account ( {navigation} ) {
    const [type, getUserType] = useState(null);
    const user = auth.currentUser;
    let uid;

    if (user !== null) {
        uid = user.uid
    }
    class User {
        constructor (uid, userType, userName, bio) {
            this.uid = uid;
            this.userType = userType;
            this.userName = userName;
            this.bio = bio
        }
        toString() {
            return this.uid + ', ' + this.userType;
        }
    }

    var userConverter = {
        toFirestore: function(user) {
            return {
                uid: user.uid,
                userType: user.userType,
                userName: user.userName,
                bio: user.bio
            };
        },
        fromFirestore: function(snapshot, options){
            const data = snapshot.data(options);
            return new User(data.uid, data.userType, data.userName, data.bio);
        }
    };

    var userDetail = new User(uid, "teach", "Unknown", "Unknown");
    db.collection("users").doc(uid)
        .withConverter(userConverter)
        .get().then((doc) => {
            if (doc.exists){
                // Convert to User object
                userDetail = doc.data();
                // Use a City instance method
                getUserType(userDetail.userType);
            } else {
                console.log("No such document!");
                }}).catch((error) => {
                console.log("Error getting document:", error);
            });

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

    const showAccount = () => {
        if (type === "learn") {
            return <UserProfile uid={uid} navigation={navigation}/>
        }
        if (type === "teach") {
            return  <CreatorProfile uid={uid} navigation={navigation}/>
        }
    }

    return (
        <>
            {showAccount()}
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center"
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
