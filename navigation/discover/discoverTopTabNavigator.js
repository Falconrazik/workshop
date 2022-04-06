import { SafeAreaView } from 'react-native';
import React from 'react';
import CONST from '../../CONST';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DiscoverCreatorsStackNavigator from './discoverCreatorsStackNavigator';
import DiscoverShortsStackNavigator from './discoverShortsStackNavigator';
import DiscoverTabsHeader from '../../components/discover/discoverTabsHeader';

export default function DiscoverTopTabNavigator(props) {
    const Tab = createMaterialTopTabNavigator();
    return (
        <SafeAreaView style={{ flex: 1 }}>
                <Tab.Navigator
                    tabBar={props => {
                        const currentTab = props.navigation.getState().routeNames[props.navigation.getState().index];
                        return (
                            <DiscoverTabsHeader
                                currentTab={currentTab}
                                onTabPress={props.navigation.navigate}
                            />
                        );
                    }}
                    initialRouteName={CONST.DISCOVER_TABS.SHORTS}
                    screenOptions={{
                        headerShown: false,
                        swipeEnabled: false,
                    }}
                >
                    <Tab.Screen
                        name={CONST.DISCOVER_TABS.CREATORS}
                        component={DiscoverCreatorsStackNavigator}
                    />
                    <Tab.Screen
                        name={CONST.DISCOVER_TABS.SHORTS}
                        component={DiscoverShortsStackNavigator}
                    />
                </Tab.Navigator>
        </SafeAreaView>
    )
};
