import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    TextInput,
    Image,
    View,
} from 'react-native';
import {useFonts} from 'expo-font';
import fonts from '../assets/fonts/fonts';

export default function SearchModal ({onSearch, route, navigation}) {
    const [searchString, setSearchString] = React.useState('');

    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    console.log(">>>> type: ", route.params.type);
    // TODO: depending on type render different search recs idk

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer} >
                <Image style={styles.searchIcon} source={require("../assets/icons/search_black.png")}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="search"
                    onChangeText={setSearchString}
                    underlineColorAndroid="transparent"
                    returnKeyType="go"
                    autoFocus
                    onSubmitEditing={() => {
                        onSearch(searchString);
                    }}
                    autoCapitalize="none"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        paddingHorizontal: 12,
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 54,
        paddingVertical: 15,
        paddingLeft: 18.34,
        borderRadius: 20,
    },
    searchIcon: {
        width: 24.66,
        height: 26.66,
        marginRight: 20,
    },
    textInput: {
        height: 54,
        paddingVertical: 13,
        fontSize: 20,
        fontFamily: 'textBold',
        backgroundColor: 'white',
    }
});
