import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
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
        <SafeAreaView style={containerStyles}>
            <ScrollView style={[styles.container, {height: scrollViewHeight}]}>
                <TouchableOpacity style={[styles.gridPad, styles.gridPadLarge]}>
                    <Text style={[styles.text, styles.textLarge]}>Trending</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.gridPad, styles.gridPadLarge]}>
                    <Text style={[styles.text, styles.textLarge]}>New Today</Text>
                </TouchableOpacity>
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={[styles.gridPad, styles.gridPadSmall]}>
                        <Text style={[styles.text, styles.textSmall]}>fitness</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.gridPad, styles.gridPadSmall]}>
                        <Text style={[styles.text, styles.textSmall]}>film & photography</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={[styles.gridPad, styles.gridPadSmall]}>
                        <Text style={[styles.text, styles.textSmall]}>investing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.gridPad, styles.gridPadSmall]}>
                        <Text style={[styles.text, styles.textSmall]}>art & music</Text>
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
        marginBottom: 12,
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
    text: {
        fontFamily: 'textBold',
        color: '#FFFFFF',
    },
    textSmall: {
        fontSize: 16,
    },
    textLarge: {
        fontSize: 26,
    },
});
