import {Dimensions, StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React from 'react';
import * as Font from 'expo-font';
import {Video} from 'expo-av';
import {COLORS} from '../CONST';
import CategoryCapsule from './categoryCapsule';
import fonts from '../assets/fonts/fonts';
import {auth, db, storage} from '../firebase';
import Avatar from './avatar';

const CATEGORY_COLORS = [
    COLORS.BLUE_LIGHT,
    COLORS.BLUE_LIGHT,
    COLORS.GREEN_50,
];

export default class Short extends React.PureComponent {
    constructor(props) {
        super();

        this.state = {
            fontsLoaded: false,
            profile: null,
            videoLoaded: false,
        }

        this.creatorUID = props.creatorUID ?? props.route.params.creatorUID;
    }

    async _loadFontsAsync() {
        await Font.loadAsync(fonts);
        this.setState({ fontsLoaded: true });
    }

    async _loadProfile() {
        class User {
            constructor (uid, userType, userName, bio, categories, rate) {
                this.uid = uid;
                this.userType = userType;
                this.userName = userName;
                this.bio = bio;
                this.categories = categories;
                this.rate = rate;
            }
            toString() {
                return this.uid + ', ' + this.userType;
            }
        }
        const userConverter = {
            toFirestore: function(user) {

                return {
                    uid: user.uid,
                    userType: user.userType,
                    userName: user.userName,
                    bio: user.bio,
                    categories: user.categories,
                    rate: user.rate,
                };
            },
            fromFirestore: function(snapshot, options){
                const data = snapshot.data(options);
                return new User(data.uid, data.userType, data.userName, data.bio, data.categories, data.rate);
            }
        };

        db.collection("users").doc(this.creatorUID)
            .withConverter(userConverter)
            .get().then((doc) => {
            if (doc.exists){
                // Convert to User object
                const userDetails = doc.data();
                const fileName = this.creatorUID + '.jpg';
                const fileRef = storage.ref().child(`avatar/${fileName}`);
                fileRef.getDownloadURL()
                    .then((url) => {
                        // `url` is the download URL for 'avatar/uid.jpg'
                        this.setState({profile: {...userDetails, avatarURL: url}});
                    })
                    .catch((error) => {
                        // Handle any errors
                    });
            } else {
                console.log("No such document!");
            }}).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    componentDidMount() {
        this._loadFontsAsync();
        this._loadProfile();

    }

    render() {
        if (!this.state.fontsLoaded || !this.state.profile) {
            return null;
        }
        return (
            <BottomTabBarHeightContext.Consumer>
                {tabBarHeight => (
                    <View style={[styles.short, {height: Dimensions.get('window').height - Constants.statusBarHeight - tabBarHeight}]}>
                        <>
                            <ShortOverlay
                                creatorAvatarFile={this.state.profile.avatarURL}
                                creatorUsername={this.state.profile.userName}
                                creatorBio={this.state.profile.bio}
                                categories={this.state.profile.categories}
                                creatorUID={this.creatorUID}
                                navigation={this.props.navigation}
                                video={this.props.video ?? this.props.route.params.video}
                                rate={this.state.profile.rate}
                            />
                            <Video
                                style={[styles.video, {
                                    height: Dimensions.get('window').height - Constants.statusBarHeight - tabBarHeight,
                                }]}
                                source={this.props.video ?? this.props.route.params.video}
                                resizeMode={Video.RESIZE_MODE_COVER}
                                shouldPlay={this.props.shouldPlay ?? this.props.route.params.shouldPlay}
                                isLooping
                                onLoad={() => this.setState({videoLoaded: true})}
                                positionMillis={0}
                                // onPlaybackStatusUpdate={({positionMillis}) =>
                                //     setVideoPosition(positionMillis)
                                // }
                                progressUpdateIntervalMillis={20}
                            />
                        </>
                    </View>
                )}
            </BottomTabBarHeightContext.Consumer>
        )
    }


}

function ShortOverlay({navigation, creatorUID, creatorAvatarFile, creatorUsername, creatorBio, categories, video, rate}) {
    const videoHeight = Dimensions.get('window').height - Constants.statusBarHeight - useBottomTabBarHeight();
    return (
        <View style={[styles.shortOverlay, {height: videoHeight}]}>
            <PressableAvatar disabled={creatorUID === auth.currentUser?.uid} categories={categories} rate={rate} video={video} creatorAvatarFile={creatorAvatarFile} navigation={navigation} username={creatorUsername} creatorUID={creatorUID} />
            <TouchableOpacity onPress={() => navigation.navigate("CreatorProfile", {uid: creatorUID, navigation})}>
                <Text style={styles.creatorUsernameText}>@{creatorUsername}</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.creatorBioText}>{creatorBio}</Text>
            </View>
            <View style={styles.tagsContainer}>
                {categories.map((category, index) => (
                    <CategoryCapsule
                        key={index}
                        category={category}
                        color={CATEGORY_COLORS[(index % CATEGORY_COLORS.length)]}
                    />
                ))}
            </View>
        </View>
    );
}

function PressableAvatar({creatorAvatarFile, navigation, creatorUID, username, video, rate, categories, disabled}) {
    return (
        <TouchableOpacity disabled={disabled} onPress={() => navigation.navigate("BookingForm", {creatorUID, username, video, rate, category: categories[0]})} style={styles.pressableAvatar}>
            {!disabled && <Image style={styles.bookingIcon} source={require('../assets/booking_icon.png')} />}
            <Avatar
                width={54}
                height={54}
                borderWidth={3.02}
                borderRadius={18}
                src={creatorAvatarFile}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    shortOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingHorizontal: 32,
        paddingBottom: 20,
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    creatorBioText: {
        fontFamily: 'text',
        fontSize: 12,
        color: 'white',
        marginBottom: 15,
    },
    creatorUsernameText: {
        fontFamily: 'textBold',
        fontSize: 16,
        lineHeight: 19.5,
        color: 'white',
        marginBottom: 2,
    },
    pressableAvatar: {
        marginBottom: 12,
        width: 54,
        height: 54,
        overflow: 'visible',
    },
    bookingIcon: {
        position: 'absolute',
        width: 31,
        height: 31,
        bottom: -10,
        right: -10,
        zIndex: 1000,
    }
});
