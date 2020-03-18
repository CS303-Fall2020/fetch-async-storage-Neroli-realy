import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from  'react-native';

export default function Splash(){

  return(
      <View style={{flex: 1, backgroundColor: 'grey'}}>
      <ImageBackground source={require("../assets/sp1.png")} style={styles.splash}>
      <View style={styles.title}>
        <Text style={styles.text}>Loading...</Text>
      </View>
      </ImageBackground>
      </View>
  )
}


const styles = StyleSheet.create({
 splash: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '70%',
    width: '100%',
    marginTop: 130,
 },
 title: {
     flex: 1,
     paddingLeft: 120,
     paddingTop: 380,
 },
 text: {
     fontWeight: 'bold',
     fontSize: 30

 }
});
