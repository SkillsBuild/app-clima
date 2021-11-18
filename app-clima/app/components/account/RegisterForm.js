import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

import Loading from "../Loading";
import {validateEmail} from "../../utils/validations"

export default function RegisterForm(props){
    const { toastRef } = props
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValue())
    const {loading, setLoading} = useState(false);
    
    const navigation = useNavigation();

    const onSubmit = () => {
        if(
            isEmpty(formData.email) || 
            isEmpty(formData.password) || 
            isEmpty(formData.repeatPassword)
        ) {
            toastRef.current.show("Todos los campos son obligatorios")
        } else if ( !validateEmail(formData.email) ) {
            toastRef.current.show("El email no es correcto")
        } else if (formData.password !== formData.repeatPassword) {
            toastRef.current.show("Las contraseñas deben ser iguales")
        } else if (size(formData.password) < 6){
            toastRef.current.show("La contraseña debe tener al menos 6 caracteres")
        } else {
            //setLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then( () => {
                    //setLoading(false);
                    navigation.navigate("account");
                })
                .catch( () => {
                    //setLoading(false);
                    toastRef.current.show("Ya existe una cuenta registrada con ese email, pruebe con otro")
                })
        }
    }

    const onChange = (event, type) => {
        setFormData({ ...formData, [type]: event.nativeEvent.text })
    }

    return(
        <View style={styles.formContainer}>
            <Input 
                placeholder="Correo Electronico"
                containerStyle={styles.inputForm}
                onChange={event => onChange(event, "email")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input 
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showPassword ? false : true }
                onChange={event => onChange(event, "password")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={ () => setShowPassword(!showPassword) }
                    />
                }
            />
            <Input 
                placeholder="Repetir Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={showRepeatPassword ? false : true }
                onChange={event => onChange(event, "repeatPassword")}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={ () => setShowRepeatPassword(!showRepeatPassword) }
                    />
                }
            />

            <Button
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={ onSubmit }
            />
            {/* <Loading isVisible={loading} text="Creando cuenta" /> */}
        </View>
    )
}

function defaultFormValue(){
    return{
        email: "",
        password: "",
        repeatPassword: ""
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    btnContainerRegister: {
        marginTop: 20,
        width: "95%",
    },
    btnRegister: {
        backgroundColor: "#1190CB",
    },
    iconRight: {
        color: "#c1c1c1",
    }
})