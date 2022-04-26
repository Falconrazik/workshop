import React from 'react';
import _ from 'lodash';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import chats from '../../chats';
import {GiftedChat} from 'react-native-gifted-chat';
import Avatar from '../../components/avatar';
import NavBar from '../../components/navbar';

export default function Chat({navigation, route}) {
    const {creatorUID} = route.params;
    const {messages} = _.find(chats, chat => chat.creatorUID === creatorUID);

    return (
        <SafeAreaView style={{flex: 1}}>
            <NavBar backButtonOnly navigation={navigation} />
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage
                renderAvatar={() => (
                    <Avatar
                    />
                )}
            />
        </SafeAreaView>
    )
}
