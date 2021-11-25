import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import DateTime from "../../components/clima/DateTime"

const APIKEY = "d88836fc5ebe5bd3c1dc5126da78cbc3";

export default function Clima(props) {
  const {lat, lon} = props
  
  const [temperatura, setTemperatura] = useState("")
  const [humedad, setHumedad] = useState("")
  const [idIcon, setIdIcon] = useState("")


  useEffect(() => {
    fetchDataFromAPI(lat, lon)
  }, [])


  const fetchDataFromAPI = (lat, lon) => {
     const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&APPID=${APIKEY}`

    fetch(uri)
      .then( (res) => res.json())
      .then( (json) => {
        const {temp, humidity} = json.main
        const {icon} = json.weather[0]

        setTemperatura(temp);
        setHumedad(humidity);
        setIdIcon(icon);
      })
      .catch((error) => console.error(error))
  }


  return (
    <View style={styles.container}>
        <DateTime temperatura={temperatura} humedad={humedad} idIcon={idIcon} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 3,
    alignItems: "center",
  },
});
