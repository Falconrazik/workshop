import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {View, Text} from 'react-native'
import ChatList from '../screens/community/chatList';
import Chat from '../screens/community/chat';
import {useFonts} from 'expo-font';
import fonts from '../assets/fonts/fonts';

export default function CommunityStackNavigator (props) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName={"Chats"}
            screenOptions={{
                header: ({route}) => (
                    <ChatsHeader />
                ),
                headerMode: 'screen',
            }}
        >
            <Stack.Screen
                name="Chats"
                component={ChatList}
                options={{}}
            />
            <Stack.Group
                screenOptions={{
                    presentation: 'fullScreenModal',
                }}
                options={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalModal,
                }}
            >
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                    options={{
                        headerShown: false,
                    }}

                />
            </Stack.Group>
        </Stack.Navigator>
    )
};

function ChatsHeader() {
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'textBold', color: 'white', fontSize: 16, lineHeight: 19.5}}>Chats (12)</Text>
        </View>
    )
}
