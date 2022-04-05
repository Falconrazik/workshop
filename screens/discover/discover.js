import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import React from 'react';
import DiscoverTabsHeader from '../components/discover/discoverTabsHeader';
import CONST from '../../CONST';
import DiscoverCreators from './discoverCreators';
import DiscoverShorts from './discoverShorts';

export default function Discover(props) {

    const [currentTab, setCurrentTab] = React.useState(CONST.DISCOVER_TABS.SHORTS);

    return (
        <SafeAreaView>
            <DiscoverTabsHeader currentTab={currentTab} onTabPress={setCurrentTab} />
            {currentTab === CONST.DISCOVER_TABS.CREATORS && <DiscoverCreators />}
            {currentTab === CONST.DISCOVER_TABS.SHORTS && <DiscoverShorts />}
        </SafeAreaView>
    )
};
