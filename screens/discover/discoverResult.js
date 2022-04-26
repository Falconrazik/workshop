import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react'
import { db } from '../../firebase'
import CreatorCard from '../../components/creatorCard'

const DiscoverResult = ({route, navigation}) => {
    let category = route.params.category;

    const [creatorList, setCreatorList] = useState(null);

    const [refreshing, setRefreshing] = useState(false);

    const fetchCreators = (cb) => {
        db.collection("users").where("userType", "==", "teach")
        .get()
        .then((querySnapshot) => {
            let creatorList = new Array();
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                creatorList.push(doc.data());
            });
            setCreatorList(creatorList);
            if (cb) {
                cb();
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

    const onRefresh = () => {
        setRefreshing(true);
        fetchCreators(() => setRefreshing(false));
    }

    useEffect(() => {
        const intervalID = setInterval(() => {
        fetchCreators();
        }, 10000);
        const unsubscribeFocusListener = navigation.addListener('focus', () => fetchCreators());
        return () => {
        clearInterval(intervalID);
        unsubscribeFocusListener();
        }
    }, [] );

    const showCreatorList = () => {
        if (creatorList) {
            return creatorList.map((item, index) => {
                let categoryList = item.categories;
                let categoryType = categoryList[0];
                if (categoryType === category) {
                    return <CreatorCard key={index} uid={item.uid} type={"book"} navigation={navigation}/>;
                }
                if (category === "top-rated") {
                    if (item.sessions > 80)
                        return <CreatorCard key={index} uid={item.uid} type={"book"} navigation={navigation}/>;
                }
                if (category === "trending") {
                    if (item.sessions > 50)
                        return <CreatorCard key={index} uid={item.uid} type={"book"} navigation={navigation}/>;
                }
            });
        }
    }

    const showCategoryLogo = () => {
        if (category === 'fitness')
            return require("../../assets/banners/fitness_banner.png");
        if (category === 'invest')
            return require('../../assets/banners/investing_banner.png');
        if (category === 'music')
            return require('../../assets/banners/art_banner.png');
        if (category === 'beauty')
            return require('../../assets/banners/film_and_photography_banner.png');
        if (category === 'top-rated')
            return require('../../assets/icons/crown.png');
        if (category === 'trending')
            return require('../../assets/icons/speaker.png');
    }

  return (
    <>
    <View style={styles.container}>
        <View style={{backgroundColor: 'transparent', height: 100, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 29}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={{width: 25, height: 20}}
                    source={require('../../assets/back_arrow.png')}
                />
            </TouchableOpacity>
            <Image source={showCategoryLogo()} style={{width: 73, height: 92, marginLeft: 10}}/>
            <Text style={styles.navBarText}>{category}</Text>
        </View>

        <ScrollView 
            style={{flex: 1}} 
            refreshControl={
                <RefreshControl
                    colors={['white']}
                    tintColor="white"
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={{flex: 1, alignItems: "center", marginTop: 10}}>
                {showCreatorList()}
            </View>
        </ScrollView>
    </View>
    </>
  )
}

export default DiscoverResult

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    navBarText: {
        fontFamily: 'textBold',
        fontSize: 20,
        color: 'white',
        marginLeft: 18
    },
})