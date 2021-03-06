import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreatorProfile from '../../screens/account/creatorProfile';
import DashboardTopStackNavigator from './dashboardTopStackNavigator';
import RequesDetail from '../../screens/dashboard/requestDetail';
import VideoCall from '../../screens/dashboard/videoCall';
import React from 'react';
import _ from 'lodash';

export default function DashboardStackNavigator () {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"DashboardTop"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="DashboardTop"
                children={props => (
                    <DashboardTopStackNavigator {...props} dashboardRootStackNavigation={props.navigation} />
                )}
                option={{}}
            />

            <Stack.Screen
                name="CreatorProfile"
                component={CreatorProfile}
                options={{}}
            />

            <Stack.Screen
                name="RequestDetail"
                component={RequesDetail}
                options={{}}
            />

            <Stack.Screen
                name="VideoCall"
                component={VideoCall}
                options={{}}
            />

        </Stack.Navigator>
    )
};
