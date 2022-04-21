import { StyleSheet, Text, View, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import CustomStatusBar from '../../components/customStatusBar';
import CONST from '../../CONST';
import { db, auth, storage } from '../../firebase';
import Avatar from '../../components/avatar';
import fonts from '../../assets/fonts/fonts';
import { useFonts } from 'expo-font';
import CategoryCapsule from '../../components/categoryCapsule';
import { COLORS } from '../../CONST';
import { wrap } from 'lodash';

const CATEGORY_COLORS = [
    COLORS.BLUE_LIGHT,
    COLORS.BLUE_LIGHT,
    COLORS.GREEN_50,
];

const CreatorProfile = ( {uid, route, navigation} ) => {
    uid = uid ?? route.params.uid;
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

    const showRate = () => {
        if (userDetail) {
            return <Text style={styles.rateText}>${userDetail.rate}+</Text>
        }
    }

    const showDuration = () => {
        if (userDetail) {
            return <Text style={styles.rateText}>{userDetail.sessionDuration}</Text>
        }
    }

    let categories = ['yoga', 'pilates', 'calisthenics']

    return (
        <>
        <CustomStatusBar color={CONST.STATUS_BAR_COLOR.TRANSPARENT}/>

        <ScrollView style={styles.container}>
            <View style={{alignItems: "center", flex: 1}}>
                <View style={styles.userInfoContainer}>
                    {showPreview()}
                    <View style={{flexDirection: "column", flex: 1,  paddingLeft: "5%", justifyContent: "space-between"}}>
                        {showName()}
                        <View style={{flexDirection: "row", flex: 1, alignItems: "center"}}>
                            <Image style={styles.rating} source={require("../../assets/rating.png")}/>
                            <TouchableOpacity
                                style={{width: "15%", marginLeft: "5%"}}
                                onPress={() => {
                                    if (userDetail) {
                                        if (userDetail.instaURL)
                                            Linking.openURL(userDetail.instaURL);
                                    }
                                }}
                            >
                                <Image  style={{width: 40, height: 40}} source={require("../../assets/insta-logo.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{width: "15%"}}
                                onPress={() => {
                                    if (userDetail) {
                                        if (userDetail.youtubeURL)
                                            Linking.openURL(userDetail.youtubeURL);
                                    }
                                }}
                            >
                                <Image  style={{width: 40, height: 40}} source={require("../../assets/youtube-logo.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{width: "15%"}}
                                onPress={() => {
                                    if (userDetail) {
                                        if (userDetail.tiktokURL)
                                            Linking.openURL(userDetail.tiktokURL);
                                    }
                                }}
                            >
                                <Image  style={{width: 40, height: 40}} source={require("../../assets/tiktok-logo.png")}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {showBio()}

                <View style={styles.tagsContainer}>
                    {categories.map((category, index) => (
                        <CategoryCapsule
                            key={index}
                            category={category}
                            color={CATEGORY_COLORS[(index % CATEGORY_COLORS.length)]}
                        />
                    ))}
                </View>

                <View style={{width: "80%", height: "10%", marginTop: 20, flexDirection: "row", alignItems: "center"}}>
                        <View style={{flex: 1}}>
                            {showRate()}
                            <Text style={styles.textSmall}>per session</Text>
                        </View>
                        <View style={{flex: 1}}>
                            {showDuration()}
                            <Text style={styles.textSmall}>minutes</Text>
                        </View>
                </View>
            </View>

            <View style={{flexGrow: 8, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginTop: "-12%"}}>
                <View style={{width: "50%", padding: 10}}>
                       <Image source={require("../../assets/landing-background.png")} style={{width: 200, height: 300}}/>
                </View>
                <View style={{width: "50%", padding: 10, padding: 10}}>
                       <Image source={require("../../assets/landing-background.png")} style={{width: 200, height: 300}}/>
                </View>
                <View style={{width: "50%", padding: 10, padding: 10}}>
                       <Image source={require("../../assets/landing-background.png")} style={{width: 200, height: 300}}/>
                </View>
                <View style={{width: "50%", padding: 10, padding: 10}}>
                       <Image source={require("../../assets/landing-background.png")} style={{width: 200, height: 300}}/>
                </View>
                <View style={{width: "50%", padding: 10, padding: 10}}>
                       <Image source={require("../../assets/landing-background.png")} style={{width: 200, height: 300}}/>
                </View>
                <View style={{width: "50%", padding: 10, padding: 10}}>
                       <Image source={require("../../assets/landing-background.png")} style={{width: 200, height: 300}}/>
                </View>

            </View>
        </ScrollView>


        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.button, styles.googleBackground]}
                onPress={logOut}

            >
                <Text style={[styles.text, styles.textLarge]}>Log Out</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        paddingTop: "12%"
    },

    userInfoContainer: {
        width: "90%",
        height: "10%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    name: {
        fontFamily: 'textBold',
        fontSize: 25,
        textAlign: "left",
        color: '#F8F7FF'
    },

    rating: {
        width: 130,
        height: "60%",
    },

    description: {
        width: "90%",
        marginTop: "8%",
        fontFamily: 'text',
        fontSize: 15,
        textAlign: "left",
        color: '#F8F7FF'
    },

    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: "5%"
    },

    rateText: {
        fontFamily: 'textBold',
        fontSize: 25,
        textAlign: "center",
        color: '#F8F7FF'
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        height: 45,
        backgroundColor: "#FFFFFF",
    },

    buttonContainer: {
        right: 50,
        left: 50,
        position: 'absolute',
        bottom: 20,
    },

    googleBackground: {
        backgroundColor: "#E2E9FE"
    },

    text: {
        fontFamily: 'textBold',
        color: '#000000',
        textAlign: "center"
    },

    textSmall: {
        fontFamily: 'text',
        fontSize: 16,
        textAlign: "center",
        color: '#F8F7FF'
    }

});

export default CreatorProfile;
