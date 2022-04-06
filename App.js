import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import AppStackNavigator from './navigation/appStackNavigator';
import {StatusBar} from 'expo-status-bar';
import Constants from 'expo-constants';

export default function App() {
    return (
        <>
            <View style={{height: Constants.statusBarHeight, backgroundColor: 'black'}}>
                <StatusBar translucent style="light" />
            </View>
            <NavigationContainer>
                <AppStackNavigator/>
            </NavigationContainer>
        </>
    );
}
