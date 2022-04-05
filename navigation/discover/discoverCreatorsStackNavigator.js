import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../../screens/account/account';
import DiscoverCreators from '../../screens/discover/discoverCreators';

export default function DiscoverCreatorsStackNavigator (props) {
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
                options={{}}
            />

        </Stack.Navigator>
    )
};
