import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import SplashScreen from 'react-native-splash-screen';
import {TopScreen} from '../../components/TopScreen';
import {LogoColors} from '../../components/LogoColors';

export const InfoScreen = () => {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const colorsBG = ['#2684FD', '#bae6f7'];
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <TopScreen
        colors={colorsBG}
        text={`Bienvenido\n a `}
        backButton={false}
        height={210}
      />
      <View
        style={{position: 'absolute', top: 140, right: 85, zIndex: 9999999}}>
        <LogoColors />
      </View>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Bienvenido a PACKUBA</Text> */}

        <Text style={styles.text}>
        📦 Somos una agencia de compras radicada en Ecuador con destino a Cuba
        </Text>

        <Text style={styles.text}>
        📦 Ofrecemos productos para consumo personal y negocio
        </Text>
        <Text style={styles.text}>
        📦 Toda mercadería a partir de 6 unidades toma un precio por mayor 
        </Text>
      </View>
      <TouchableOpacity
        style={{...styles.button, backgroundColor: colors.card}}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('EnterPhoneScreen')}>
        <Text style={styles.textButton}>Comencemos</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 10,
    marginRight: 10,
  },
  title: {
    fontFamily: 'NovaSlim-Regular',
    fontSize: 28,
    /*  fontWeight: 'bold',
    marginBottom: 25, */
    alignSelf: 'center',
  },
  text: {
    fontSize: 22,
    fontFamily: 'NovaSlim-Regular',
    fontWeight: '300',
    textAlign: 'left',
    marginVertical: 20,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    borderRadius: 6,
  },
  textButton: {
    alignSelf: 'center',
    fontFamily: 'NovaSlim-Regular',
    color: 'white',
    fontSize: 18,
    marginHorizontal: 20,
  },
});
