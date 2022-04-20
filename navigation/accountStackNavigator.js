import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../screens/account/account';
import CreatorAccount from '../screens/account/creatorAccount';

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
                component={CreatorAccount}
                options={{}}
            />

        </Stack.Navigator>
    )
};
