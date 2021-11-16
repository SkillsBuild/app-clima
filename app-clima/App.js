import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, StatusBar, Animated } from 'react-native';
import { LogBox } from "react-native";
import { firebase } from "./app/utils/firebase";

import Sun from "./assets/sun.jpg";
import Navigation from './app/navigation/Navigation';


LogBox.ignoreAllLogs();

export default function App() {
  const [animated, setAnimated] = useState(false)
  const [show] = useState(new Animated.Value(0))
  const [position] = useState(new Animated.Value(700))
  const [font] = useState(new Animated.Value(1))

  useEffect( () => {
    Animated.parallel([
      
      Animated.timing(show, {
        toValue: 1,
        duration: 2500,
        delay: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(position, {
        toValue: -700,
        duration: 5000,
        useNativeDriver: false,
      })

    ]).start( () => {

      Animated.timing(font, {
        toValue: 200,
        duration: 1000,
        useNativeDriver: false,

      }).start( () => setAnimated(true) );
    });
  }, [])

  if (!animated)
  return (
    <>
    
      <StatusBar 
        animated={true} 
        backgroundColor="#142950" 
        barStyle="light-content"
      />
      <View style={styles.container}>
        <Animated.Image 
          style={ [styles.image, {top: position}] } 
          source={Sun} 
        />
        <Animated.Text 
          style={ [styles.text, {opacity: show, transform:[{scale: font}]}] } >
          Welcome
        </Animated.Text>
      </View>
    
    </>
  );

  return(
    <Navigation />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142950',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  text: {
    fontSize: 50,
    color: "rgb(242,242,242)",
  },
});