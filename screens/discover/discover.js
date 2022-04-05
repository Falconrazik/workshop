import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

const DISCOVER_TABS = {
    CREATORS: 'creators',
    SHORTS: 'shorts',
}

export default function Discover(props) {

    const [currentTab, setCurrentTab] = React.useState(DISCOVER_TABS.SHORTS);

    return (
        <SafeAreaView>
            <DiscoverTabsHeader currentTab={currentTab} />
        </SafeAreaView>
    )
};

function DiscoverTabsHeader({currentTab}) {
    return (
        <View style={styles.discoverTabsHeader}>
            <View style={[styles.discoverTab, currentTab === DISCOVER_TABS.CREATORS && styles.activeTab]}>{DISCOVER_TABS.CREATORS}</View>
            <View style={[styles.discoverTab, currentTab === DISCOVER_TABS.SHORTS && styles.activeTab]}>{DISCOVER_TABS.SHORTS}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    discoverTabsHeader: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 10px'
    },
    discoverTab: {

    },
    activeTab: {

    }

});
