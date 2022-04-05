import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DiscoverShorts from '../screens/discover/discoverShorts';
import DiscoverCreators from '../screens/discover/discoverCreators';

export default function DiscoverStackNavigator (props) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="DiscoverShorts"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="DiscoverCreators"
                component={DiscoverCreators}
                options={{}}
            />
            <Stack.Screen
                name="DiscoverShorts"
                component={DiscoverShorts}
                options={{}}
            />
        </Stack.Navigator>
    )
};
