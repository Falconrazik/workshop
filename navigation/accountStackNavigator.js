import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../screens/account/account';

export default function AccountStackNavigator (props) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"account"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="account"
                component={Account}
                options={{}}
            />

        </Stack.Navigator>
    )
};
