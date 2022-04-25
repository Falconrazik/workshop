import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import Avatar from './avatar'
import { storage } from '../firebase'
import { db } from '../firebase'
import fonts from '../assets/fonts/fonts'
import { useFonts } from 'expo-font'

const CreatorCard = ({uid, type, navigation}) => {
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

  const [name, setName] = useState('');
  const [userDetail, setUser] = useState(null);
  useEffect(() => {
      var docRef = db.collection("users").doc(uid);
      docRef.get().then((doc) => {
          if (doc.exists) {
              setUser(doc.data());
              setName(doc.data().userName);
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

  }, [] );

  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) {
      return null;
  }

  const showPreview = () => {
    if (!imageURL) {
      return  <Avatar width={62} height={62} borderRadius={4} borderWidth={2}/>
    }
    else {
      return <Avatar width={62} height={62} borderRadius={4} borderWidth={2} src={imageURL}/>
    }
  }

  const showButton = () => {
    if (type === "message") {
      return <TouchableOpacity>
              <Image source={require("../assets/icons/chat.png")} style={{width: 27, height: 27}}/>
            </TouchableOpacity> ;
    }
    if (type === "book") {
      return  <TouchableOpacity
                  onPress={() => navigation.navigate("BookingForm", {creatorUID: uid, username: userDetail.userName, rate: userDetail.rate, category: userDetail.categories[0]})}
                  style={{paddingHorizontal: 12, paddingVertical: 5, backgroundColor: "#1ADDA8", shadowColor: '#1ADDA8', shadowOpacity: 0.5, shadowRadius: 20, borderRadius: 39}}
              >
                  <Text style={styles.text}>book</Text>
              </TouchableOpacity>
    }
  }

  const showName = () => {
    if (name) {
      return <Text style={styles.name}>{name}</Text>
    }
  }

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate("CreatorProfile", {uid: uid, navigation})}
    >
      {showPreview()}
      <View style={styles.infoContainer}>
        {showName()}
        <Image source={require("../assets/rating.png")} style={{width: 108, height: 22, marginLeft: -10}}/>
      </View>

      {showButton()}
    </TouchableOpacity>
  )
}

export default CreatorCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20
  },

  infoContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10
  },

  name: {
    fontFamily: 'textBold',
    fontSize: 16,
    color: 'white',
  },

  buttonContainer: {

  },

  text: {
    fontFamily: 'textBold',
    fontSize: 16,
    color: 'black'
  }
})