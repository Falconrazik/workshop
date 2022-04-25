import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Schedule from '../../screens/dashboard/schedule';
import CreatorProfile from '../../screens/account/creatorProfile';

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

            <Stack.Screen
                name="CreatorProfile"
                component={CreatorProfile}
                options={{}}
            />
        </Stack.Navigator>
    )
};
