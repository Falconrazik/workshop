import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../../screens/account/account';
import DiscoverCreators from '../../screens/discover/discoverCreators';
import DiscoverShorts from '../../screens/discover/discoverShorts';
import CreatorProfile from '../../screens/account/creatorProfile';
import DiscoverTopTabNavigator from './discoverTopTabNavigator';
import Short from '../../components/short';

export default function DiscoverShortsStackNavigator (props) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"DiscoverTabs"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="DiscoverTabs"
                component={DiscoverTopTabNavigator}
                options={{}}
            />
            <Stack.Screen
                name="CreatorProfile"
                component={CreatorProfile}
                options={{}}
            />
            <Stack.Screen
                name="Short"
                component={Short}
                options={{}}
            />

        </Stack.Navigator>
    )
};
