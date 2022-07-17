import React, {useContext, useEffect} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useShop} from '../hooks/useShop';
import {DetailsShop} from './DetailsShop';

interface Props {
  handleButton: () => void;
}

const {height} = Dimensions.get('window');
export const ShopStepTwo = ({handleButton}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {totalPaqReCalc, cantPaqOS, prices, total, totalMoneyReCalc} =
    useShop();
  return (
    <>
      <View style={{minHeight: height * 0.66}}>
        <DetailsShop
          cantPaqOS={cantPaqOS}
          prices={prices}
          total={total}
          totalPaqReCalc={totalPaqReCalc}
          totalMoneyReCalc={totalMoneyReCalc}
        />
      </View>
      <View style={{}}>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: colors.card,
            marginBottom: Platform.OS === 'ios' ? 30 : 15,
          }}
          activeOpacity={0.8}
          onPress={() => handleButton()}>
          <Text style={styles.buttonText}>Continuar</Text>

          <Icon
            name="arrow-right"
            color="white"
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {position: 'absolute', right: 14, top: 10},
  button: {
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
});
