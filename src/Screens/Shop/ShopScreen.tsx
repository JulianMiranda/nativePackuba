import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SingleSubcategory} from '../../components/SingleSubcategory';
import {ShopContext} from '../../context/shop/ShopContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {HeaderTable} from '../../components/HeaderTable';
import LinearGradient from 'react-native-linear-gradient';
import {formatToCurrency} from '../../utils/formatToCurrency';

export const ShopScreen = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const color = colors.primary;
  const {top} = useSafeAreaInsets();

  const {car, message, emptyCar, makeShop, removeAlert} =
    useContext(ShopContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    car.forEach(function (item) {
      const valor = item.cantidad * item.subcategory.price;
      total += valor;
    });
    setTotal(total);
  }, [car]);

  const makeShopFunction = () => {
    makeShop(total);
  };

  const emptyCarConfirm = () => {
    Alert.alert(
      'Vaciar carrito',
      '¿Estás seguro que deseas vaciar el carrito?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'destructive',
        },
        {
          text: 'Sí',
          onPress: () => emptyCar(),
        },
      ],
    );
  };

  useEffect(() => {
    if (message.length === 0) return;

    Alert.alert('Paso obligatorio', message, [
      {
        text: 'No',
        onPress: removeAlert,
        style: 'destructive',
      },
      {
        text: 'Sí',
        onPress: () => {
          removeAlert();
          Linking.openURL(
            'http://api.whatsapp.com/send?text=Este es un mensaje predetermidado&phone=+593995687985',
          );
        },
      },
    ]);
  }, [message]);

  return (
    <>
      <ScrollView style={{flex: 1}}>
        {/* Heade Containerr */}
        <View
          style={{
            ...styles.headerContainer,
            overflow: 'hidden',
            /* 	backgroundColor: color */
          }}>
          <LinearGradient
            style={{
              flex: 1,
              width: '100%',
            }}
            //start={{x: 0.5, y: 0.0}}
            //end={{x: 0.1, y: 0.2}}
            //colors={['#4c669f', '#3b5998', '#192f6a']}
            colors={[color, '#f7baba']}>
            <Text
              style={{
                ...styles.titleList,
                top: top + 40,
              }}>
              Mi Compra
            </Text>
          </LinearGradient>
        </View>

        {/* Detalles y Loading */}
        {/*  <Text style={styles.tableTitle}>Productos</Text> */}
        <View style={{marginLeft: 7, marginTop: 20}}>
          <View>
            <HeaderTable editHeader={'Quitar'} />
          </View>
          {car.map((item, index) => (
            <SingleSubcategory
              key={index.toString()}
              item={item.subcategory}
              root={'Shop'}
            />
          ))}

          {car.length < 1 ? (
            <Text
              style={{
                marginTop: 30,
                marginLeft: 10,
                fontSize: 22,
                fontWeight: '400',
                fontFamily: 'NovaSlim-Regular',
              }}>
              Carrito vacío 😦
            </Text>
          ) : (
            <>
              {/* <Text
                style={{
                  marginTop: 50,
                  marginLeft: 10,
                  fontSize: 22,
                  fontWeight: '400',
                }}>
                Costo de envío: 17.60$
              </Text> */}
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginTop: 30,
                    marginLeft: 10,
                    fontSize: 26,
                    fontWeight: '400',
                    fontFamily: 'NovaSlim-Regular',
                  }}>
                  Valor total:
                </Text>
                <Text
                  style={{
                    marginTop: 30,
                    marginLeft: 10,
                    fontSize: 26,
                    fontWeight: '600' /* 
                    textDecorationLine: 'underline', */,
                    fontFamily: 'NovaSlim-Regular',
                  }}>
                  {formatToCurrency(total)}
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.emptyButton}>
        <TouchableOpacity onPress={emptyCarConfirm}>
          <Text style={{color: colors.primary, fontFamily: 'NovaSlim-Regular'}}>
            Vaciar Carrito
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{...styles.shopButton, backgroundColor: colors.primary}}>
        <TouchableOpacity
          activeOpacity={car.length < 1 ? 1 : 0.8}
          onPress={car.length < 1 ? () => {} : makeShopFunction}>
          <Text style={{color: 'white', fontFamily: 'NovaSlim-Regular'}}>
            Realizar Compra
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 170,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: Platform.OS === 'ios' ? 1000 : 100,
    borderBottomLeftRadius: 0,
  },

  titleList: {
    color: 'white',
    fontFamily: 'NovaSlim-Regular',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 70,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '300',
    marginVertical: 3,
  },
  shopButton: {
    position: 'absolute',
    zIndex: 99999,
    bottom: 75,
    right: 50,
    alignContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 60,
  },
  emptyButton: {
    position: 'absolute',
    bottom: 75,
    zIndex: 99999,
    left: 50,
    alignContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeebeb',
    padding: 10,
    borderRadius: 60,
  },
  tableTitle: {
    marginTop: 30,
    marginBottom: 15,
    marginLeft: 10,
    fontSize: 26,
    fontWeight: '600',
  },
});
