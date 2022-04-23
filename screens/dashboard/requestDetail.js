import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import CustomStatusBar from '../../components/customStatusBar';
import CONST from '../../CONST';
import { db, auth, storage } from '../../firebase';
import Avatar from '../../components/avatar';
import fonts from '../../assets/fonts/fonts';
import { useFonts } from 'expo-font';

const RequesDetail = ( {route, navigation} ) => {
    let uid = uid ?? route.params.uid;
    let date = route.params.date;
    let time = route.params.time;
    let rate = route.params.rate;
    let fee = rate * 0.15;
    let payout = rate - fee;

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

    const [creatorDetail, setCreatorDetail] = useState(null)
    auth.onAuthStateChanged((user) => {
    if (user) {
        var docRef = db.collection("users").doc(auth.currentUser.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setCreatorDetail(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
    });

    const declineRequest = () => {
        let bookings = creatorDetail.bookings;
        for (var i = 0; i < bookings.length; i++) {
            if (bookings[i].userUID === uid) {
                bookings.splice(i, 1);
            }
        }
        console.log(bookings);

        var docRef = db.collection("users").doc(auth.currentUser.uid);
        docRef.update({
            bookings: bookings
        })
        .then(() => {
            console.log("Booking successfully removed!");
        })
        .catch((error) => {
            console.error("Error removing booking: ", error);
        });
    }

    const acceptRequest = () => {
        let bookings = creatorDetail.bookings;
        bookings.map((item) => {
            if (item.userUID === uid) {
                item.status = "upcoming";
            }
        });

        // Update creator bookings
        var docRef = db.collection("users").doc(auth.currentUser.uid);
        docRef.update({
            bookings: bookings
        })
        .then(() => {
            console.log("Booking successfully updated!");
        })
        .catch((error) => {
            console.error("Error updating booking: ", error);
        });
        
        // Update user bookings
        var userRef = db.collection("users").doc(uid);
        userRef.update({
            bookings: bookings
        })
        .then(() => {
            console.log("Booking successfully updated!");
            navigation.goBack();
        })
        .catch((error) => {
            console.error("Error updating booking: ", error);
        });
    }

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
            return  <Avatar width={100} height={100} borderRadius={10} borderWidth={5}/>
        }
        else {
            return <Avatar width={100} height={100} borderRadius={10} borderWidth={5} src={imageURL}/>
        }
    }

    const showNavBar = () => (
        <View style={{backgroundColor: 'transparent', height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 29}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={{width: 25, height: 20}}
                    source={require('../../assets/back_arrow.png')}
                />
            </TouchableOpacity>

        </View>
    );

    return (
        <>
        <CustomStatusBar color={CONST.STATUS_BAR_COLOR.TRANSPARENT}/>
        {showNavBar()}
        <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
            {showPreview()}
            {showName()}
            <Image style={styles.rating} source={require("../../assets/rating.png")}/>
            {showBio()}
            <Text style={styles.requestDetail}>Note</Text>
            <Text style={[styles.description, {width: "90%", textAlign: "left"}]}>I want to learn more about trading bitcoin. I would love to know more about your technique of futures trading.</Text>

            <Text style={styles.requestDetail}>Request Detail</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.detailTitle}>Date</Text>
                <Text style={[styles.detailTitle, {textAlign: "right"}]}>{date}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.detailTitle}>Time</Text>
                <Text style={[styles.detailTitle, {textAlign: "right"}]}>{time}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.detailTitle}>Rate</Text>
                <Text style={[styles.detailTitle, {textAlign: "right"}]}>${rate}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.detailTitle}>Fees</Text>
                <Text style={[styles.detailTitle, {textAlign: "right"}]}>- ${fee}</Text>
            </View>

            <View style={styles.payoutContainer}>
                <Text style={styles.detailTitle}>Payout</Text>
                <Text style={[styles.detailTitle, {textAlign: "right"}]}>${payout}</Text>
            </View>

            <View style={[styles.detailContainer, {marginTop: "5%", width: "90%"}]}>
                <TouchableOpacity style={[styles.button, {backgroundColor: "#D3D0E5"}]} onPress={declineRequest}>
                    <Text style={[{fontFamily: 'textBold', fontSize: 16, color: "#9FA0BD"}]}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor: "#1ADDA8"}]} onPress={acceptRequest}>
                    <Text style={[{fontFamily: 'textBold', fontSize: 16, color: "#000000"}]}>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        marginTop: 15
    },

    name: {
        flex: 1,
        marginTop: "5%",
        fontFamily: 'textBold',
        fontSize: 22,
        textAlign: "center",
        color: '#F8F7FF'
    },

    rating: {
        width: 100,
        height: 30,
        marginTop: "2%"
    },

    description: {
        flex: 1,
        marginTop: "2%",
        fontFamily: 'text',
        fontSize: 15,
        textAlign: "center",
        color: '#F8F7FF'
    },

    requestDetail: {
        flex: 1,
        width: "90%",
        marginTop: "7%",
        fontFamily: 'textBold',
        fontSize: 20,
        textAlign: "left",
        color: '#F8F7FF'
    },

    detailContainer: {
        flex: 1,
        width: "80%",
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    payoutContainer: {
        flex: 1,
        width: "80%",
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#FFFFFF",
        paddingTop: 20
    },

    detailTitle: {
        flex: 1,
        fontFamily: 'text',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: "left"
    },

    button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        overflow: "hidden",
        width: "48%",
        height: 50,
    },
});

export default RequesDetail;
