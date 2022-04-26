import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DiscoverCreators from '../../screens/discover/discoverCreators';
import DiscoverResult from '../../screens/discover/discoverResult';

export default function DiscoverCreatorsStackNavigator () {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"DiscoverCreators"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="DiscoverCreators"
                component={DiscoverCreators}
            />

            <Stack.Screen
                name="DiscoverResult"
                component={DiscoverResult}
            />
        </Stack.Navigator>
    )
};
