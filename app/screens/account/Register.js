import React, { useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';

import RegisterForm from '../../components/account/RegisterForm';

export default function Register() {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require('../../../assets/imagenes/login_logo.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
      </View>

      <View>
        <Image
          source={require('../../../assets/imagenes/register_background.png')}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <Toast ref={toastRef} position="center" opcaity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%",
  },
  logo: {
    width: '100%',
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
