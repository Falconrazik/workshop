import {auth} from '../firebase';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import {useFonts} from 'expo-font';
import fonts from '../assets/fonts/fonts';

export default function NavBar({navigation, uid, title = '', backButtonOnly = false}) {
    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    return (
        auth.currentUser?.uid === uid && !backButtonOnly
            ? (
                <View style={{backgroundColor: 'transparent', height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 29}}>
                    <TouchableOpacity>
                        <Image
                            style={{width: 21, height: 19.17, marginRight: 14}}
                            source={require('../assets/edit_icon.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={{width: 17, height: 21}}
                            source={require('../assets/hamburger_icon.png')}
                        />
                    </TouchableOpacity>

                </View>
            ) : (
                <View style={{backgroundColor: 'transparent', height: 60, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 29}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={{width: 25, height: 20}}
                            source={require('../assets/back_arrow.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{color: 'white', fontFamily: 'textBold', fontSize: 16}}>{title}</Text>
                    <View style={{opacity: 0}}>
                        <Image
                            style={{width: 25, height: 20}}
                            source={require('../assets/back_arrow.png')}
                        />
                    </View>
                </View>
            )
    );
}
