import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'

const Analytics = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center", marginTop: 20}}>
        <Image source={require("../../assets/analytics-timeline.png")} style={styles.timeline}/>
        <Image source={require("../../assets/analytics-dashboard.png")} style={styles.statistics}/>
      </View>
    </ScrollView>
  )
}

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  timeline: {
    width: 258,
    height: 28
  },

  statistics: {
    width: 400,
    height: 700,
    marginTop: 30
  },

})