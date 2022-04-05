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
                    tabBar={props =>
                        <DiscoverTabsHeader
                            currentTab={props.navigation.getState().routeNames[props.navigation.getState().index]}
                            onTabPress={props.navigation.navigate}
                        />
                    }
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
                    {/*{currentTab === CONST.DISCOVER_TABS.CREATORS &&*/}
                    {/*    <DiscoverCreators*/}
                    {/*        containerStyles={currentTab === CONST.DISCOVER_TABS.CREATORS ? {} : {display: 'none'}}*/}
                    {/*    />*/}
                    {/*}*/}
                    {/*{currentTab === CONST.DISCOVER_TABS.SHORTS &&*/}
                    {/*    <DiscoverShorts*/}
                    {/*        containerStyles={currentTab === CONST.DISCOVER_TABS.SHORTS ? {} : {display: 'none'}}*/}
                    {/*    />*/}
                    {/*}*/}
                </Tab.Navigator>
        </SafeAreaView>
    )
};
