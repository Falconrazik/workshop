import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import Avatar from '../../components/avatar';
import { storage } from '../../firebase';
import fonts from '../../assets/fonts/fonts';
import { useFonts } from 'expo-font';
import { db, auth } from '../../firebase';

const VideoCall = ({route, navigation}) => {
    let uid = route.params.uid;
    let name = route.params.name;

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

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const [userDetail, setDetail] = useState(null)
    auth.onAuthStateChanged((user) => {
    if (user) {
        var docRef = db.collection("users").doc(auth.currentUser.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setDetail(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
    });

    const [creatorDetail, setCreatorDetail] = useState(null)
    useEffect(() => {
        var docRef = db.collection("users").doc(uid);
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
    
    }, [] );
  
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    const showPreview = () => {
        if (!imageURL) {
            return  <Avatar width={100} height={100} borderRadius={100} borderWidth={2}/>
        }
        else {
            return <Avatar width={100} height={100} borderRadius={100} borderWidth={2} src={imageURL}/>
        }
    }

    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type}>
            <CallTool imageURL={imageURL} name={name} userDetail={userDetail} creatorDetail={creatorDetail} uid={uid} navigation={navigation}/>
            <TouchableOpacity 
                style={{flexDirection: "row", width: "90%", marginTop: 20}} 
                onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                }}
            >
                <Image source={require("../../assets/icons/flip-camera.png")} style={[styles.logo, {alignSelf: "flex-end", borderRadius: 50, borderWidth: 1}]}/>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
            <View style={styles.button}>
                {showPreview()}
            </View>
            </View>
        </Camera>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        alignItems: "center"
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
    },
    text: {
        fontFamily: 'textBold',
        fontSize: 14,
        color: 'white',
        marginLeft: -10
    },

    logo: {
        width: 45,
        height: 45,
    },

    callToolContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        height: 80,
        backgroundColor: "#000000CC",
        marginTop: 8,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 18
    },
});

function CallTool({imageURL, name, userDetail, creatorDetail, uid, navigation}) {
    const showPreview = () => {
        if (!imageURL) {
            return  <Avatar width={45} height={45} borderRadius={4} borderWidth={2}/>
        }
        else {
            return <Avatar width={45} height={45} borderRadius={4} borderWidth={2} src={imageURL}/>
        }
    }

    return (
        <View style={styles.callToolContainer}>
            {showPreview()}
            <Text style={styles.text}>@{name}</Text>
            <TouchableOpacity><Image source={require("../../assets/icons/camera.png")} style={styles.logo}/></TouchableOpacity>
            <TouchableOpacity><Image source={require("../../assets/icons/volume.png")} style={[styles.logo, {marginLeft: -10}]}/></TouchableOpacity>
            <TouchableOpacity onPress={() => {
                let bookings = userDetail.bookings;
                bookings.map((item) => {
                    if (item.userUID === uid) {
                        item.status = "completed";
                    }
                });
                // Update creator bookings
                var docRef = db.collection("users").doc(userDetail.uid);
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
                let userBookings = creatorDetail.bookings;
                userBookings.map((item) => {
                    if (item.userUID === auth.currentUser.uid) {
                        item.status = "completed";
                    }
                });
                var userRef = db.collection("users").doc(creatorDetail.uid);
                userRef.update({
                    bookings: userBookings
                })
                .then(() => {
                    console.log("Booking successfully updated!");
                    navigation.goBack();
                })
                .catch((error) => {
                    console.error("Error updating booking: ", error);
                });
            }}
            >
                <Image source={require("../../assets/icons/call.png")} style={styles.logo}/>
            </TouchableOpacity>
        </View>
    );
}
  
export default VideoCall