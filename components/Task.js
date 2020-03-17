import React , { useState } from 'react';
import {StyleSheet,View, Text, Image,  TouchableOpacity, CheckBox, Alert} from 'react-native';

export default function Task({item, pressHandler, checkHandler, navigationHandler}){

  const [task, setTask] = useState({
    name: 'test',
    Checked: false,
    key: '1'
  });
  let style = {flex: 1};
  if(item.Checked)
    style.textDecorationLine = 'line-through';
  return(
    <TouchableOpacity onLongPress={() => navigationHandler(item)}>
      <View style={styles.task}>
        <CheckBox style={styles.CheckBox} value={item.Checked} onChange={() => {checkHandler(item.key); }} />
        <Text style={style}>{item.name}</Text>
        <TouchableOpacity  onPress={() => pressHandler(item.key)}>
          <Image style={styles.image}  source={require('../delete.png')} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  
  );
  
}
const styles = StyleSheet.create({
  container:{
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 2,
    borderStyle: 'dashed',
    marginTop: 15,
  },
  task: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 2,
    borderStyle: 'dashed',
    marginTop: 15,
  },
  image: {
    height: 20,
    width: 20,
  },
  checkbox: {

  }

})
