import { SafeAreaView } from 'react-native';
import React from 'react';
import CONST from '../../CONST';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DiscoverCreatorsStackNavigator from './discoverCreatorsStackNavigator';
import DiscoverShortsStackNavigator from './discoverShortsStackNavigator';
import TabsHeader from '../../components/tabsHeader';

export default function DiscoverTopTabNavigator({navigation}) {
    const Tab = createMaterialTopTabNavigator();
    const [currentTab, setCurrentTab] = React.useState(CONST.DISCOVER_TABS.SHORTS);

    return (
        <SafeAreaView style={{ flex: 1 }}>
                <Tab.Navigator
                    tabBar={props => (
                        <TabsHeader
                            onTabPress={tabTitle => {
                                props.navigation.navigate(tabTitle);
                                setCurrentTab(tabTitle);
                            }}
                            containerStyles={{
                                position: currentTab === CONST.DISCOVER_TABS.SHORTS ? 'absolute' : 'relative',
                                top: 0,
                                left: 0,
                                zIndex: 1000,
                                backgroundColor: currentTab === CONST.DISCOVER_TABS.SHORTS ? 'transparent' : 'black',
                            }}
                            tabLeftTitle={CONST.DISCOVER_TABS.CREATORS}
                            tabRightTitle={CONST.DISCOVER_TABS.SHORTS}
                            defaultTab={CONST.DISCOVER_TABS.SHORTS}
                            onActionButtonPress={currentTab => navigation.navigate("SearchModal", {type: currentTab})}
                        />
                    )}
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
