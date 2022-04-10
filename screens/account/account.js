import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import CustomStatusBar from '../../components/customStatusBar';
import CONST from '../../CONST';
import { auth } from '../../firebase';
/**
 * Depending on account type conditionally display CreatorAccount or UserAccount
 */

export default function Account ( {navigation} ) {
    const user = auth.currentUser;
    let displayName;

    if (user !== null) {
        displayName = user.uid
    }

    const logOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.navigate('Landing')
            console.log('Sign out successful!')
          }).catch((error) => {
            // An error happened.
          });
    }

    return (
        <>
            <CustomStatusBar color={CONST.STATUS_BAR_COLOR.TRANSPARENT}/>

            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.googleBackground]}
                                onPress={logOut}

                            >
                                <Text style={[styles.text, styles.textLarge]}>Log Out</Text>
                                <Text style={[styles.text, styles.textLarge]}>{displayName}</Text>
                            </TouchableOpacity>
                    </View>
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

    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    appTitle: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: "60%",
        fontFamily: 'textBold',
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: "bold"
    },

    button: {
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        marginTop: 30,
        borderRadius: 40,
        height: 45,
        backgroundColor: "#FFFFFF",
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: "30%",
        width: "70%",
    },

    googleBackground: {
        backgroundColor: "#E2E9FE"
    },

    text: {
        fontFamily: 'textBold',
        color: '#000000',
        textAlign: "center",
        flexGrow: 1
    },

    tinyLogo: {
        width: 50,
        height: 50,
        marginTop: -15,
    }

});
