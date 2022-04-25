import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../screens/account/account';
import CreatorProfile from '../screens/account/creatorProfile';
import BookedCreator from '../components/bookedCreators';
import BookingForm from '../components/bookingForm';
import Short from '../components/short';

export default function AccountStackNavigator (props) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"Account"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="account"
                component={Account}
                options={{}}
            />

            <Stack.Screen
                name="BookedCreator"
                component={BookedCreator}
                options={{}}
            />

            <Stack.Screen
                name="BookingForm"
                component={BookingForm}
                options={{}}
            />

            <Stack.Screen
                name="CreatorProfile"
                component={CreatorProfile}
                options={{}}
            />

            <Stack.Screen
                name="Short"
                component={Short}
                options={{}}
            />

        </Stack.Navigator>
    )
};
