import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStackNavigator from './navigation/appStackNavigator';

export default function App() {
    return (
        <NavigationContainer>
            <AppStackNavigator/>
        </NavigationContainer>
    );
}

