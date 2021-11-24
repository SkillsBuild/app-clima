import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';

import LoginForm from '../../components/account/LoginForm';

export default function Login() {
  const toastRef = useRef();
  return (
    <ScrollView>
      <Image
        source={require('../../../assets/imagenes/login_logo.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>

      <View style={{ marginTop:60 }}>
        <Image
          source={require('../../../assets/imagenes/login_background.png')}
          resizeMode="cover"
          style={styles.image}
        />
      </View>

      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      ¿Aún no tiene una cuenta?{' '}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate('register')}>
        Regístrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 150,
    marginTop: 20,
  },
  image: {
    height: 200,
    width: "100%",
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: '#FB7508',
    fontWeight: 'bold',
  },
});
