import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CONST from '../../../CONST';

export default function DiscoverTabsHeader({onTabPress, currentTab}) {
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
        marginBottom: 20,
    },
    tab: {
        paddingVertical: 14,
        paddingHorizontal: 23,
    },
    tabText: {
        fontSize: 18,
        fontWeight: 'bold',
        opacity: 0.4,
    },
    activeTabText: {
        opacity: 1,
    }

});
