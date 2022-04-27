import React from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {useFonts} from 'expo-font';
import _ from 'lodash';
import fonts from '../../assets/fonts/fonts';
import Avatar from '../../components/avatar';
import chats from '../../chats';
import {db, storage} from '../../firebase';

function convertToDateString(timestamp) {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.getMonth() !== today.getMonth() ||
        date.getFullYear() !== today.getFullYear() ||
        date.getDate() !== today.getDate()
    ) {
        return date.toISOString().split('T')[0];
    }

    const isoTimeStr = date.toISOString().split('T')[1];
    return isoTimeStr.slice(0, isoTimeStr.lastIndexOf(':'))
}

export default function ChatList({navigation}) {
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                {chats.map(({creatorUID, messages}) => (
                    <ChatRow
                        key={creatorUID}
                        creatorUID={creatorUID}
                        lastMessage={_.first(messages)}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

function ChatRow({navigation, lastMessage, creatorUID}) {
    const [userDetail, setUserDetail] = React.useState(null);
    const [imageURL, setImage] = React.useState('');

    React.useEffect(() => {
        const docRef = db.collection("users").doc(creatorUID);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setUserDetail(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, []);

    React.useEffect(() => {
        const fileName = creatorUID + '.jpg';
        const fileRef = storage.ref().child(`avatar/${fileName}`);
        fileRef.getDownloadURL()
            .then((url) => {
                // `url` is the download URL for 'avatar/uid.jpg'
                setImage(url);
            })
            .catch((error) => {
                // Handle any errors
            });
    }, []);

    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded || !userDetail || !imageURL) {
        return null;
    }

    return (
        <TouchableOpacity style={styles.chatRow} onPress={() => navigation.navigate('Chat', {creatorUID, creatorName: userDetail.userName})}>
            <View style={{marginRight: 13}}>
                <Avatar
                    width={46}
                    height={46}
                    borderWidth={2.58}
                    borderRadius={4}
                    src={imageURL}

                />
            </View>
            <View style={{flex: 1}}>
                <View style={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={[styles.text, styles.chatTitle]}>@{userDetail.userName} & friends</Text>
                    <Text style={[styles.text, styles.timeLastMessageReceived]}>{convertToDateString(lastMessage.createdAt)}</Text>
                </View>
                <Text style={[styles.text, styles.chatLastMessage]}>{lastMessage.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chatRow: {
        height: 77,
        backgroundColor: 'rgb(20, 20, 20)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingLeft: 23.58,
        paddingRight: 19,
        marginBottom: 3,
    },
    text: {
        fontFamily: 'text',
    },
    chatTitle: {
        fontFamily: 'textBold',
        fontSize: 14,
        lineHeight: 17,
        color: 'white',
    },
    chatLastMessage: {
        fontSize: 12,
        lineHeight: 14.63,
        color: 'white',
    },
    timeLastMessageReceived: {
        fontSize: 12,
        color: 'white',
        opacity: 0.4,
    }
});
