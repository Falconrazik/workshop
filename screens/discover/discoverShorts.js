import {FlatList, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React from 'react';
import Constants from 'expo-constants';
import {useIsFocused} from '@react-navigation/native';
import Short from '../../components/short';

export const videos = [
    {
        file: require('../../assets/videos/krysteldallas_yoga/krysteldallas_yoga_1.mp4'),
        creatorUID: 'zL2atRlPjST2fUSpMwWt',
        // thumbnail: require('../../assets/videos/zachwein_/krysteldallas_yoga_1.png'),
    },
    {
        file: require('../../assets/videos/_joeandrews/_joeandrews_1.mp4'),
        creatorUID: 'LnGnI2tlmJTFbCiNxP9f',
        thumbnail: require('../../assets/videos/_joeandrews/_joeandrews_1.png'),
    },
    {
        file: require('../../assets/videos/yogawithcali/yogawithcali_3.mp4'),
        creatorUID: 'vw8tG7fojQlo4f4Q3HcI',
        // thumbnail: require('../../assets/videos/yogawithcali/yogawithcali_1.png'),
    },
    {
        file: require('../../assets/videos/krysteldallas_yoga/krysteldallas_yoga_2.mp4'),
        creatorUID: 'zL2atRlPjST2fUSpMwWt',
        // thumbnail: require('../../assets/videos/zachwein_/krysteldallas_yoga_1.png'),
    },
    {
        file: require('../../assets/videos/yogawithcali/yogawithcali_2.mp4'),
        creatorUID: 'vw8tG7fojQlo4f4Q3HcI',
        // thumbnail: require('../../assets/videos/yogawithcali/yogawithcali_1.png'),
    },
    {
        file: require('../../assets/videos/krysteldallas_yoga/krysteldallas_yoga_4.mp4'),
        creatorUID: 'zL2atRlPjST2fUSpMwWt',
        // thumbnail: require('../../assets/videos/zachwein_/krysteldallas_yoga_1.png'),
    },
    // {
    //     file: require('../../assets/videos/zachwein_/zachwein__3.mp4'),
    //     creatorUID: '4hBaQ6aUzxpHxhAU8jed',
    //     thumbnail: require('../../assets/videos/zachwein_/zachwein__3.png'),
    // },
    // {
    //     file: require('../../assets/videos/nylenayga/nylanayga_2.mp4'),
    //     creatorUID: 'kRd4ZqIqlQNxhImyqiM6',
    //     thumbnail: require('../../assets/videos/nylenayga/nylanayga_2.png'),
    // },
    // {
    //     file: require('../../assets/videos/_joeandrews/_joeandrews_2.mp4'),
    //     creatorUID: 'LnGnI2tlmJTFbCiNxP9f',
    //     thumbnail: require('../../assets/videos/_joeandrews/_joeandrews_2.png'),
    //
    // },
    // {
    //     file: require('../../assets/videos/zachwein_/zachwein__4.mp4'),
    //     creatorUID: '4hBaQ6aUzxpHxhAU8jed',
    //     thumbnail: require('../../assets/videos/zachwein_/zachwein__4.png'),
    // },
    // {
    //     file: require('../../assets/videos/nylenayga/nylanayga_1.mp4'),
    //     creatorUID: 'kRd4ZqIqlQNxhImyqiM6',
    //     thumbnail: require('../../assets/videos/nylenayga/nylanayga_1.png'),
    // },
    // {
    //     file: require('../../assets/videos/zachwein_/zachwein__2.mp4'),
    //     creatorUID: '4hBaQ6aUzxpHxhAU8jed',
    //     thumbnail: require('../../assets/videos/zachwein_/zachwein__2.png'),
    //
    // },
    // {
    //     file: require('../../assets/videos/_joeandrews/_joeandrews_3.mp4'),
    //     creatorUID: 'LnGnI2tlmJTFbCiNxP9f',
    //     thumbnail: require('../../assets/videos/_joeandrews/_joeandrews_3.png'),
    // },
    // {
    //     file: require('../../assets/videos/zachwein_/zachwein__1.mp4'),
    //     creatorUID: '4hBaQ6aUzxpHxhAU8jed',
    //     thumbnail: require('../../assets/videos/zachwein_/zachwein__1.png'),
    // },
];

export default function DiscoverShorts ({navigation}) {
    const containerHeight = Dimensions.get('window').height - Constants.statusBarHeight - useBottomTabBarHeight();
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const isFocused = useIsFocused();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={videos}
                maxToRenderPerBatch={10}
                keyExtractor={(item, index) => `${item.creatorUID}${index}`}
                renderItem={({item, index}) => (
                    <Short
                        navigation={navigation}
                        key={index}
                        video={item.file}
                        creatorUID={item.creatorUID}
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
