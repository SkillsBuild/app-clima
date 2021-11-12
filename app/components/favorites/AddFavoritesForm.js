import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  Text,
} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { map } from "lodash";
import * as Location from 'expo-location';
import MapView from "react-native-maps";
import Modal from "../Modal";

export default function AddFavoritesForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [favoriteName, setFavoriteName] = useState("");
  const [favoriteAdress, setFavoriteAdress] = useState("");
  const [favoriteDescription, setFavoriteDescription] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationFavorite, setLocationFavorite] = useState(null);
  

  const addFavorites = () => {
    if (!favoriteName || !favoriteAdress || !favoriteDescription){
      toastRef.current.show("Todos los campos son obligatorios");
    }else if(!locationFavorite){
      toastRef.current.show("Tienes que ubicar tu lugar favorito en el mapa");
    } else{
        console.log("OK");
    }

  };

  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd
        setFavoriteName={setFavoriteName}
        setFavoriteAdress={setFavoriteAdress}
        setFavoriteDescription={setFavoriteDescription}
        setIsVisibleMap={setIsVisibleMap}
        locationFavorite={locationFavorite}
      />
      <Button
        title="Agregar ciudad favorita"
        onPress={addFavorites}
        buttonStyle={styles.btnAddFavorites}
      />
      <Map 
      isVisibleMap={isVisibleMap} 
      setIsVisibleMap={setIsVisibleMap}
      setLocationFavorite={setLocationFavorite}
      toastRef={toastRef} />
    </ScrollView>
  );
}

function FormAdd(props) {
  const {
    setFavoriteName,
    setFavoriteAdress,
    setFavoriteDescription,
    setIsVisibleMap,
    locationFavorite,
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
          color: locationFavorite ? "#FB7508": "c2c2c2",
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
  const {
    isVisibleMap,
    setIsVisibleMap,
    setLocationFavorite,
    toastRef,
    } = props;
  const [location, setLocation] = useState(null);
 
useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        toastRef.current.show ('Permission to access location was denied', 3000)
      }
          else{
      const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude:loc.coords.latitude,
          longitude:loc.coords.longitude,
          latitudeDelta:0.001,
          longitudeDelta:0.001,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, []);
  const confirmLocation = () => {
    setLocationFavorite(location);
    toastRef.current.show("Ubicación guardada correctamente");
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        { location && (
          <MapView
            style= {styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
            >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
                  }}
              draggable
            />
          </MapView>
          )}  
          <View style= {styles.viewMapBtn}>
            <Button 
              title= "Guardar ubicación"
              containerStyle= {styles.viewMapBtnContainerSave}
              buttonStyle = {styles.viewMapBtnSave}
              onPress={confirmLocation}
            />
            <Button 
                title= "Cancelar ubicación" 
                containerStyle= {styles.viewMapBtnContainerCancel}
                buttonStyle = {styles.viewMapBtnCancel}
                onPress={() => setIsVisibleMap(false)}
            />            
          </View>                
      </View>
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
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680",
  },
});
