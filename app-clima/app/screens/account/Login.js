import React, {useRef} from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import LoginForm from "../../components/account/LoginForm";

export default function Login(){
    const toastRef = useRef();

    //Este componente muestra el formulario de Login y la opcion de Registro

    return(
        <ScrollView >
            <Image
                source={require("../../../assets/img/logo-weatherApp.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef} />
                <CreateAccount />
            </View>
            <Divider style={styles.divider} />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
}

function CreateAccount(){
    const navigation = useNavigation();

    return(
        <Text style={styles.textRegister}>
            ¿Aun no tienes una cuenta?{" "}
            <Text
                onPress={() => navigation.navigate("register")} 
                style={styles.btnRegister}
            >
                Regístrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40,
        backgroundColor: '#FFFFFF',
    },
    textRegister: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    btnRegister: {
        color: "#1190CB",
        fontWeight: "bold",
    },
    divider: {
        backgroundColor: "#1190CB",
        margin: 40,
    }
})