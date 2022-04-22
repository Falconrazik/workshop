import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Schedule from '../../screens/dashboard/schedule';

export default function ScheduleStackNavigator () {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"Schedule"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Schedule"
                component={Schedule}
            />
        </Stack.Navigator>
    )
};
