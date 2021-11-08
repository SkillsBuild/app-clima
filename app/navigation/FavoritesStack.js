import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddFavorites from "../screen/favorites/AddFavorites";

import Favorites from "../screen/favorites/Favorites";

const Stack = createStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorites"
        component={Favorites}
        options={{ title: "Ciudades Favoritas" }}
      />
      <Stack.Screen
        name="add-favorites"
        component={AddFavorites}
        options={{ title: "Añadir ciudades favoritas" }}
      />
    </Stack.Navigator>
  );
}
