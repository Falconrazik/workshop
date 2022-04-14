import React from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    View,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import {useFonts} from 'expo-font';
import _ from 'lodash';
import fonts from '../assets/fonts/fonts';

export default function SearchModal ({onSearch, route, navigation}) {
    const [searchString, setSearchString] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    const CATEGORY_RECS = [
        {
            value: 'power-lifting',
            imageComponent: <Image source={require("../assets/icons/powerlifting.png")} style={{width: 22, height: 22}} />,
            backgroundColor: '#1ADDA8',

        },
        {
            value: 'bitcoin',
            imageComponent: <Image source={require("../assets/icons/bitcoin.png")} style={{width: 20, height: 20}} />,
            backgroundColor: '#6248FF',

        },
        {
            value: 'italian cuisine',
            imageComponent: <Image source={require("../assets/icons/italian-cuisine.png")} style={{width: 20, height: 20}} />,
            backgroundColor: '#5A83FF',

        },
    ];

    const onSubmitSearch = () => {
        setIsLoading(true);
        navigation.navigate("Home");
    }

    // console.log(">>>> type: ", route.params.type);
    // TODO: depending on type render different search recs idk

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchInputContainer} >
                <Image style={styles.searchIcon} source={require("../assets/icons/search_black.png")}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="search"
                    onChangeText={setSearchString}
                    underlineColorAndroid="transparent"
                    returnKeyType="go"
                    autoFocus
                    onSubmitEditing={onSubmitSearch}
                    autoCapitalize="none"
                />
            </View>
            <View style={{paddingHorizontal: 8}}>
                <Text style={[styles.recommendedText, {marginBottom: 17}]}>Recommended</Text>
                {CATEGORY_RECS.map(({value, imageComponent, backgroundColor}) => (
                    <RecommendedCapsule
                        key={value}
                        value={value}
                        imageComponent={imageComponent}
                        backgroundColor={backgroundColor}
                        onPress={() => {
                            setSearchString(value);
                            onSubmitSearch();
                        }}
                    />
                ))}
            </View>
        </SafeAreaView>
    );
};

function RecommendedCapsule({backgroundColor, value, imageComponent, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={_.merge({}, styles.recommendedCapsule, {backgroundColor})}>
            <View style={{marginRight: 10}}>
                {imageComponent}
            </View>
            <Text style={styles.recommendedText}>{value}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        paddingHorizontal: 12,
        flex: 1,
    },
    searchInputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 54,
        paddingVertical: 15,
        paddingLeft: 18.34,
        borderRadius: 20,
        marginBottom: 20,
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
    },
    recommendedText: {
        color: 'white',
        fontFamily: 'textBold',
        fontSize: 16,
        lineHeight: 19.5,
    },
    recommendedCapsule: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 10,
        height: 38,
        alignSelf: 'flex-start',
    },
});
