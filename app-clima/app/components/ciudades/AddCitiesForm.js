import React, {useState, useEffect} from "react";
import { StyleSheet, View, ScrollView} from "react-native"
import { Input, Image, Button } from "react-native-elements";
import * as Location from 'expo-location';
import Toast from "react-native-easy-toast";
import MapView from "react-native-maps";

import Modal from "../Modal";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function AddCitiesForm(props){
    const {toastRef, setIsLoading, navigation} = props
    const [cityName, setCityName] = useState("")
    const [cityAddress, setCityAddress] = useState("")
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationCity, setLocationCity] = useState(null);
    

    const addCity = () => {
        //Este metodo permite guardar una ciudad en la base de datos
        if(!cityName && !cityAddress){
            toastRef.current.show("Todos los campos deben ser completados")
        } else if(!locationCity){
            toastRef.current.show("Tienes que seleccionar la ciudad en el mapa")
        } else {
            setIsLoading(true)
            db.collection("cities")
                .add({
                    name: cityName,
                    address: cityAddress,
                    location: locationCity,
                    createAt: new Date(),
                    createBy: firebase.auth().currentUser.uid,
                })
                .then(() => {
                    setIsLoading(false)
                    navigation.navigate("cities")
                })
                .catch(() => {
                    setIsLoading(false)
                    toastRef.current.show("Error al guardar la ciudad")
                })
        }
    }


    return(
        <ScrollView styles={styles.scrollView}>
            <FormAdd
                setCityName={setCityName}
                setCityAddress={setCityAddress}
                setIsVisibleMap={setIsVisibleMap}
                locationCity={locationCity}
                cityAddress={cityAddress}
                cityName={cityName}
            />
            <Button
                title="Crear Ciudad"
                onPress={addCity}
                buttonStyle={styles.btnAddCity}
            />
            <Map
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationCity={setLocationCity}
                toastRef={toastRef}
                setCityAddress={setCityAddress}
                setCityName={setCityName}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>

    )
}

function FormAdd(props){
    //Funcion que muestra el formulario para agregar una ciudad
    const {setCityName, setCityAddress, setIsVisibleMap, locationCity, cityName, cityAddress} = props


    return (
        <View style={styles.viewForm}>
            <Image
                source={require("../../../assets/img/logo-weatherApp.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <Input
                placeholder="Nombre de la ciudad"
                containerStyle={styles.input}
                onChange={ event => setCityName(event.nativeEvent.text)}
                value={cityName}
            />
            <Input
                placeholder="Domicilio"
                containerStyle={styles.input}
                onChange= {event => setCityAddress(event.nativeEvent.text)}
                value={cityAddress}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationCity ? "#00a680" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            
        </View>
    )
}

function Map(props){
    const {
        isVisibleMap, 
        setIsVisibleMap, 
        toastRef,
        setLocationCity,
        setCityAddress,
        setCityName} = props
    const [location, setLocation] = useState(null)

    /* Esta funcion permite ver la geolocalizacion del usuario, el cual podrá moverse por el mapa
    y luego guardar la posicion final*/
    
    useEffect(() => {
        (async () => {
            const resultPermission = await Location.requestForegroundPermissionsAsync()

            const statusPermission = resultPermission.status;

            if(statusPermission !== "granted") {
                toastRef.current.show("Tienes que aceptar los permisos de localización.", 3000)
            } else {
                
                const loc = await Location.getCurrentPositionAsync({})

                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                })
                
                
            }
        })()
    }, [])
    
    const confirmLocation = async () => {
        /*Este metodo guarda los datos de localizacion y region, de acuerdo a la ubicación seleccionada
         en el mapa, en nuestras variables de estado. Luego en el método "addCity" se envian a la db*/
        const locationReverseGeocode = await Location.reverseGeocodeAsync(location)
        const locationReverse = locationReverseGeocode[0]

        if (locationReverse.city){
            setCityName(locationReverse.city)
        }
        
        setCityAddress(locationReverse.street)

        setCityRegion(locationReverse.region)

        setLocationCity(location)
        toastRef.current.show("Localización guardada con éxito")
        setIsVisibleMap(false)
    }

    return(
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={styles.mapStyle}
                        provider={MapView.PROVIDER_GOOGLE}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={ (region) => setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar ubicación"
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={confirmLocation}
                    />
                    <Button
                        title="Cancelar ubicación" 
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    scrollView: {
        height: "100%"
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        marginBottom: 10
    },
    btnAddCity: {
        backgroundColor: "#1190CB",
        margin: 20,
        // fontWeight: "bold",
    },
    viewMap: {
        height: "100%"
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
        paddingRight: 5
    },
    viewMapBtnSave: {
        backgroundColor: "#00a680",
    }
})