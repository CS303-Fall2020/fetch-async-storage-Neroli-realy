import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Details from './screens/Details';
import Splash from './components/splash';

const Stack = createStackNavigator();


 function App() {
   const [spla, setSpla] = useState(true);
   
   useEffect(() => {setTimeout(() => {
    setSpla(false);
      }, 5000);})
  return (
      <NavigationContainer>
        <Stack.Navigator>
        
          {spla &&(
            <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
          )}
          <Stack.Screen name="Home" component={Home} options={{title: 'todoApp',headerTitleStyle:{flex: 1,marginLeft: 110}}}/>
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;