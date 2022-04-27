import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import {useFonts} from 'expo-font';
import * as firebase from "firebase";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import _ from 'lodash';
import fonts from '../assets/fonts/fonts';
import {Video} from 'expo-av';
import { db, auth } from '../firebase';
import NavBar from './navbar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function BookingForm({route, navigation, homeTabNavigation}) {
    const {creatorUID, username, video, rate, category} = route.params;

    const [duration, setDuration] = React.useState('');
    const [dateTime, setDateTime] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const [userDetail, setUserDetail] = React.useState(null);
    const [creatorDetail, setCreatorDetail] = React.useState(null);
    const [selectedQuestionIndices, setSelectedQuestionIndices] = React.useState([]);
    const userUID = auth.currentUser?.uid;

    React.useEffect(() => {
        db.collection("users").doc(userUID)
            .get().then((doc) => {
                setUserDetail(doc.data());
            });
        db.collection("users").doc(creatorUID)
            .get().then((doc) => {
                setCreatorDetail(doc.data());
            });
    }, [])

    const [fontsLoaded] = useFonts(fonts);
    if (!fontsLoaded) {
        return null;
    }

    const onSubmit = () => {
        const daysAhead = parseInt(dateTime.split(' ')[0]);
        const secondsOffset = parseInt(dateTime.split(' ')[1]);
        const startTime = new Date();
        startTime.setHours(0, 0, 0, 0);
        startTime.setDate(startTime.getDate() + daysAhead);
        startTime.setTime(startTime.getTime() + secondsOffset * 1000);

        try {
            db.collection("users").doc(creatorUID).update({
                bookings: firebase.firestore.FieldValue.arrayUnion({
                    duration: parseInt(duration),
                    status: "pending",
                    name: userDetail.name,
                    rate,
                    userUID,
                    category,
                    startTime,
                    notes,
                    guidingQuestions: selectedQuestionIndices.map(index => creatorDetail.guidingQuestions[index]),
                    requester: auth.currentUser.uid
                })
            })
                .then(() => {
                    db.collection('users').doc(userUID).update({
                        bookings: firebase.firestore.FieldValue.arrayUnion({
                            duration: parseInt(duration),
                            status: "pending",
                            name: username,
                            rate,
                            userUID: creatorUID,
                            category,
                            startTime,
                            notes,
                            requester: auth.currentUser.uid
                        })
                    }).then(() => {
                        navigation.goBack();
                        setTimeout(() => {
                            homeTabNavigation.navigate("Dashboard");
                        }, 100)
                    })
                })
                .catch((error) => {
                    console.error(error)
                });
        } catch (e) {
            console.error("Error adding document: " + e);
        }
    }

    const dateTimeSlotWidth = (Dimensions.get('window').width - 46 * 2) / 3 - 6;

    const DURATIONS = [
        '30 mins',
        '45 mins',
        '60 mins',
    ];

    const TIMES = [
        '10:00 AM',
        '4:30 PM',
        '5:00 PM',
    ];

    const SECONDS_TO_ADD = [
        36000,
        59400,
        61200,
    ];

    const WEEKDAYS = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const tomorrow = WEEKDAYS[(new Date((new Date()).getTime() + 24 * 60 * 60 * 1000)).getDay()];
    const dayAfterTomorrow = WEEKDAYS[(new Date((new Date()).getTime() + 48 * 60 * 60 * 1000)).getDay()];

    const videoWidth = (Dimensions.get('window').width - 46 * 2 - 24) / 3;
    const notesWidth = video ? videoWidth * 2 : Dimensions.get('window').width - 46 * 2;

    const disableSubmit = !duration || !dateTime;

    return (
        <>
            {/*<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} enabled keyboardVerticalOffset={100}>*/}
                <NavBar navigation={navigation} backButtonOnly />
                <SafeAreaView style={{flex: 1, justifyContent: 'flex-end'}}>
                    <KeyboardAwareScrollView style={styles.container} extraHeight={123}>
                        <Text style={[styles.text, styles.headerText, {marginBottom: 12.2}]}>Book a call</Text>
                        <Text style={[styles.text, styles.subheaderText, {marginBottom: 12.2}]}>@{username}</Text>
                        <Text style={[styles.text, {marginBottom: 19.5}]}>Select an available time slot!</Text>
                        <View style={[styles.flexContainer, {marginBottom: 39}]}>
                            {DURATIONS.map((d, index) => (
                                <DateSlot key={index} value={d} width={dateTimeSlotWidth} selected={duration === d} onPress={() => setDuration(d)}/>
                            ))}
                        </View>
                        <Text style={[styles.text, styles.subheaderText, {marginBottom: 12}]}>Today</Text>
                        <View style={[styles.flexContainer, {marginBottom: 29}]}>
                            {TIMES.map((t, index) => (
                                <TimeSlot key={index} disabled={!duration} value={t} width={dateTimeSlotWidth} selected={dateTime === `0 ${SECONDS_TO_ADD[index]}`} onPress={() => setDateTime(`0 ${SECONDS_TO_ADD[index]}`)} />
                            ))}
                        </View>
                        <Text style={[styles.text, styles.subheaderText, {marginBottom: 12}]}>{tomorrow}</Text>
                        <View style={[styles.flexContainer, {marginBottom: 29}]}>
                            {TIMES.map((t, index) => (
                                <TimeSlot key={index} disabled={!duration} value={t} width={dateTimeSlotWidth} selected={dateTime === `1 ${SECONDS_TO_ADD[index]}`} onPress={() => setDateTime(`1 ${SECONDS_TO_ADD[index]}`)} />
                            ))}
                        </View>
                        <Text style={[styles.text, styles.subheaderText, {marginBottom: 12}]}>{dayAfterTomorrow}</Text>
                        <View style={[styles.flexContainer, {marginBottom: 39}]}>
                            {TIMES.map((t, index) => (
                                <TimeSlot key={index} disabled={!duration} value={t} width={dateTimeSlotWidth} selected={dateTime === `2 ${SECONDS_TO_ADD[index]}`} onPress={() => setDateTime(`2 ${SECONDS_TO_ADD[index]}`)} />
                            ))}
                        </View>
                        {creatorDetail?.guidingQuestions && (
                            <View style={{marginBottom: 29}}>
                                <Text style={[styles.text, styles.subheaderText, {marginBottom: 12}]}>Guiding Questions (optional)</Text>
                                {creatorDetail.guidingQuestions.map((question, index) => (
                                    <BouncyCheckbox
                                        key={index}
                                        size={16}
                                        text={question}
                                        onPress={isChecked => isChecked
                                            ? setSelectedQuestionIndices(_.concat([index], selectedQuestionIndices))
                                            : setSelectedQuestionIndices(_.filter(selectedQuestionIndices, i => i !== index))}
                                        textStyle={[styles.text, styles.subheaderText, {color: selectedQuestionIndices.includes(index) ? '#E2E9FE' : '#9FA0BD', textDecorationLine: "none"}]}
                                        unfillColor="#D3D0E5"
                                        fillColor="#6248FF"
                                        style={{
                                            backgroundColor: selectedQuestionIndices.includes(index) ? '#6248FF' : '#D3D0E5',
                                            marginBottom: 8,
                                            borderRadius: 8,
                                            paddingRight: 16,
                                            paddingVertical: 10
                                        }}
                                        iconStyle={{borderWidth: 0, paddingLeft: 16}}
                                        textContainerStyle={{flexShrink: 1, }}
                                    />
                                ))}

                            </View>
                        )}
                        <View style={[styles.flexContainer, {marginBottom: 39}]}>
                            {video && (
                                <View>
                                    <Text style={[styles.text, styles.subheaderText, {marginBottom: 10}]}>Link</Text>
                                    <Video source={video} resizeMode="cover" style={{width: videoWidth, height: 123, borderRadius: 8}} />
                                </View>
                            )}

                            <View>
                                <Text style={[styles.text, styles.subheaderText, {marginBottom: 10}]}>Notes (optional)</Text>
                                <TextInput
                                    multiline
                                    style={[{padding: 12, borderRadius: 8, width: notesWidth, height: 123, backgroundColor: 'white', fontFamily: 'text', fontSize: 17}]}
                                    onChangeText={setNotes}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={onSubmit}
                            disabled={disableSubmit}
                            style={{
                                alignSelf: 'flex-end',
                                backgroundColor: disableSubmit ? '#D3D0E5' : '#1ADDA8',
                                paddingVertical: 6,
                                alignItems: 'center',
                                borderRadius: 18,
                                width: 92,
                                height: 34
                            }}
                        >
                            <Text style={[styles.text, styles.subheaderText, {color: disableSubmit ? '#9FA0BD' : 'black'}]}>book</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            {/*</KeyboardAvoidingView>*/}
        </>
    );
}

const DateSlot = ({value, onPress, selected, disabled = false, width}) => (
    <TouchableOpacity
        style={[
            styles.dateTimeSlotButton,
            {backgroundColor: disabled ? '#D3D0E5' : (selected ? '#5A83FF' : '#E2E9FE')},
            {width},
        ]}
        disabled={disabled}
        onPress={onPress}
    >
        <Text
            style={[
                styles.dateTimeSlotText,
                {color: disabled ? '#9FA0BD' : (selected ? '#E2E9FE' : '#5A83FF')}
            ]}
        >
            {value}
        </Text>
    </TouchableOpacity>
);

const TimeSlot = ({value, onPress, selected, disabled = false, width}) => (
    <TouchableOpacity
        style={[
            styles.dateTimeSlotButton,
            {backgroundColor: disabled ? '#D3D0E5' : (selected ? '#6248FF' : '#D3D0E5')},
            {width},
        ]}
        disabled={disabled}
        onPress={onPress}
    >
        <Text
            style={[
                styles.dateTimeSlotText,
                {color: disabled ? '#9FA0BD' : (selected ? '#E2E9FE' : '#9FA0BD')}
            ]}
        >
            {value}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 48,
        height: Dimensions.get('window').height,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: 'white',
        fontFamily: 'text',
        fontSize: 17,
    },
    headerText: {
        fontFamily: 'textBold',
        fontSize: 32,
    },
    subheaderText: {
        fontFamily: 'textBold',
        fontSize: 16,
    },
    dateTimeSlotButton: {
        height: 43,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    dateTimeSlotText: {
        fontFamily: 'textBold',
        fontSize: 14,
    },
});
