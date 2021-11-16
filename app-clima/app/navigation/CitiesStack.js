import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Cities from "../screens/cities/Cities"
import AddCities from "../screens/cities/AddCities"
import City from "../screens/cities/City";

const Stack = createStackNavigator();

export default function FavoritesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="cities"
                component={Cities}
                options={ {title: "Ciudades"} }
            />
            <Stack.Screen
                name= "add-cities"
                component={AddCities}
                options= {{title: "Añadir nueva ciudad"}}
            />
            <Stack.Screen
                name= "city"
                component={City}
                
            />
        </Stack.Navigator>
    )
}
