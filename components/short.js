import {Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text} from 'react-native';
import Constants from 'expo-constants';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Video} from 'expo-av';
import {COLORS} from '../CONST';
import CategoryCapsule from './categoryCapsule';

const CATEGORY_COLORS = [
    COLORS.BLUE_LIGHT,
    COLORS.BLUE_LIGHT,
    COLORS.GREEN_50,
];

export default function Short({
    video,
    shouldPlay,
    creatorAvatarFile,
    creatorUsername,
    creatorBio,
    categories,
}) {
    const videoHeight = Dimensions.get('window').height - Constants.statusBarHeight - useBottomTabBarHeight();
    const [isLoading, setIsLoading] = React.useState(true);
    // const [videoPosition, setVideoPosition] = React.useState(0)

    return (
        <TouchableWithoutFeedback style={styles.short}>
            <>
                <ShortOverlay
                    creatorAvatarFile={creatorAvatarFile}
                    creatorUsername={creatorUsername}
                    creatorBio={creatorBio}
                    categories={categories}
                />
                <Video
                    style={[styles.video, {height: videoHeight}]}
                    source={video}
                    resizeMode={Video.RESIZE_MODE_COVER}
                    shouldPlay={shouldPlay}
                    isLooping
                    positionMillis={0}
                    onLoad={() => setIsLoading(false)}
                    // onPlaybackStatusUpdate={({positionMillis}) =>
                    //     setVideoPosition(positionMillis)
                    // }
                    progressUpdateIntervalMillis={20}
                />
            </>
        </TouchableWithoutFeedback>
    )
}

function ShortOverlay({creatorAvatarFile, creatorUsername, creatorBio, categories}) {
    const videoHeight = Dimensions.get('window').height - Constants.statusBarHeight - useBottomTabBarHeight();
    return (
        <View style={[styles.shortOverlay, {height: videoHeight}]}>
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
});
