import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../../screens/account/account';
import DiscoverCreators from '../../screens/discover/discoverCreators';
import DiscoverShorts from '../../screens/discover/discoverShorts';

export default function DiscoverShortsStackNavigator (props) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"DiscoverShorts"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="DiscoverShorts"
                component={DiscoverShorts}
                options={{}}
            />

        </Stack.Navigator>
    )
};
