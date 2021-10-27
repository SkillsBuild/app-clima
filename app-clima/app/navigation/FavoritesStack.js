import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Favorites from "../screen/Favorites"

const Stack = createStackNavigator();

export default function FavoritesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="favorites"
                component={Favorites}
                options={ {title: "Playas Favoritas"} }
            />
        </Stack.Navigator>
    )
}

// esto es un comentario 
