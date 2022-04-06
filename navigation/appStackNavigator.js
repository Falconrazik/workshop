import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from '../screens/landing';
import SignupStackNavigator from '../screens/signup/signup';
import HomeTabNavigator from './homeTabNavigator';
import {View} from 'react-native';

export default function AppStackNavigator () {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Home"// "Landing"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Landing"
                component={Landing}
                options={{}}
            />
            <Stack.Screen
                name="SignUp"
                component={SignupStackNavigator}
                options={{}}
            />
            <Stack.Screen
                name="Home"
                component={HomeTabNavigator}
                options={{}}
            />
            <Stack.Group
                screenOptions={{ presentation: 'modal' }}
            >
                <Stack.Screen
                    name="SearchModal"
                    children={() => <View style={{backgroundColor: 'red', flex: 1}} />}
                    options={{}}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
};
