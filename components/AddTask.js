import React, {useState, useRef} from 'react';
import {StyleSheet, TextInput, Button, View} from 'react-native';


export default function Add({ addHandler }){
  const [name, setName] = useState('');
  const textInp = useRef(null);
  const whenC = (val) => {
    setName(val);
  }

  return(
    <View>
      <TextInput
        multiline
        placeholder='Enter the name'
        onChangeText={whenC}
        ref={textInp}
        style={styles.input}/>
        <Button onPress={() => {addHandler(name); textInp.current.clear(); setName('');}} title='Add' color='coral' />
        </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    textAlign: 'center'
  }
})
