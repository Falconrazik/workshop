import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/dashboard/dashboard';

export default function DashboardStackNavigator (props) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"Dashboard"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{}}
            />

        </Stack.Navigator>
    )
};
