import React, {Component} from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Text, Card, Divider } from "react-native-elements";


const ForecastCard = () => {
    return (
        <View>
            <Text>Forecast card</Text>
        </View>
    );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    cardConteiner: {
        width: deviceWidth -25, 
        backgroundColor: "#4485f4",
        height: 200,
        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,

    },
});


export default ForecastCard;