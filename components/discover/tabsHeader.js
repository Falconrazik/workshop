import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import CONST from '../../CONST';
import fonts from '../../assets/fonts/fonts';
import {useFonts} from 'expo-font';
import _ from 'lodash';

export default function TabsHeader({containerStyles, onTabPress, currentTab, onActionButtonPress}) {
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={_.merge({}, styles.tabsHeader, containerStyles)}>
            <View style={styles.pseudoFlexElement}>
                <Image
                    source={require("../../assets/icons/search.png")}
                    style={{
                        width: 15.72,
                        height: 17,
                    }}
                />
            </View>
            <Tab title={CONST.DISCOVER_TABS.CREATORS} onPress={onTabPress} isActive={currentTab === CONST.DISCOVER_TABS.CREATORS} />
            <Tab title={CONST.DISCOVER_TABS.SHORTS} onPress={onTabPress} isActive={currentTab === CONST.DISCOVER_TABS.SHORTS} />
            <TouchableOpacity
                style={styles.actionButtonContainer}
                onPress={onActionButtonPress}
            >
                <Image
                    source={require("../../assets/icons/search.png")}
                    style={{
                       width: 15.72,
                       height: 17,
                   }}
                />
            </TouchableOpacity>
        </View>
    );
}

function Tab({title, onPress, isActive}) {
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
    tabsHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 28.28,
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
    },
    actionButtonContainer: {
        marginLeft: 'auto',
        flexGrow: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    pseudoFlexElement: {
        marginLeft: 'auto',
        flexGrow: 0,
        backgroundColor: 'red',
        opacity: 0,
    }
});
