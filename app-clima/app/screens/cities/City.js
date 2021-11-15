import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from "lodash";
import { ListItem, Icon } from "react-native-elements";
import Toast from "react-native-easy-toast";

import {firebaseApp} from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"

import Loading from '../../components/Loading';
import { ScrollView } from 'react-native-gesture-handler';
import Map from '../../components/Map';
import Favorites from './Cities';

const db = firebase.firestore(firebaseApp)

export default function City(props) {
    const { navigation, route } = props
    const {id, name} = route.params
    const [city, setCity] = useState(null)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const toastRef = useRef()

    navigation.setOptions({ title: name})

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useEffect(() => {
        db.collection("cities")
            .doc(id)
            .get().then( (response) => {
                const data = response.data()
                
                data.id = response.id
                setCity(data)
            })
    }, [])

    useEffect(() => {
        if(userLogged && city){
            db.collection("favorites")
                .where("idCity", "==", city.id)
                .where("idUser", "==", firebase.auth().currentUser.uid)
                .get()
                .then((response) => {
                    if(response.docs.length === 1){
                        setIsFavorite(true)
                    }
                })
        }
    }, [userLogged, city])

    const addFavorite = () => {
        if(!userLogged){
            toastRef.current.show("Debe loguearse antes de agregar una ciudad a favoritos")
        } else {
            const payload = {
                idUser: firebase.auth().currentUser.uid,
                idCity: city.id
            }
            db.collection("favorites")
                .add(payload)
                .then(() => {
                    setIsFavorite(true)
                    toastRef.current.show("Ciudad añadida a favoritos")
                })
                .catch(() => {
                    toastRef.current.show("Error al añadir la ciudad a favoritos")
                })
        }
    }

    const removeFavorite = () => {
        db.collection("favorites")
            .where("idCity", "==", city.id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get()
            .then((response) => {
                response.forEach((doc) => {
                    const idFavorite = doc.id
                    db.collection("favorites")
                        .doc(idFavorite)
                        .delete()
                        .then(() => {
                            setIsFavorite(false)
                            toastRef.current.show("Se ha eliminado la ciudad de la lista de favoritos")
                        })
                        .catch(() => {
                            toastRef.current.show("Error al eliminar la ciudad de la lista de favoritos")
                        })
                })
            })
    }

    if(!city) return <Loading isVisible={true} text="Cargando..." />

    return (
        <ScrollView vertical style={styles.viewBody}>
            <View style={styles.viewFavorite}>
                <Icon
                    type="material-community"
                    name= {isFavorite ? "heart" : "heart-outline"}
                    onPress={isFavorite ? removeFavorite : addFavorite}
                    color= {isFavorite ? "#f00" : "#000" }
                    size={30}
                    underlayColor="transparent"
                />
            </View>
            <TitleCity
                name={city.name}
            />
            <CityInfo
                location={city.location}
                name={city.name}
                address={city.address}
            />
            <Toast
                ref={toastRef} position="center" opacity={0.9}
            />
        </ScrollView>
    )
}

function TitleCity(props) {
    const {name} = props

    return(
        <View style={styles.viewCityTitle}>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.nameCity}> {name} </Text>
            </View>
            {/* description */}
        </View>
    )
}

function CityInfo(props){
    const { location, name, address } = props
    const listInfo = [
        {
            text: address,
            iconName: "map-marker",
            iconType: "material-community",
            action: null,
        },
    ]

    return (
        <View style={styles.viewCityInfo}>
            <Text style={styles.cityInfoTitle}>
                Info sobre city
            </Text>
            <Map location={location} name={name} height={100} />
            
            {map(listInfo, (item, index) => (
                <ListItem
                    key={index}
                    title={item.text}
                    leftIcon={{
                        name: item.iconName,
                        type: item.iconType,
                        color: "#00a680"
                    }}
                    containerStyle={styles.containerListItem}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        backgroundColor: "#fff"
    },
    viewCityTitle: {
        padding: 15
    },
    nameCity: {
        fontSize: 20,
        fontWeight: "bold"
    },
    viewCityInfo: {
        margin: 15,
        marginTop: 25
    },
    cityInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    containerListItem: {
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 1
    },
    viewFavorite: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15,
    }
})
