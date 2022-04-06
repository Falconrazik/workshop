import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    ScrollView,
    useWindowDimensions,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import Constants from 'expo-constants';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import CONST from '../../CONST';
import {useFonts} from 'expo-font';
import fonts from '../../assets/fonts/fonts';

export default function DiscoverCreators ({containerStyles, setOpenModal, navigation}) {
    const tabBarHeight = useBottomTabBarHeight();
    const scrollViewHeight = Dimensions.get('window').height - Constants.statusBarHeight - CONST.DISCOVER_TAB_HEADER_HEIGHT - tabBarHeight;

    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={[containerStyles]}>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});
