import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CONST from '../../CONST';
import fonts from '../../assets/fonts/fonts';
import {useFonts} from 'expo-font';

export default function DiscoverTabsHeader({onTabPress, currentTab}) {
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.discoverTabsHeader}>
            <DiscoverTab title={CONST.DISCOVER_TABS.CREATORS} onPress={onTabPress} isActive={currentTab === CONST.DISCOVER_TABS.CREATORS} />
            <DiscoverTab title={CONST.DISCOVER_TABS.SHORTS} onPress={onTabPress} isActive={currentTab === CONST.DISCOVER_TABS.SHORTS} />
        </View>
    );
}

function DiscoverTab({title, onPress, isActive}) {
    return (
        <TouchableOpacity
            style={styles.tab}
            onPress={() => onPress(title)}
        >
            <Text style={[styles.tabText, isActive ? styles.activeTabText : {}]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    discoverTabsHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: CONST.DISCOVER_TAB_HEADER_HEIGHT,
        backgroundColor: 'black',
    },
    tab: {
        paddingVertical: 14,
        paddingHorizontal: 23,
    },
    tabText: {
        fontSize: 18,
        fontFamily: 'textBold',
        fontWeight: '700',
        opacity: 0.4,
        color: 'white',
    },
    activeTabText: {
        opacity: 1,
    }
});
