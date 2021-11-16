import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import FavoritesStack from "./FavoritesStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";
import CitiesStack from "./CitiesStack";


const Tab = createBottomTabNavigator();


export default function Navigation(){
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName= "account"
                tabBarOptions= {{
                    inactiveTintColor: "#646464",
                    activeTintColor: "#00a680"
                }}
                screenOptions={ ({route}) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                }) }
            >
                <Tab.Screen 
                    name="cities" 
                    component={CitiesStack} 
                    options= {{ title: "Ciudades" }}
                />

                <Tab.Screen 
                    name="favorites" 
                    component={FavoritesStack} 
                    options= {{ title: "Favoritos" }}
                />
                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options= {{ title: "Búsqueda" }}
                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options= {{ title: "Mi cuenta" }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions(route,color) {
    let iconName;

    switch (route.name) {
        case "favorites":
            iconName = "heart-outline";
            break;
        case "search":
            iconName = "google-maps";
            break;
        case "account":
            iconName = "home-outline";
        default:
            break;
    }
    return(
        <Icon type="material-community" name={iconName} size={22} color={color} />
    )
}