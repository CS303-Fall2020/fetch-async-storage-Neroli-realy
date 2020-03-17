import React , { useState , useEffect} from 'react';
import {
  StyleSheet,
  View, 
  Alert, 
  FlatList, 
  TouchableWithoutFeedback, 
  Keyboard, 
  ActivityIndicator,
  AsyncStorage,
  Button,
  Text} from 'react-native';
import {useNetInfo} from "@react-native-community/netinfo";
import Task from '../components/Task';
import Add from '../components/AddTask';
import Header from '../components/Header';

export default function Home({route, navigation}){
  const [count, setcount] = useState(20);
  const [tasks, setTask] = useState([]);
  const [animate, setAnimate] = useState(false);  
  
  const pressHandler = (key) => {
    setTask((prev) => {
      return prev.filter(todo => todo.key !== key);
    });
    let y = tasks.filter(todo => todo.key !== key);
    save(y);
  }

  const addHandler = async (text) => {
    if(text === ''){
      Alert.alert("Error", "Enpty not allowed");
    }
    else{
      let news = {name: text, Checked: false, key: (count + 1).toString()};
    setAnimate(true);
    setTask((prev) => {
      return[
        news,
        ...prev
      ]
    })
    let s = [news, ...tasks];
    setcount(() => { return count + 1});
    save(s);
    refreshLocal();
    setAnimate(false);
    let y = await AsyncStorage.getItem('ToDos');
    console.log("=============================================================");
    console.log(count);
    console.log(y);
    console.log("=============================================================");

  }
    
  }
  
  const netinfo = useNetInfo();

  const checkHandler= (key) => {
    let i = 0;
    for(i = 0; i < tasks.length; i++){
      if(tasks[i].key === key)
        break;
    }
    /* 4 hours to do this shit XD
    pressHandler(key);
    setTask(() => {
      return[
        ...tasks.slice(0, i),
        {name: tasks[i].name, Checked: !tasks[i].Checked, key: tasks[i].key},
        ...tasks.slice(i+1)
      ]
    });
    console.log(tasks);*/
    setTask(() => {
      return tasks.map(todo => todo.key === key ? {name: tasks[i].name, Checked: !tasks[i].Checked, key: tasks[i].key}: todo);
    })
  
  }

  const navHandler = (item) => {
    navigation.navigate('Details', item);
  }

  
  const refreshLocal = async () =>{
    setTask(() => {return []});
    setAnimate(true);
    let y = await AsyncStorage.getItem('ToDos');
    let g = await JSON.parse(y);
    setTask(() => {
      return g
    });
    setcount(g.length);
    setAnimate(false);
    let ff = await AsyncStorage.getItem('ToDos');
    console.log("=============================================================");
    console.log(count);
    console.log(ff);
    console.log("=============================================================");

  }
  const refresh = async () => {
    setTask(() => {return[]});
    setAnimate(true);
    if(netinfo.isConnected){
      try{
        let res = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1");
        let json = await res.json();
        let i = 0;
        for(i = 0; i < json.length; i++){
          setcount(count + 1);
          setTask((prev) => {
            return[
              ...prev, {name: json[i].title,
                        Checked: json[i].completed,
                        key: json[i].id.toString()}
            ]
          })
        }
        save(tasks);
        //AsyncStorage.getItem('ToDos').then((value) => console.log(value));
        
      }
      catch(error) {
        Alert.alert("Error", error);
      }
    }
    else{
      refreshLocal();
    }
    setAnimate(false);
   // console.log(tasks);
  }
    const save = (list) =>{
     AsyncStorage.setItem('ToDos', JSON.stringify(list));
  }
  
  useEffect(() => {
      if(route.params?.name){
      setTask(() => {
        let x = tasks.map(todo => todo.key === route.params.key ? {name: route.params.name , Checked: route.params.Checked, key: route.params.key} : todo);
        save(x);
        return x
      });
      
    }else{
      refreshLocal();
    }
   // AsyncStorage.getItem('ToDos').then((value) => console.log(value));
  }, [route.params?.name]);

  return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.container}>
        <View style={styles.content}>  
          {!netinfo.isConnected && (
          <Text onPress={() => refreshLocal()}style={styles.noConnected}>
            you are not connected click here or refresh button to 
            refresh from the local data
          </Text>)}
          {!animate &&
            (
              <Add addHandler={addHandler}/>
          )}
          {animate && (
            <ActivityIndicator
              style={{ height: 80 }}
              color="#C00"
              size="large"
            />
          )}
          <FlatList
            data={tasks}
            renderItem={({item}) => (
              <Task 
              item={item} 
              pressHandler={pressHandler} 
              checkHandler={checkHandler} 
              navigationHandler={navHandler}
              />
            )}
          />
          <View>
          <Button color={netinfo.isConnected? 'green': 'red'} onPress={() => refresh()} title='refresh'/>
          </View>
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    content: {
      flex: 1
    },
    noConnected: {
      marginBottom: 10,
      textDecorationLine: 'underline',
      color: 'blue',
      fontWeight: 'bold',
      backgroundColor: 'yellow'
    }
  });
  