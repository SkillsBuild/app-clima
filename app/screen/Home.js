import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  return (
    <View centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../assets/imagenes/wallpaper_home.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>
        Consulta las mejores ciudades para montar tu negocio
      </Text>
      <Text style={styles.description}>
        ¿Cómo saber si hará buen clima en algún sitio? ¿Deberás prepararte para
        recibir una jornada inestable? Busca y visualiza los mejores lugares de
        una forma sencilla, ubicate en el mapa y analiza el clima de tus
        ciudades favoritas.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          title="¡Comencemos!"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("search")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 280,
    width: "100%",
    marginBottom: 40,
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginTop: 1,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 15,
    marginTop: 15,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#3FBFBF",
  },
  btnContainer: {
    height: 30,
    width: "100%",
  },
});
