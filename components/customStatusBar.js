import CONST from '../CONST';
import {StatusBar} from 'expo-status-bar';
import {View} from 'react-native';
import Constants from 'expo-constants';
import React from 'react';

export default function CustomStatusBar({color}) {
    if (color === CONST.STATUS_BAR_COLOR.TRANSPARENT) {
        return (
            <StatusBar translucent style="light" backgroundColor={color} />
        )
    }
    return (
        <View style={{height: Constants.statusBarHeight, backgroundColor: color}}>
            <StatusBar translucent style="light" backgroundColor={color} />
        </View>
    );
}
