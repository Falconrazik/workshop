import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardStackNavigator from './dashboardStackNavigator';
import AccountStackNavigator from './accountStackNavigator';
import DiscoverStackNavigator from './discoverStackNavigator';

export default function HomeTabNavigator (props) {
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
                component={DiscoverStackNavigator}
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
