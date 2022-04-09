import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from '../screens/landing';
import SignupStackNavigator from '../screens/signup/signup';
import HomeTabNavigator from './homeTabNavigator';
import SearchModal from '../components/searchModal';
import CreateAvatar from '../screens/signup/createAvatar';

import { ScreenStackHeaderLeftView } from 'react-native-screens';

export default function AppStackNavigator () {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Landing"
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
            <Stack.Screen
                name="CreateAvatar"
                component={CreateAvatar}
                option={{}}
            />
            <Stack.Group
                screenOptions={{ presentation: 'modal' }}
            >
                <Stack.Screen
                    name="SearchModal"
                    component={SearchModal}
                    options={{}}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
};
