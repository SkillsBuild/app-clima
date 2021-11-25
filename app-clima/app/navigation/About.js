import React from "react";
import {View, Text, StyleSheet} from "react-native"

export default function About(){
    return(
        <View style = {style.whoarewe}>
            <Text style={style.underlined}>Grupo No. 15</Text>
            <Text> Nuestro equipo esta formado por:  </Text>
            <Text>  - Federico Fukushima  </Text>
            <Text>  - Eliana Rios  </Text>
            <Text>  - Marilyn Romero </Text>
            <Text>  - Martin Leg </Text>

            <Text>La Aplicacion esta desarrollada en <Text style={style.black}> React Native </Text>. </Text>
            <Text>

            </Text>
            
            <Text>Para aprender, se tomo como base el curso de react native provisto por la plataforma SkillBuilds de IBM.</Text>

            <Text>En la aplicacion de la plataforma, el usuario agrega restaurantes, pero en nuestra App, agregamos ciudades y mostramos la temperatura actual.</Text>
        
            <Text>Para ello, consultamos una API brindada por el sitio: <Text style = {style.underlined}> https://home.openweathermap.org</Text>

            </Text>
            <Text>Tambien usamos <Text style={style.black}> React Navigation </Text>para desplazarnos entre las diferentes pantallas, <Text style={style.black}>Firebase</Text> como base de datos para guardar las ciudades y <Text style={style.black}> Expo </Text> para poder ir viendo los resultados en un emulador o en el celular, en nuestro caso, con sistema operativo Android</Text>
            <Text>

            </Text>
            
            <Text>El trabajo fue en equipo, dividiendonos las tareas y ayudandonos cuando alguno encontraba alguna dificultad. </Text>

            <Text>

            </Text>
            <Text>Consideramos que fue una gran experiencia, donde pudimos aprender a trabajar en equipo, conocer nuestras fortalezas y debilidades y aprender a delegar y confiar en el trabajo del otro.

            </Text>

        </View>
    )
}

const style = StyleSheet.create({
    whoarewe:{
        padding:20,

    },
    black:{
        fontStyle:"italic",
        fontWeight:"bold",
    },
    underlined: {
        textDecorationLine:"underline",
        fontWeight: "bold",
    },
    bolded:{
        fontWeight: "bold",
    }
}) 