import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/signup/signup';

export default function SignupStackNavigator (props) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"SignUp"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{}}
            />
            <Stack.Screen
                name="SetAvatar"
                component={SignUp}
                options={{}}
            />
        </Stack.Navigator>
    )
};
