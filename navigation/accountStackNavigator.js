import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../screens/account/account';

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
                name="Account"
                component={Account}
                options={{}}
            />

        </Stack.Navigator>
    )
};
