import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import CONST from '../../CONST';
import CustomStatusBar from '../../components/customStatusBar';
import fonts from '../../assets/fonts/fonts';
import { useFonts } from 'expo-font';
import Avatar from '../../components/avatar';
import * as ImagePicker from 'expo-image-picker';
import { storage } from "../../firebase";

export default function CreateAvatar ( {route, navigation} ) {
    const [image, setImage] = useState(null);
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }
    let uid = route.params.paramKey;
    let type = route.params.userType;

    const navigateToBio = () => {
        navigation.navigate('CreateBio', {paramKey: uid, userType: type});
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    const showPreview = () => {
        if (!image) {
            return  <Avatar width={120} height={120} borderRadius={20} borderWidth={5}/>
        }
        else {
            return <Avatar width={120} height={120} borderRadius={20} borderWidth={5} src={image}/>
        }
    }

    const metadata = {
        contentType: 'image/jpg',
    };

    uploadImageAsync = async () => {
        const img = await fetch(image);
        const bytes = await img.blob();

        var storageRef = storage.ref();
        const fileExtension = image.split('.').pop();
        const fileName = uid + '.' + fileExtension;
        const fileRef = storageRef.child(`avatar/${fileName}`);
        fileRef.put(bytes).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        navigateToBio();          
    };
      

    return (
    <>
        <CustomStatusBar color={CONST.STATUS_BAR_COLOR.TRANSPARENT}/>
        <View style={styles.container}>
            <Text style={styles.title}>Awesome!</Text>
            <Text style={styles.description}>Add a picture to help others identify you!</Text>
            {showPreview()}
            <TouchableOpacity 
                style={styles.changeButton}
                onPress={pickImage}
            >
                <Text style={styles.text}>Change avatar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.saveDisabled, image && styles.saveEnabled]}
                disabled={!image}
                onPress={uploadImageAsync}
            >
                <Text style={[styles.text, style={color: '#9FA0BD'}, image && styles.enableText]}>
                    Save
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.skipButton}
                onPress={navigateToBio}
            >
                <Text style={styles.smallBoldText}>I'll do this later</Text>
            </TouchableOpacity>
        </View>
    </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center"
    },

    title: {
        height: "5%",
        width: "80%",
        marginTop: "20%",
        fontFamily: 'textBold',
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: "bold"
    },

    description: {
        height: "10%",
        width: "80%",
        marginTop: "5%",
        fontFamily: 'text',
        color: '#FFFFFF',
        fontSize: 19
    },

    changeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 80,
        borderRadius: 22,
        marginTop: '5%',
        backgroundColor: '#F8F7FF'
    },

    skipButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: 30,
        marginTop: '20%'
    },

    text: {
        fontFamily: 'text',
        textAlign: 'center',
        fontSize: 20
    },

    saveDisabled: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 80,
        borderRadius: 22,
        marginTop: '10%',
        backgroundColor: '#D3D0E5',
    },

    saveEnabled: {
        backgroundColor: '#1ADDA8'
    },

    enableText: {
        color: '#000000',
        fontFamily: 'textBold'
    },

    smallBoldText: {
        fontFamily: 'textBold',
        textDecorationLine: 'underline',
        color: '#FFFFFF',
        fontSize: 14
    }
});