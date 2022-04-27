import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import Constants from 'expo-constants';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import CONST from '../../CONST';
import {useFonts} from 'expo-font';
import fonts from '../../assets/fonts/fonts';

const trendingBanner = require('../../assets/banners/trending_banner.png');
const upcomingBanner = require('../../assets/banners/upcoming.png');
const investingBanner = require('../../assets/banners/investing_banner.png');
const artAndMusicBanner = require('../../assets/banners/music.png');
const filmAndPhotographyBanner = require('../../assets/banners/beauty.png');
const fitnessBanner = require('../../assets/banners/fitness_banner.png');

export default function DiscoverCreators ({containerStyles, navigation}) {
    const scrollViewHeight = Dimensions.get('window').height - Constants.statusBarHeight - CONST.DISCOVER_TAB_HEADER_HEIGHT - useBottomTabBarHeight();

    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={[containerStyles, {flex: 1}]}>
            <ScrollView style={[styles.container, {height: scrollViewHeight}]}>
                <TouchableOpacity 
                    style={[styles.gridPad, styles.gridPadLarge]}
                    onPress={() => navigation.navigate("DiscoverResult", {category: "top-rated", navigation: navigation})}
                >
                    <Image source={trendingBanner} style={styles.trendingBanner} />
                    <Text style={[styles.text, styles.textLarge]}>Top Rated</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.gridPad, styles.gridPadLarge, {marginBottom: 40}]}
                    onPress={() => navigation.navigate("DiscoverResult", {category: "trending", navigation: navigation})}
                >
                    <Image source={upcomingBanner} style={styles.upcomingBanner} />
                    <Text style={[styles.text, styles.textLarge]}>Trending</Text>
                </TouchableOpacity>
                <View style={styles.gridContainer}>
                    <TouchableOpacity 
                        style={[styles.gridPad, styles.gridPadSmall]}
                        onPress={() => navigation.navigate("DiscoverResult", {category: "fitness", navigation: navigation})}
                    >
                        <Image source={fitnessBanner} style={styles.fitnessBanner} />
                        <Text style={[styles.text, styles.textSmall]}>fitness</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.gridPad, styles.gridPadSmall]}
                        onPress={() => navigation.navigate("DiscoverResult", {category: "beauty", navigation: navigation})}
                    >
                        <Image source={filmAndPhotographyBanner} style={styles.filmAndPhotographyBanner} />
                        <Text style={[styles.text, styles.textSmall]}>beauty & fashion</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.gridContainer}>
                    <TouchableOpacity 
                        style={[styles.gridPad, styles.gridPadSmall]}
                        onPress={() => navigation.navigate("DiscoverResult", {category: "invest", navigation: navigation})}
                    >
                        <Image source={investingBanner} style={styles.investingBanner} />
                        <Text style={[styles.text, styles.textSmall]}>investing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.gridPad, styles.gridPadSmall]}
                        onPress={() => navigation.navigate("DiscoverResult", {category: "music", navigation: navigation})}
                    >
                        <Image source={artAndMusicBanner} style={styles.artAndMusicBanner} />
                        <Text style={[styles.text, styles.textSmall]}>music</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: 'black',
    },
    gridContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingHorizontal: 6,
    },
    gridPad: {
        backgroundColor: '#1A1D24',
    },
    gridPadSmall: {
        height: 147,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        borderRadius: 20,
        paddingBottom: 12,
        marginHorizontal: 6,
        overflow: 'visible',
    },
    gridPadLarge: {
        height: 149,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 22,
        borderRadius: 20,
        paddingLeft: 25,
        paddingBottom: 25,
        marginHorizontal: 12,
    },
    trendingBanner: {
        width: 351,
        height: 149,
        position: 'absolute',
        right: 0
    },
    upcomingBanner: {
        width: 400,
        height: 149,
        position: 'absolute',
        right: 0
    },
    filmAndPhotographyBanner: {
        width: 210,
        height: 210,
        marginBottom: -20,
        marginLeft: -20
    },
    investingBanner: {
        width: 110,
        height: 126.21,
    },
    fitnessBanner: {
        width: 134.42,
        height: 140.33,
    },
    artAndMusicBanner: {
        width: 210,
        height: 210,
        marginBottom: -30,
        marginLeft: -20
    },
    text: {
        fontFamily: 'textBold',
        color: '#FFFFFF',
    },
    textSmall: {
        fontSize: 16,
    },
    textLarge: {
        fontSize: 22,
    },
});
