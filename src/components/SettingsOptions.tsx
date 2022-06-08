import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../context/auth/AuthContext';
import {ShopContext} from '../context/shop/ShopContext';
import {ModalComponent} from './ModalComponent';

type Key =
  | 'historial'
  | 'whatsapp'
  | 'logout'
  | 'about'
  | 'radar'
  | 'app'
  | 'money'
  | 'prices'
  | 'token';

export default function SettingsOptions() {
  const navigation = useNavigation();
  const {user, logOut, setMoney} = useContext(AuthContext);
  const {emptyCar} = useContext(ShopContext);

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [handleOpt, setHandleOpt] = useState(0);

  const confirmModal = () => {
    switch (handleOpt) {
      case 0:
        closeSesion();
        break;
      case 1:
        redirectWhatsapp();
        break;
      case 2:
        redirectCorreo();
        break;
      default:
        break;
    }
  };

  const closeSesion = async () => {
    setOpenModal(false);
    await emptyCar();
    logOut();
  };

  const redirectWhatsapp = () => {
    setOpenModal(false);
    Linking.openURL(
      'http://api.whatsapp.com/send?text=Hola 📦 *baría*, me podría ayudar?&phone=+593995687985',
    );
  };

  const redirectCorreo = () => {
    setOpenModal(false);
    Linking.openURL('https://www.correos.cu/rastreador-de-envios/');
  };

  const sinOut = () => {
    setHandleOpt(0);
    setTitle('Cerrar sesión');
    setBody('¿Deseas cerrar sesión?');
    setOpenModal(true);
  };

  const rastrearCompra = () => {
    setHandleOpt(2);
    setTitle('Rastrear mi Compra');
    setBody('¿Desea visitar Correos de Cuba?');
    setOpenModal(true);
  };

  const irWhatsApp = () => {
    setHandleOpt(1);
    setTitle('Contáctanos vía WhatsApp');
    setBody('¿Necesita ayuda de baría?');
    setOpenModal(true);
  };
  const selectedComponent = (key: Key) => {
    switch (key) {
      case 'token':
        navigation.navigate('NotificationScreen');
        break;
      case 'prices':
        navigation.navigate('PricesScreen');
        break;
      case 'about':
        navigation.navigate('TandCScreen');
        break;
      case 'app':
        navigation.navigate('AppScreen');
        break;
      case 'whatsapp':
        irWhatsApp();

        break;
      case 'radar':
        //navigation.navigate('TrackScreen');
        rastrearCompra();
        break;

      case 'money':
        setMoney();
        break;

      case 'logout':
        sinOut();
        break;
    }
  };
  const menuOptions = generateOptions(selectedComponent);

  return (
    <ScrollView>
      {menuOptions.map((menu, index) => (
        <View key={index.toString()}>
          <View
            style={{
              height: 1,
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#f1f1f1',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              marginLeft: 10,
            }}>
            <Icon name={menu.iconNameLeft} color={menu.color} size={28} />
            <TouchableOpacity
              onPress={menu.onPress}
              style={{
                width: '80%',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '500',
                  color: '#615e5e',
                }}>
                {menu.title}
              </Text>
            </TouchableOpacity>
            {menu.iconNameLeft !== 'power' && (
              <TouchableOpacity
                onPress={menu.onPress}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                  name={menu.iconNameRight}
                  color="#ccc"
                  size={menu.iconSizeRight}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
      <ModalComponent
        isLoading={false}
        title={title}
        body={body}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
      />
    </ScrollView>
  );
}

function generateOptions(selectedComponent: any) {
  return [
    {
      title: 'Precios envíos',
      iconType: 'material-community',
      iconNameLeft: 'cube-send',
      iconNameRight: 'chevron-right',
      iconSizeRight: 32,
      color: '#EE23C0',
      onPress: () => selectedComponent('prices'),
    },
    {
      title: 'Notificaciones',
      iconType: 'material-community',
      iconNameLeft: 'bell',
      iconNameRight: 'chevron-right',
      iconSizeRight: 32,
      color: '#FF2E00',
      onPress: () => selectedComponent('token'),
    },
    {
      title: 'Rastrear mi compra',
      iconType: 'material-community',
      iconNameLeft: 'radar',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#000000',
      onPress: () => selectedComponent('radar'),
    },
    {
      title: 'Acerca de la aplicacón',
      iconType: 'material-community',
      iconNameLeft: 'google-play',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('app'),
    },
    {
      title: 'Información al comprar',
      iconType: 'material-community',
      iconNameLeft: 'shield-star-outline',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#b621e4',
      onPress: () => selectedComponent('about'),
    },
    {
      title: 'Contáctanos vía WhatsApp',
      iconType: 'material-community',
      iconNameLeft: 'whatsapp',
      iconNameRight: 'arrow-top-right',
      iconSizeRight: 26,
      color: '#21e462',
      onPress: () => selectedComponent('whatsapp'),
    },

    /* {
      title: 'Enviar dinero',
      iconType: 'material-community',
      iconNameLeft: 'currency-usd',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#008d0c',
      onPress: () => selectedComponent('money'),
    }, */

    {
      title: 'Cerrar sesión',
      iconType: 'material-community',
      iconNameLeft: 'power',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#fa1818',
      onPress: () => selectedComponent('logout'),
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
});
