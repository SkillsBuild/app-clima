import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saterday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Oct",
  "Nov",
  "Dec",
];

const WeatherItem = ({ title, value, unit }) => {
  return (
    <View style={styles.whethercontainer}>
      <Text style={styles.whethercontainerTitle}>{title}</Text>
      <Text style={styles.whethercontainerValue}>
        {value}
        {unit}
      </Text>
    </View>
  );
};

export default function DateTime({ temperatura, humedad, name,description }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      const time = new Date();
      const hour = time.getHours();
      const minutes = time.getMinutes();

      setTime(
        (hour < 10 ? "0" + hour : hour) +
          ":" +
          (minutes < 10 ? "0" + minutes : minutes)
      );

      const date = time.getDate();
      const day = time.getDay();
      const month = time.getMonth();

      setDate(days[day] + " , " + date + " " + months[month]);
    }, 1000);
  }, []);

  return (
    <View style={styles.contenedor}>
      <View>
        <View>
          <Text style={styles.hora}>{time}</Text>
        </View>
        <View>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.whethercontainer}>
          <Text>
            <WeatherItem
              title="Temperatua: "
              value={temperatura ? temperatura : ""}
              unit="°C"
            />
            <WeatherItem title="Humedad: " value={humedad} unit="%" />
            <WeatherItem title="Sunrise: " value="6:50 " unit="am" />
            <WeatherItem title="Sunset: " value="19:50 " unit="pm" />
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.ciudad}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent:"center"
    
  },
  hora: {
    fontSize: 45,
    color: "white",
  },
  whethercontainer: {
    backgroundColor: "#18181850",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignContent: "center",
  },
  whethercontainerTitle: {
    fontWeight: "bold",
    justifyContent:"space-around",
  },
  whethercontainerValue: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  date: {
    fontSize: 25,
    color: "red",
  },
  ciudad: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 20,
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 20,
  },
});
