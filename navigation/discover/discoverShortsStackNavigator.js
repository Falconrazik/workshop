import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreatorProfile from '../../screens/account/creatorProfile';
import DiscoverTopTabNavigator from './discoverTopTabNavigator';
import Short from '../../components/short';
import BookingForm from '../../components/bookingForm';

export default function DiscoverShortsStackNavigator({homeTabNavigation}) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"DiscoverTabs"}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="DiscoverTabs"
                component={DiscoverTopTabNavigator}
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
            <Stack.Group
                screenOptions={{ presentation: 'modal' }}
            >
                <Stack.Screen
                    name="BookingForm"
                    children={(props) =>
                        <BookingForm {...props} homeTabNavigation={homeTabNavigation} />
                    }
                />
            </Stack.Group>

        </Stack.Navigator>
    )
};
