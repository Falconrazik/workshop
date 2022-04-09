import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';
import fonts from '../assets/fonts/fonts';
 
const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor
}) => {
  const [fontsLoaded] = useFonts(fonts);
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);
 
  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };
 
  return (
    <View>
      <View
        style={{
          height: 50,
          width: 200,
          backgroundColor: '#9FA0BD',
          borderRadius: getRoundCorner ? 25 : 0,
          borderColor: '#9FA0BD',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,
 
            backgroundColor: getSelectionMode == 1 ? selectionColor : '#9FA0BD',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 1 ? 'black' : 'white',
              fontSize: 23,
              fontFamily: 'textBold'
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
 
            backgroundColor: getSelectionMode == 2 ? selectionColor : '#9FA0BD',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 2 ? 'black' : 'white',
              fontSize: 23,
              fontFamily: 'textBold'
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;