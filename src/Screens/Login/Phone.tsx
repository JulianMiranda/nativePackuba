import React, {useContext, useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {loginStyles} from '../../styles/loginTheme';
import CountryPicker from 'react-native-country-picker-modal';

import {CountryCode, Country} from '../../utils/countryTypes';

export default function PhoneNumber(props: any) {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const inputRef = useRef<any>();
  const [phoneNumber, setPhoneNumber] = useState('');

  const onChangePhone = (number: string) => {
    if (inputRef.current.isValidNumber()) {
      inputRef.current.blur();
      setPhoneNumber(number);
      props.setNumber(number);
    }
  };

  const [countryCode, setCountryCode] = useState<CountryCode>('CU');

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    inputRef.current.setValue(country.callingCode[0]);
  };

  return (
    <View style={loginStyles.screen}>
      <Text style={loginStyles.title}>Ingresa tu número de teléfono móvil</Text>
      <View style={{marginLeft: 20, marginRight: 35}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: 'transparent',
              width: '10%',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <CountryPicker
              {...{
                countryCode,
                onSelect,
              }}
              withFilter
              /* renderCountryFilter={placeholder='Buscar'} */
            />
          </View>
          <View
            style={{
              width: '100%',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <PhoneInput
              ref={inputRef}
              onChangePhoneNumber={onChangePhone}
              initialCountry={'cu'}
              textProps={{
                placeholder: '0962914922',
              }}
              flagStyle={loginStyles.flagStyle}
              textStyle={loginStyles.flagInputText}
              style={{height: 45}}
            />
          </View>
        </View>
      </View>
      {props.isLoading ? (
        <View style={{marginTop: 33}}>
          <ActivityIndicator color={colors.card} />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={phoneNumber ? 0.8 : 1}
          style={{
            backgroundColor: phoneNumber ? colors.card : '#abcffa',
            alignSelf: 'center',
            borderRadius: 16,
            marginTop: 30,
          }}
          onPress={phoneNumber ? () => props.onSubmit(phoneNumber) : () => {}}>
          <Text style={loginStyles.textButton}>Enviar código</Text>
        </TouchableOpacity>
      )}

      <Text style={loginStyles.text}>
        Si continúas, es posible que recibas un SMS de verificación. Pueden
        aplicarse las tarifas de mensajes y datos
      </Text>
    </View>
  );
}
