import React from 'react';
import {StyleSheet, Text, View} from  'react-native';

export default function Header(){

  return(
    <View style={styles.header}>
      <Text style={styles.title}> This is header</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: 'red',
  },
  title:{
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
