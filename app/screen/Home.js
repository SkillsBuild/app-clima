import React,{ useState} from "react";
import { View, Text, Image,StyleSheet,Dimensions,StatusBar,SafeAreaView,ScrollView } from "react-native";
import { Button } from "react-native-elements";
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from "@react-navigation/native";


export default function Home() {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get('window');  
  const navigation = useNavigation();
  const setSliderPage = (event: any) => {
  const { currentPage } = sliderState;
  const { x } = event.nativeEvent.contentOffset;
  const indexOfNextScreen = Math.floor(x / width);
    
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}
        >
          <View style={{ width, height }}>
            <Image
              source={require('../../assets/imagenes/avatar1_home.png')}
              resizeMode="contain"
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Busca y visualiza los mejores lugares de
                                            una forma sencilla,</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <Image
              source={require('../../assets/imagenes/avatar2_home.png')}
              resizeMode="contain"
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Ubicate en el mapa y analiza el clima de tus
                                          ciudades favoritas</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <Image
              source={require('../../assets/imagenes/avatar3_home.png')}
              resizeMode="contain"
              style={styles.imageStyle}
            />
            <View style={styles.wrapperBtn}>
              <Text style={styles.header}>Comienza guardando tus ciudades favoritas</Text>
                <View style={styles.viewBtn}>
                  <Button 
                    title="Ir"
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("favorites")}
                    />
                </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(3).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    height: "50%",
    width: '100%',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 10,
    marginLeft: 10,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#FB7508',
    marginLeft: 10,
  },
  wrapperBtn: {
    marginVertical: 50,
  },
  viewBtn: {
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#FB7508",
  },
  btnContainer: {
    height: 30,
    width: "80%",
  }, 
});
