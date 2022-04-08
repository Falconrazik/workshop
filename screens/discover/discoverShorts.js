import {FlatList, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React from 'react';
import { Video } from 'expo-av';
import Constants from 'expo-constants';
import {useIsFocused} from '@react-navigation/native';

const videos = [
    require('../../assets/videos/cashew_1.mp4'),
    require('../../assets/videos/cashew_2.mp4'),
];

export default function DiscoverShorts () {
    const containerHeight = Dimensions.get('window').height - Constants.statusBarHeight - useBottomTabBarHeight();
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const isFocused = useIsFocused();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={videos}
                maxToRenderPerBatch={3}
                renderItem={({item, index}) => (
                    <Short
                        key={index}
                        video={item}
                        shouldPlay={isFocused && scrollPosition >= (index * containerHeight) && scrollPosition < ((index + 1) * containerHeight)}
                    />
                )}
                style={[styles.scrollContainer, {height: containerHeight}]}
                snapToInterval={containerHeight}
                decelerationRate="fast"
                snapToStart
                disableIntervalMomentum
                bounces={false}
                showsVerticalScrollIndicator={false}
                onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.y)}
                scrollEventThrottle={16}
            />
        </SafeAreaView>
    )
};

function Short({video, shouldPlay}) {
    const videoHeight = Dimensions.get('window').height - Constants.statusBarHeight - useBottomTabBarHeight();
    const [isPaused, setIsPaused] = React.useState(false);
    // const [videoPosition, setVideoPosition] = React.useState(0)

    return (
        <TouchableWithoutFeedback style={styles.short} onPress={() => setIsPaused(!isPaused)}>
            <Video
                style={[styles.video, {height: videoHeight}]}
                source={video}
                resizeMode={Video.RESIZE_MODE_COVER}
                shouldPlay={shouldPlay && !isPaused}
                isLooping
                positionMillis={0}
                // onPlaybackStatusUpdate={({positionMillis}) =>
                //     setVideoPosition(positionMillis)
                // }
                progressUpdateIntervalMillis={20}
            />
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'black',
    },
    scrollContainer: {
        backgroundColor: 'black',
        borderRadius: 25,
    },
    short: {

    }

});
