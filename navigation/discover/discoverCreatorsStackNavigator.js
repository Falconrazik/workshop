import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DiscoverCreators from '../../screens/discover/discoverCreators';

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
        </Stack.Navigator>
    )
};
