import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ViewSlider from 'react-native-view-slider';

const { width, height } = Dimensions.get('window');

export default function UserGuest() {
  const navigation = useNavigation();
  return (
    <ScrollView centerContent={'true'} style={{ flex: 1, position:"absolute"}}>
      <ViewSlider
        renderSlides={
          <>
            <View style={{ width, height }}>
              <Image
                source={require('../../../assets/imagenes/avatar1_home.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <View style={{ width, height }}>
              <Image
                source={require('../../../assets/imagenes/avatar2_home.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <View style={{ width, height }}>
              <Image
                source={require('../../../assets/imagenes/avatar3_home.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <View style={{ width, height }}>
              <Image
                source={require('../../../assets/imagenes/avatar4_home.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          </>
        }
        style={styles.slider} //Main slider container style
        height={'40%'} //Height of your slider
        slideCount={4} //How many views you are adding to slide
        dots={true} // Pagination dots visibility true for visibile
        dotActiveColor="#FB7508" //Pagination dot active color
        dotInactiveColor="#fabd8c" // Pagination do inactive color
        autoSlide={true} //The views will slide automatically
        slideInterval={2000} //In Miliseconds
      />
      <Text style={styles.description}>
        Busca y visualiza los mejores lugares de una forma sencilla,
        ubicate en el mapa y analiza el clima de las ciudades que elijas, podrás guardarlas en tu listado de ciudades favoritas. 
      </Text>

      <View style={styles.viewBtn}>
        <Button
          title="Ver tu perfil"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate('login')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  slider: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 300,
    width: '100%',
    marginBottom: 30,
  },
  description: {
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 20,
    padding: 5,
  },
  viewBtn: {
    flex: 1,
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: '#FB7508',
  },
  btnContainer: {
    width: '70%',
  },
});
