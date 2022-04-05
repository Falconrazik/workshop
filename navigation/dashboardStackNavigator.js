import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/dashboard/dashboard';

export default function DashboardStackNavigator (props) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"dashboard"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="dashboard"
                component={Dashboard}
                options={{}}
            />

        </Stack.Navigator>
    )
};
