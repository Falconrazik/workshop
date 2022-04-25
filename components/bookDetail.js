import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import fonts from '../assets/fonts/fonts'
import {useFonts} from 'expo-font'
import {storage} from '../firebase'
import Avatar from './avatar'

const BookDetail = ( {navigation, uid, name, startTime , duration, category, rate, notes, type, userType, color} ) => {
  const [date, setDate] = useState(null);

  const [imageURL, setImage] = useState('');
  useEffect(() => {
      const fileName = uid + '.jpg';
      var fileRef = storage.ref().child(`avatar/${fileName}`);
      fileRef.getDownloadURL()
      .then((url) => {
          // `url` is the download URL for 'avatar/uid.jpg'
          setImage(url);
        })
        .catch((error) => {
          // Handle any errors
        });
  }, [] );

  const [time, setTime] = useState('');
  useEffect(() => {
    let timeString = startTime.toString().split(' ');
    let result = timeString[4].substring(0, 5) + "-";
    startTime.setHours(startTime.getHours(), startTime.getMinutes() + duration,0,0);
    let endString = startTime.toString().split(' ');
    result += endString[4].substring(0, 5);
    setTime(result);
  }, [] );

  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) {
      return null;
  }

const showPreview = () => {
  if (!imageURL) {
      return  <Avatar width={45} height={45} borderRadius={50} borderWidth={2}/>
  }
  else {
      return <Avatar width={45} height={45} borderRadius={50} borderWidth={2} src={imageURL}/>
  }
}

const getImagePath = () => {
  if (category === "fitness") {
    return require("../assets/icons/fitness.png");
  }
  if (category === "invest") {
    return require("../assets/icons/invest.png");
  }
  if (category === "music") {
    imagePath = "";
  }
  if (category === "beauty") {
    imagePath = "";
  }
}

const showDate = () => {
  let dateString = startTime.toString().split(' ');
  let result = dateString[1] + ' ' + dateString[2] + ', ' + dateString[3];
  if (!date)
    setDate(result);
  return result;
}
    
  return (
    <TouchableOpacity 
      style={[styles.container, {backgroundColor: color}]}
      onPress={() => {
        if (userType === "teach" && type === "pending")
          navigation.navigate("RequestDetail", {uid: uid, date: date, time: time, rate: rate, notes: notes, navigation});

        if (type === "upcoming")
          navigation.navigate("VideoCall", {uid: uid, name: name, navigation});
      }}
    >
      <View style={styles.topView}>
        <Image source={getImagePath()} style={styles.logo}/>
        <View style={{flex: 1, justifyContent: "center", paddingLeft: 10}}>
            <Text style={styles.date}>{showDate()}</Text>
          <Text style={styles.timeStamp}>{time}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.bottomView} 
        onPress={() => {
          if (userType === "learn")
            navigation.navigate("CreatorProfile", {uid: uid, navigation})
        }}
      >
        {showPreview()}
        <View style={{justifyContent: "center", marginLeft: 7}}>
          <Text style={styles.textSmall}>@{name}</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default BookDetail;

const styles = StyleSheet.create({
    container: {
        width: "49%",
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },

    topView: {
        flex: 1,
        flexDirection: "row",
    },

    bottomView: {
        flex: 1,
        flexDirection: "row",
        marginTop: "5%"
    },

    date: {
        fontFamily: "textBold",
        fontSize: 16,
    },

    timeStamp: {
        fontFamily: "text",
        fontSize: 14
    },

    logo: {
        width: 45,
        height: 45,
    },

    textSmall: {
        fontFamily: 'text',
        fontSize: 12
    },

})
