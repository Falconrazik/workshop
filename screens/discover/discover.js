import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import React from 'react';
import DiscoverTabsHeader from '../components/discover/discoverTabsHeader';
import CONST from '../../CONST';
import DiscoverCreators from './discoverCreators';
import DiscoverShorts from './discoverShorts';

export default function Discover(props) {

    const [currentTab, setCurrentTab] = React.useState(CONST.DISCOVER_TABS.SHORTS);

    // Using display: 'none' instead of conditional rendering so that the pages don't un-render,
    // since we want the user's place to be saved when they navigate between the two pages.
    return (
        <SafeAreaView>
            <DiscoverTabsHeader currentTab={currentTab} onTabPress={setCurrentTab} />
            {currentTab === CONST.DISCOVER_TABS.CREATORS &&
                <DiscoverCreators
                    containerStyles={currentTab === CONST.DISCOVER_TABS.CREATORS ? {display: 'none'} : {}}
                />
            }
            {currentTab === CONST.DISCOVER_TABS.SHORTS &&
                <DiscoverShorts
                    containerStyles={currentTab === CONST.DISCOVER_TABS.SHORTS ? {display: 'none'} : {}}
                />
            }
        </SafeAreaView>
    )
};
