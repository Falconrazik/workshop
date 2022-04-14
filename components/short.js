import {Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React from 'react';
import * as Font from 'expo-font';
import {Video} from 'expo-av';
import {COLORS} from '../CONST';
import CategoryCapsule from './categoryCapsule';
import fonts from '../assets/fonts/fonts';

const CATEGORY_COLORS = [
    COLORS.BLUE_LIGHT,
    COLORS.BLUE_LIGHT,
    COLORS.GREEN_50,
];

export default class Short extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            isLoading: true,
            fontsLoaded: false,
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(fonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }



    render() {
        if (!this.state.fontsLoaded) {
            return null;
        }
        return (
            <BottomTabBarHeightContext.Consumer>
                {tabBarHeight => (
                    <TouchableWithoutFeedback style={styles.short}>
                        <>
                            <ShortOverlay
                                creatorAvatarFile={this.props.creatorAvatarFile}
                                creatorUsername={this.props.creatorUsername}
                                creatorBio={this.props.creatorBio}
                                categories={this.props.categories}
                            />
                            <Video
                                style={[styles.video, {height: Dimensions.get('window').height - Constants.statusBarHeight - tabBarHeight}]}
                                source={this.props.video}
                                resizeMode={Video.RESIZE_MODE_COVER}
                                shouldPlay={this.props.shouldPlay}
                                isLooping
                                positionMillis={0}
                                onLoad={() => this.setState({isLoading: false})}
                                // onPlaybackStatusUpdate={({positionMillis}) =>
                                //     setVideoPosition(positionMillis)
                                // }
                                progressUpdateIntervalMillis={20}
                            />
                        </>
                    </TouchableWithoutFeedback>
                )}
            </BottomTabBarHeightContext.Consumer>
        )
    }


}

// export default function Short({
//     video,
//     shouldPlay,
//     creatorAvatarFile,
//     creatorUsername,
//     creatorBio,
//     categories,
// }) {
//     const videoHeight = Dimensions.get('window').height - Constants.statusBarHeight - useBottomTabBarHeight();
//     const [isLoading, setIsLoading] = React.useState(true);
//     // const [videoPosition, setVideoPosition] = React.useState(0)
//
//     const [fontsLoaded] = useFonts(fonts);
//     if (!fontsLoaded) {
//         return null;
//     }
//
//     return (
//         <TouchableWithoutFeedback style={styles.short}>
//             <>
//                 <ShortOverlay
//                     creatorAvatarFile={creatorAvatarFile}
//                     creatorUsername={creatorUsername}
//                     creatorBio={creatorBio}
//                     categories={categories}
//                 />
//                 <Video
//                     style={[styles.video, {height: videoHeight}]}
//                     source={video}
//                     resizeMode={Video.RESIZE_MODE_COVER}
//                     shouldPlay={shouldPlay}
//                     isLooping
//                     positionMillis={0}
//                     onLoad={() => setIsLoading(false)}
//                     // onPlaybackStatusUpdate={({positionMillis}) =>
//                     //     setVideoPosition(positionMillis)
//                     // }
//                     progressUpdateIntervalMillis={20}
//                 />
//             </>
//         </TouchableWithoutFeedback>
//     )
// }

function ShortOverlay({creatorAvatarFile, creatorUsername, creatorBio, categories}) {
    const videoHeight = Dimensions.get('window').height - Constants.statusBarHeight - useBottomTabBarHeight();
    return (
        <View style={[styles.shortOverlay, {height: videoHeight}]}>
            <TouchableOpacity>
                <Text style={styles.creatorUsernameText}>@{creatorUsername}</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.creatorBioText}>{creatorBio}</Text>
            </View>
            <View style={styles.tagsContainer}>
                {categories.map((category, index) => (
                    <CategoryCapsule
                        key={index}
                        category={category}
                        color={CATEGORY_COLORS[(index % CATEGORY_COLORS.length)]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shortOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingHorizontal: 32,
        paddingBottom: 20,
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    creatorBioText: {
        fontFamily: 'text',
        fontSize: 12,
        color: 'white',
        marginBottom: 15,
    },
    creatorUsernameText: {
        fontFamily: 'textBold',
        fontSize: 16,
        lineHeight: 19.5,
        color: 'white',
        marginBottom: 2,
    }
});
