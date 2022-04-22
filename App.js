import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React from 'react';
import AppStackNavigator from './navigation/appStackNavigator';

export default function App() {
    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'black',
        },
    };
    return (
        <NavigationContainer
            theme={navTheme}
        >
            <AppStackNavigator/>
        </NavigationContainer>
    );
}

