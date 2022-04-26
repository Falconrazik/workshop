import {FlatList, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React from 'react';
import Constants from 'expo-constants';
import {useIsFocused} from '@react-navigation/native';
import Short from '../../components/short';
import videos from '../../videos';

export default function DiscoverShorts ({navigation}) {
    const containerHeight = Dimensions.get('window').height - Constants.statusBarHeight - useBottomTabBarHeight();
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const isFocused = useIsFocused();

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={videos}
                maxToRenderPerBatch={3}
                keyExtractor={(item, index) => `${item.creatorUID}${index}`}
                renderItem={({item, index}) => (
                    <Short
                        navigation={navigation}
                        key={index}
                        video={item.file}
                        creatorUID={item.creatorUID}
                        shouldPlay={isFocused && scrollPosition >= (index * containerHeight) && scrollPosition < ((index + 1) * containerHeight)}
                    />
                )}
                style={[styles.scrollContainer, {height: containerHeight}]}
                snapToInterval={containerHeight}
                decelerationRate="fast"
                snapToStart
                disableIntervalMomentum
                bounces={false}
                showsVerticalScrollIndicator={false}
                onScroll={e => setScrollPosition(e.nativeEvent.contentOffset.y)}
                scrollEventThrottle={16}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'black',
    },
    scrollContainer: {
        backgroundColor: 'black',
        borderRadius: 25,
    },
});
