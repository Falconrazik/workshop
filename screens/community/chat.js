import React from 'react';
import _ from 'lodash';
import {SafeAreaView, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView} from 'react-native';
import chats from '../../chats';
import {GiftedChat} from 'react-native-gifted-chat';
import Avatar from '../../components/avatar';
import NavBar from '../../components/navbar';
import {useFonts} from 'expo-font';
import fonts from '../../assets/fonts/fonts';
import {storage} from '../../firebase';

export default function Chat({navigation, route}) {
    const {creatorUID, creatorName} = route.params;
    const [messages, setMessages] = React.useState(
        _.find(chats, chat => chat.creatorUID === creatorUID).messages
    );

    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    const onSendMessage = (text) => {

    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <NavBar backButtonOnly navigation={navigation} title={`@${creatorName} & friends`} />
            <View style={{backgroundColor: 'rgb(31,31,31)', flex: 1}}>
                <GiftedChat
                    messages={messages}
                    showAvatarForEveryMessage
                    renderAvatar={props => (
                        <ChatAvatar {...props} />
                    )}
                    renderComposer={(props) => (
                        <ChatComposer {...props} />
                    )}
                    renderBubble={(props) => (
                        <ChatBubble {...props} />
                    )}
                    timeTextStyle={{fontFamily: 'text'}}
                    rednerAvatarOnTop
                />
            </View>
        </SafeAreaView>
    )
}

function ChatBubble({currentMessage}) {
    const {text, user} = currentMessage;

    return (
        <View
            style={[
                styles.chatBubble,
                {
                    backgroundColor: user._id !== undefined ? 'black' : 'rgb(210,210,210)',
                }
            ]}
        >
            <Text
                style={[
                    styles.senderName,
                    {
                        color: user._id !== undefined ? 'white' : '#5A83FF'
                    }
                ]}
            >
                {user.name}
            </Text>
            <Text
                style={[
                    styles.text,
                    {
                        color: user._id !== undefined ? 'white' : 'black'
                    }
                ]}
            >
                {text}
            </Text>
        </View>
    )
}

function ChatAvatar({currentMessage}) {
    const {user} = currentMessage;

    const [imageURL, setImageURL] = React.useState(null);

    React.useEffect(() => {
        const fileName = user._id + '.jpg';
        var fileRef = storage.ref().child(`avatar/${fileName}`);
        fileRef.getDownloadURL()
            .then((url) => {
                setImageURL(url);
            })
            .catch((error) => {
                // Handle any errors
            });
    }, [])

    return (
        <Avatar
            width={36}
            height={36}
            src={imageURL}
        />
    )
}

function ChatComposer(props) {
    return (
        <View
            style={{
                width: Dimensions.get('window').width,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: 59,
                backgroundColor: 'black',
                paddingRight: 22,
                paddingLeft: 15,

            }}
        >
            <TextInput
                style={{
                    flex: 1,
                    height: 33,
                    backgroundColor: 'rgb(102, 102, 102)',
                    borderRadius: 16,
                    color: 'white',
                    paddingHorizontal: 18,
                    paddingVertical: 8,
                    fontFamily: 'text'
                }}
                blurOnSubmit
                returnKeyType="send"
                placeholder="message"
            />
            <TouchableOpacity>
                <Image
                    source={require('../../assets/icons/camera_icon.png')}
                    style={{width: 24, height: 18, marginRight: 15, marginLeft: 12}}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/icons/mic_icon.png')}
                    style={{width: 12, height: 20}}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    chatBubble: {
        borderRadius: 8,
        shadowColor: 'white',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingTop: 5,
        paddingBottom: 7,
        paddingHorizontal: 14,
        maxWidth: 212,
    },
    text: {
        fontFamily: 'text',
        fontSize: 12,
        lineHeight: 14.63,
    },
    senderName: {
        color: 'white',
        fontFamily: 'textBold',
        fontSize: 12,
        lineHeight: 14.63,
        marginBottom: 3,
    }
});
