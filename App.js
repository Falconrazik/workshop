import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import AppStackNavigator from './navigation/appStackNavigator';
import {StatusBar} from 'expo-status-bar';

export default function App() {
    return (
        <NavigationContainer>
            <AppStackNavigator/>
        </NavigationContainer>
    );
}
