import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Pressable,  Image, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import SplashScreen from 'react-native-splash-screen';
import {TopScreen} from '../../components/TopScreen';
import { TandC } from '../../components/TandC';
import { useAnimation } from '../../hooks/useAnimation';
import { AboutApp } from '../../components/AboutApp';

export const InfoScreen = () => {
  const navigation = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
 const {opacity,position,startMovingPosition, fadeIn, fadeOut}= useAnimation()
  const colorsBG = ['#2684FD', '#bae6f7'];
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [open, setOpen] = useState(0);


  return (
    <>
     
      <TopScreen
        colors={colorsBG}
        text={`Bienvenido\n `}
        backButton={false}
        height={210}
      />
{/* <Image
				source={require('../../assets/avion.jpg')}
				style={{height: 170, width: 170, alignSelf: 'center', position: 'absolute', top: 10, right: 10}}
			/> */}
      <View
        style={{position: 'absolute', top: 85, right: 80, zIndex: 9999999}}>
         

       {/*  <LogoColors /> */}
      </View>
      <View style={{flex:1, justifyContent: 'center'}}>
      {open !== 2 && 
      <>
      <Animated.View
      style={{
        backgroundColor: '#ffffff',
       /* 
        opacity, */
        transform:[{
          translateY: position,
        }]
      }}
      >
    
      <Pressable
        style={{...styles.button, ...styles.buttonOpen, backgroundColor: colors.card}}
        onPress={() => {
          if(showText1){
            startMovingPosition(-50,0); 
            setShowText1(!showText1);
            setOpen(0);
          } else {
            startMovingPosition(-50,-100);
            setShowText1(!showText1);
            setOpen(1);
          }
         }}
      >
        <Text style={styles.textStyle}>{showText1 ? '-    ' : '+    '}Qué debe saber usted antes de la compra</Text>
      </Pressable>
      </Animated.View>
      </>
      }
      {open !== 1 && 
      
      <Animated.View
      style={{
        backgroundColor: '#ffffff',
       /* 
        opacity, */
        transform:[{
          translateY: position,
        }]
      }}
      >
      <Pressable
        style={{...styles.button, ...styles.buttonOpen, backgroundColor: colors.card}}
        onPress={() => {if(showText2){
          startMovingPosition(-50,0); 
          setShowText2(!showText2);
          setOpen(0);
        } else {
          startMovingPosition(0,-100);
          setShowText2(!showText2);
          setOpen(2);
        }
      }}
      >
        <Text style={styles.textStyle}>{showText2 ? '-    ' : '+    '}Acerca de nuestra aplicacón</Text>
      </Pressable>
      </Animated.View>
      }
      </View>
      <View style={styles.container}>
        {open === 0 && <Image
				source={require('../../assets/logo_splash.png')}
				style={{height: 200, width: 270, alignSelf: 'center', marginTop: 50}}
			/>}
    {showText1 && (
      <View style={{marginTop: -190}}>
        <TandC/>
        </View>
      )}
    {showText2 && (
      <View style={{marginTop: -190}}>
        <AboutApp/>
        </View>
      )}
       
      </View>
      <TouchableOpacity
        style={{...styles.button, backgroundColor: '#b80204', marginTop: 1, marginBottom: 15}}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('EnterPhoneScreen')}>
        <Text style={styles.textButton}>Comenzar</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
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
    /* position: 'absolute',
    bottom: 10, */
    marginTop: 50,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  
  buttonOpen: {
    backgroundColor: "#b80204",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    fontFamily: 'NovaSlim-Regular',
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontFamily: 'NovaSlim-Regular',
    margin: 100,
    marginBottom: 30,
    textAlign: "center"
  }
});
