import { View, Text, Image } from 'react-native'
import React from 'react'

const Avatar = ({
    width,
    height,
    borderRadius,
    borderWidth,
    src,

}) => {
    let avatarPreview = '../assets/avatar.png';
  return (
        <View style={{
            width: width,
            height: height,
            shadowColor: '#1ADDA8',
            shadowOpacity: 0.5,
            shadowRadius: borderRadius
        }}> 
            <Image
                source={
                    src ? { uri: src} : require(avatarPreview)
                } 
                resizeMode="cover" 
                style={{
                    width: width,
                    height: height,
                    borderRadius: borderRadius,
                    borderWidth: borderWidth,
                    borderColor: '#FFFFFF'
                }}
            />
        </View>
  )
}

export default Avatar;