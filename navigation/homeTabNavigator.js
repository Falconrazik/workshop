import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardStackNavigator from './dashboardStackNavigator';
import AccountStackNavigator from './accountStackNavigator';
import DiscoverTopTabNavigator from './discover/discoverTopTabNavigator';
import {Image} from 'react-native';

export default function HomeTabNavigator () {
    const Tab = createBottomTabNavigator();

    return (
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
                component={DiscoverTopTabNavigator}
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
                options={{}}
            />
            <Tab.Screen
                name="Account"
                component={AccountStackNavigator}
                options={{}}
            />
        </Tab.Navigator>
    )
};
