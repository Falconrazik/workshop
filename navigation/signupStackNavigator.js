import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/signup/signup';
import CreateAvatar from '../screens/signup/createAvatar';
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
                name="CreateAvatar"
                component={CreateAvatar}
                options={{}}
            />
        </Stack.Navigator>
    )
};
