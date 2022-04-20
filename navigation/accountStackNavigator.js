import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../screens/account/account';
import CreatorProfile from '../screens/account/creatorProfile';

export default function AccountStackNavigator (props) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"Account"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="account"
                component={Account}
                options={{}}
            />

            <Stack.Screen
                name="CreatorAccount"
                component={CreatorProfile}
                options={{}}
            />

        </Stack.Navigator>
    )
};
