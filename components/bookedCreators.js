import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react'
import fonts from '../assets/fonts/fonts'
import { useFonts } from 'expo-font'
import CreatorCard from './creatorCard'
import { db } from '../firebase'

const BookedCreator = ({route, navigation}) => {
    let userUID = route.params.userUID;

    const [userDetail, setUserDetail] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUserDetails = (cb) => {
        var docRef = db.collection("users").doc(userUID);
        docRef.get().then((doc) => {
            if (doc.exists) {
            setUserDetail(doc.data());
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
            if (cb) {
            cb();
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const onRefresh = () => {
    setRefreshing(true);
    fetchUserDetails(() => setRefreshing(false));
    }

    useEffect(() => {
    fetchUserDetails();
    const intervalID = setInterval(() => {
        fetchUserDetails();
    }, 10000);
    return () => clearInterval(intervalID);
    }, [] );

    const showCreatorList = () => {
        if (userDetail) {
            let creatorSet = new Set();
            let bookings = userDetail.bookings;
            return bookings.map((item, index) => {
                if (item.status === "upcoming" || item.status === "completed") {
                    if (!creatorSet.has(item.userUID)) {
                        creatorSet.add(item.userUID);
                        return <CreatorCard key={index} uid={item.userUID} type={"message"} navigation={navigation}/>;
                    }
                }
            });
        }
    }

    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    return (
    <>
    <View style={styles.container}>
        <View style={{backgroundColor: 'transparent', height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 29}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={{width: 25, height: 20}}
                    source={require('../assets/back_arrow.png')}
                />
            </TouchableOpacity>
            <Text style={styles.navBarText}>Booked creators</Text>
        </View>

        <ScrollView 
            style={{flex: 1}} 
            refreshControl={
                <RefreshControl
                    colors={['white']}
                    tintColor="white"
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={{flex: 1, alignItems: "center"}}>
                {showCreatorList()}
            </View>
        </ScrollView>
    </View>
    </>
    )
}

export default BookedCreator

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    navBarText: {
        fontFamily: 'textBold',
        fontSize: 20,
        color: 'white',
        marginLeft: 18
    },
})