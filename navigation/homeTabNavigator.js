import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardTopStackNavigator from './dashboard/dashboardTopStackNavigator';
import AccountStackNavigator from './accountStackNavigator';
import DiscoverTopTabNavigator from './discover/discoverTopTabNavigator';
import React from 'react';
import {Image} from 'react-native';
import CONST from '../CONST';
import CustomStatusBar from '../components/customStatusBar';
import DiscoverShortsStackNavigator from './discover/discoverShortsStackNavigator';
import DashboardStackNavigator from './dashboard/dashboardStackNavigator';

export default function HomeTabNavigator () {
    const Tab = createBottomTabNavigator();

    return (
        <>
            <CustomStatusBar color={CONST.STATUS_BAR_COLOR.BLACK} />
            <Tab.Navigator
                initialRouteName="Discover"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {backgroundColor: 'black', borderTopWidth: 0},
                }}
            >
                <Tab.Screen
                    name="Discover"
                    component={DiscoverShortsStackNavigator}
                    options={{
                        tabBarIcon: ({focused}) =>
                            focused
                                ? <Image
                                    source={require("../assets/icons/discover_focused.png")}
                                    style={{
                                        width: 28.28,
                                        height: 25.13,
                                    }}
                                />
                                : <Image
                                    source={require("../assets/icons/discover_unfocused.png")}
                                    style={{
                                        width: 28.28,
                                        height: 25.13,
                                    }}
                                />
                    }}
                />
                <Tab.Screen
                    name="Dashboard"
                    component={DashboardStackNavigator}
                    options={{
                        tabBarIcon: ({focused}) =>
                            focused
                                ? <Image
                                    source={require("../assets/icons/dashboard_focused.png")}
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                                : <Image
                                    source={require("../assets/icons/dashboard_unfocused.png")}
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={AccountStackNavigator}
                    options={{
                        tabBarIcon: ({focused}) =>
                            focused
                                ? <Image
                                    source={require("../assets/icons/account_focused.png")}
                                    style={{
                                        width: 25.4,
                                        height: 25.91,
                                    }}
                                />
                                : <Image
                                    source={require("../assets/icons/account_unfocused.png")}
                                    style={{
                                        width: 25.4,
                                        height: 25.91,
                                    }}
                                />
                    }}
                />
            </Tab.Navigator>
        </>
    );
};
