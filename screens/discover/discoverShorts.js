import {View, StyleSheet, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import CONST from '../../CONST';
import { Video, AVPlaybackStatus } from 'expo-av';
import Constants from 'expo-constants';

const videos = [
    require('../../assets/videos/cashew_1.mp4'),
    require('../../assets/videos/cashew_2.mp4'),
];

export default function DiscoverShorts (props) {
    const containerHeight = Dimensions.get('window').height - Constants.statusBarHeight - useBottomTabBarHeight();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={[styles.scrollContainer, {height: containerHeight}]}
                snapToInterval={containerHeight}
                decelerationRate="fast"
                snapToStart
                disableIntervalMomentum
            >
                {videos.map(video => <Short video={video} />)}
            </ScrollView>
        </SafeAreaView>
    )
};

function Short({video}) {
    const videoHeight = Dimensions.get('window').height - Constants.statusBarHeight - useBottomTabBarHeight();
    return (
        <View style={styles.short}>
            <Video
                style={[styles.video, {height: videoHeight}]}
                source={video}
                resizeMode={Video.RESIZE_MODE_COVER}
                shouldPlay
                isLooping
            />
        </View>
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
