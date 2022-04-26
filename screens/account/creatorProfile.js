import { StyleSheet, Text, View, TouchableOpacity, Image, Linking, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from "react";
import CustomStatusBar from '../../components/customStatusBar';
import CONST from '../../CONST';
import { db, auth, storage } from '../../firebase';
import Avatar from '../../components/avatar';
import fonts from '../../assets/fonts/fonts';
import { useFonts } from 'expo-font';
import CategoryCapsule from '../../components/categoryCapsule';
import { COLORS } from '../../CONST';
import videos from '../../videos';
import NavBar from '../../components/navbar';

const CATEGORY_COLORS = [
    COLORS.BLUE_LIGHT,
    COLORS.BLUE_LIGHT,
    COLORS.GREEN_50,
];

const CreatorProfile = ( {uid, route, navigation} ) => {
    const [userUID, setUID] = useState('');
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
    }, []);

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
            return  <Avatar width={100} height={100} borderRadius={15} borderWidth={5}/>
        }
        else {
            return <Avatar width={100} height={100} borderRadius={15} borderWidth={5} src={imageURL}/>
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

    const showSessions = () => {
        if (userDetail) {
            return <Text style={styles.rateText}>{userDetail.sessions}</Text>
        }
    }

    const showContent = () => {
        const contentWidth = (Dimensions.get('window').width - 35) / 2;
        const contentHeight = contentWidth * 1.18;

        const onPressContent = ({file, creatorUID, thumbnail}) => {
            navigation.navigate("Short", {
                video: file,
                creatorUID,
                shouldPlay: true,
            })
        }

        return videos
            .filter(short => short.creatorUID === uid)
            .map((short, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => onPressContent(short)}
                    style={{width: "50%", padding: 10}}
                >
                    <Image source={short.thumbnail} resizeMode="cover" style={{width: contentWidth, height: contentHeight, marginHorizontal: 6, borderRadius: 30}}/>
                </TouchableOpacity>
            ));
    }

    const showAddContent = () => {
        const contentWidth = (Dimensions.get('window').width - 35) / 2;
        const contentHeight = contentWidth * 1.18;
        if (userUID === uid) {
            return <TouchableOpacity
                        style={{width: "50%", padding: 10}}
                    >
                        <Image source={require("../../assets/add-content-btn.png")} resizeMode="cover" style={{width: contentWidth, height: contentHeight, marginHorizontal: 6, borderRadius: 30}}/>
                    </TouchableOpacity>
        }
    }

    auth.onAuthStateChanged((user) => {
        if (user) {
            setUID(user.uid);
        }
      });
    const showButton = () => {
        if (userUID === uid) {
            return  <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: "#E2E9FE"}]}
                            onPress={logOut}

                        >
                            <Text style={[styles.text, styles.textLarge]}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
        }
        else {
            return <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("BookingForm", {creatorUID: uid, username: userDetail.userName, rate: userDetail.rate, category: userDetail.categories[0]})}
                        style={[styles.button, {padding: 10, backgroundColor: "#1ADDA8", shadowColor: '#1ADDA8', shadowOpacity: 0.5, shadowRadius: 20}]}
                    >
                        <Text style={[styles.text, styles.textLarge]}>book</Text>
                   </TouchableOpacity>
                   </View>
        }
    }

    const showNavBar = () => (
        auth.currentUser?.uid === uid
            ? (
                <View style={{backgroundColor: 'transparent', height: 65, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 29}}>
                    <TouchableOpacity>
                        <Image
                            style={{width: 22, height: 26.17, marginRight: 14}}
                            source={require('../../assets/edit_icon.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={{width: 17, height: 21}}
                            source={require('../../assets/hamburger_icon.png')}
                        />
                    </TouchableOpacity>

                </View>
            ) : (
                <View style={{backgroundColor: 'transparent', height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 29}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={{width: 25, height: 20}}
                            source={require('../../assets/back_arrow.png')}
                        />
                    </TouchableOpacity>

                </View>
            )
    );

    let categories = ['yoga', 'pilates', 'calisthenics']
    const showCategory = () => {
        if (userDetail) {
            if (userDetail.categories)
                return  <View style={styles.tagsContainer}>
                        {userDetail.categories.map((category, index) => (
                            <CategoryCapsule
                                key={index}
                                category={category}
                                color={CATEGORY_COLORS[(index % CATEGORY_COLORS.length)]}
                            />
                        ))}
                    </View>
        }
        else {
            return  <View style={styles.tagsContainer}>
                    {categories.map((category, index) => (
                        <CategoryCapsule
                            key={index}
                            category={category}
                            color={CATEGORY_COLORS[(index % CATEGORY_COLORS.length)]}
                        />
                    ))}
                </View>
        }
    }

    return (
        <>
        <CustomStatusBar color={CONST.STATUS_BAR_COLOR.TRANSPARENT}/>
        <NavBar navigation={navigation} uid={uid} />
        <ScrollView style={styles.container}>
            <View style={{alignItems: "center", flex: 1, marginTop: "12%"}}>
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

                {showCategory()}

                <View style={{width: "80%", height: "10%", marginTop: 20, flexDirection: "row", alignItems: "center"}}>
                        <View style={{flex: 1}}>
                            {showRate()}
                            <Text style={styles.textSmall}>per session</Text>
                        </View>
                        <View style={{flex: 1}}>
                            {showDuration()}
                            <Text style={styles.textSmall}>minutes</Text>
                        </View>
                        <View style={{flex: 1}}>
                            {showSessions()}
                            <Text style={styles.textSmall}>total sessions</Text>
                        </View>
                </View>
            </View>

            <View style={{flexGrow: 8, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginTop: "-12%"}}>
                {showAddContent()}
                {showContent()}
            </View>
        </ScrollView>
        {showButton()}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000"
    },

    userInfoContainer: {
        width: "90%",
        height: "10%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        marginTop: 15,
    },

    name: {
        fontFamily: 'textBold',
        fontSize: 20,
        textAlign: "left",
        color: '#F8F7FF'
    },

    rating: {
        width: 130,
        height: "60%",
    },

    description: {
        width: "90%",
        marginTop: "10%",
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
        height: 40,
        width: 110,
        backgroundColor: "#FFFFFF"
    },

    buttonContainer: {
        right: 30,
        position: 'absolute',
        bottom: 30,
    },
    text: {
        fontFamily: 'textBold',
        color: '#000000',
        textAlign: "center",
        fontSize: 20
    },

    textSmall: {
        fontFamily: 'text',
        fontSize: 16,
        textAlign: "center",
        color: '#F8F7FF'
    }

});

export default CreatorProfile;
