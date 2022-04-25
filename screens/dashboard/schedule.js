import { StyleSheet, Text, View, ScrollView, Image, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react'
import fonts from '../../assets/fonts/fonts'
import { useFonts } from 'expo-font'
import BookDetail from '../../components/bookDetail'
import { db, auth } from '../../firebase'

const Schedule = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserDetails = (cb) => {
    var docRef = db.collection("users").doc(auth.currentUser.uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        setUserDetail(doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      if (cb) {
        cb();
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserDetails(() => setRefreshing(false));
  }

  useEffect(() => {
    fetchUserDetails();
    const intervalID = setInterval(() => {
      fetchUserDetails();
    }, 10000);
    return () => clearInterval(intervalID);
  }, [] );

  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) {
      return null;
  }

  let uid = auth.currentUser.uid;

  const getUpcomingBooking = () => {
    if (userDetail) {
      let bookings = userDetail.bookings;
      if (bookings) {
        return bookings.map((item) => {
          let uid = item.creatorUID;
          let creatorName = item.creatorUserName;
          let category = item.category;
          let date = item.startTime.toDate();
          let duration = item.duration;
          // date.setHours(date.getHours(), date.getMinutes() + duration,0,0);

          return (
            <BookDetail key={item} uid={uid} creatorName={creatorName}  startTime={date} duration={duration} category={category} color={"#D0FFF2"}/>
          );
        });
      }
    }
  }

  return (
    <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
              colors={['white']}
              tintColor="white"
              refreshing={refreshing}
              onRefresh={onRefresh}
          />
        }
    >
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000000"}}>
        <View style={styles.scheduleContainer}>
          <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between"}}>
            <Text style={styles.title}>Upcoming</Text>
            <Image source={require("../../assets/calendar.png")} style={styles.logo}/>
          </View>

          <View style={{flex: 1, flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between"}}>
            {getUpcomingBooking()}
          </View>

        </View>

        <View style={styles.scheduleContainer}>
          <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between"}}>
            <Text style={styles.title}>New</Text>
            <Image source={require("../../assets/bell.png")} style={styles.logo}/>
          </View>
          <Text style={{height: 100, width: "100%"}}>Upcoming</Text>
        </View>

        <View style={styles.scheduleContainer}>
          <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between"}}>
            <Text style={styles.title}>Completed</Text>
            <Image source={require("../../assets/chart.png")} style={styles.logo}/>
          </View>
          <Text style={{height: 100, width: "100%"}}>Upcoming</Text>
        </View>

        <View style={[styles.scheduleContainer, {marginBottom: "10%"}]}>
          <View style={{flexDirection: "row", flex: 1, justifyContent: "space-between"}}>
            <Text style={styles.title}>My Category</Text>
          </View>
          <Text style={{height: 100, width: "100%"}}>Upcoming</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },

  scheduleContainer: {
    flex: 1,
    width: "98%",
    backgroundColor: "#181D23",
    marginTop: "10%",
    padding: 15,
    borderRadius: 23
  },

  title: {
    fontFamily: "textBold",
    fontSize: 20,
    color: "#FFFFFF"
  },

  logo: {
    width: 60,
    height: 60,
    marginTop: "-10%"
  },

})
