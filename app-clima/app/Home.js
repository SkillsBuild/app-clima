import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import DateTime from "../../Components/DateTime";

const APIKEY = "d88836fc5ebe5bd3c1dc5126da78cbc3";
const img = require("C:\\Users\\Tincho\\Documents\\IBM-React\\5-tenedores\\assets\\sea.jpg");

var temperatura;
var humedad;
var name;
var description;

export default function Home() {

  const [data, setData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        let { latitude, longitude } = success.coords;
        fetchDataFromAPI(latitude, longitude);
      },
      (err) => {
        if (err) {
          fetchDataFromAPI("40.7", "-74.0");
        }
      }
    );
  }, []);

  const fetchDataFromAPI = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${APIKEY}`
    ).then((res) => res.json()).then((json) => {
        
        console.log(json);
        temperatura=json.main.temp;
        console.log(json.main.humidity);
        humedad=json.main.humidity;
        name=json.name;
        description=json.weather[0].description;
        if(description==="overcast clouds")
          description="Cielo cubierto";
        setData(json);
        console.log(data);

      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <DateTime temperatura={temperatura} humedad={humedad} name={name} description={description}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
