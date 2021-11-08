import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  Text,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size, filter } from "lodash";
import Modal from "../Modal";

export default function AddFavoritesForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [favoriteName, setFavoriteName] = useState("");
  const [favoriteAdress, setFavoriteAdress] = useState("");
  const [favoriteDescription, setFavoriteDescription] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);

  const addFavorites = () => {};

  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd
        setFavoriteName={setFavoriteName}
        setFavoriteAdress={setFavoriteAdress}
        setFavoriteDescription={setFavoriteDescription}
        setIsVisibleMap={setIsVisibleMap}
      />
      <Button
        title="Agregar ciudad favorita"
        onPress={addFavorites}
        buttonStyle={styles.btnAddFavorites}
      />
      <Map isVisibleMap={isVisibleMap} setIsVisibleMap={setIsVisibleMap} />
    </ScrollView>
  );
}

function FormAdd(props) {
  const {
    setFavoriteName,
    setFavoriteAdress,
    setFavoriteDescription,
    setIsVisibleMap,
  } = props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del sitio o puesto"
        containerStyle={styles.input}
        onChange={(e) => setFavoriteName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.input}
        onChange={(e) => setFavoriteAdress(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input
        placeholder="Descripción del sitio"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setFavoriteDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function Map(props) {
  const { isVisibleMap, setIsVisibleMap } = props;

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <Text> Mapa </Text>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddFavorites: {
    backgroundColor: "#FB7508",
    margin: 20,
  },
});
