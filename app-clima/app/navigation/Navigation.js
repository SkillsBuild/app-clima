import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import FavoritesStack from "../navigation/FavoritesStack";
import SearchStack from "./SearchStack";


const Tab = createBottomTabNavigator();


export default function Navigation(){
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName= "favorites"
                tabBarOptions= {{
                    inactiveTintColor: "#646464",
                    activeTintColor: "#00a680"
                }}
                screenOptions={ ({route}) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                }) }
            >

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
            iconName = "magnify";
            break;
        default:
            break;
    }
    return(
        <Icon type="material-community" name={iconName} size={22} color={color} />
    )
}