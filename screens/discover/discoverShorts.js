import {FlatList, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React from 'react';
import Constants from 'expo-constants';
import {useIsFocused} from '@react-navigation/native';
import Short from '../../components/short';

const videos = [
    {
        file: require('../../assets/videos/cashew_0.mp4'),
        categories: ['cat', 'cute', 'dumbass'],
        creatorUsername: '@cashew_the_dumbass',
        creatorBio: 'i cat',
        creatorAvatarFile: null,
    },
    {
        file: require('../../assets/videos/cashew_1.mp4'),
        categories: ['cat', 'cute', 'dumbass'],
        creatorUsername: '@cashew_the_dumbass',
        creatorBio: 'i cat',
        creatorAvatarFile: null,
    },
    {
        file: require('../../assets/videos/cashew_2.mp4'),
        categories: ['cat', 'cute', 'dumbass'],
        creatorUsername: '@cashew_the_dumbass',
        creatorBio: 'i cat',
        creatorAvatarFile: null,
    },
    {
        file: require('../../assets/videos/cashew_3.mp4'),
        categories: ['cat', 'cute', 'dumbass'],
        creatorUsername: '@cashew_the_dumbass',
        creatorBio: 'i cat',
        creatorAvatarFile: null,
    },
    {
        file: require('../../assets/videos/cashew_4.mp4'),
        categories: ['cat', 'cute', 'dumbass'],
        creatorUsername: '@cashew_the_dumbass',
        creatorBio: 'i cat',
        creatorAvatarFile: null,
    },
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
                        video={item.file}
                        categories={item.categories}
                        creatorUsername={item.creatorUsername}
                        creatorBio={item.creatorBio}
                        creatorAvatarFile={item.creatorAvatarFile}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'black',
    },
    scrollContainer: {
        backgroundColor: 'black',
        borderRadius: 25,
    },
});
