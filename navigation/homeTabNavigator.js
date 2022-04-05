import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardStackNavigator from './dashboardStackNavigator';
import AccountStackNavigator from './accountStackNavigator';
import DiscoverTopTabNavigator from './discover/discoverTopTabNavigator';

export default function HomeTabNavigator () {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Discover"
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Discover"
                component={DiscoverTopTabNavigator}
                options={{}}
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
