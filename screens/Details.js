import React , {useState} from 'react';
import {StyleSheet, View,  Button, TextInput, TouchableNativeFeedback, Keyboard } from 'react-native';


export default function Details({route, navigation}){
  const [item , setItem] = useState(route.params);
  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1, padding : 50}}>
        <TextInput 
        multiline
        style={styles.input} 
        defaultValue={item.name}
        onChangeText={(n) => setItem({
          name: n,
          Checked: item.Checked,
          key: item.key
        })}
        />
        <Button title="Save" onPress={() => navigation.navigate('Home', item)} color='orange'/>
      </View>
    </TouchableNativeFeedback>
  )
}


const styles = StyleSheet.create({
  input: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: 'dashed',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 30
  }

})