import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';

export default function DiscoverShorts (props) {
    return (
        <SafeAreaView style={{flexGrow: 1}}>
            <ScrollView style={[styles.container]}>

            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    }
});
