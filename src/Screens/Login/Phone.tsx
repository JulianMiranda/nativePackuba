import React, {useContext, useRef, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {loginStyles} from '../../styles/loginTheme';

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
    }
  };
  return (
    <View style={loginStyles.screen}>
      <Text style={loginStyles.title}>Ingresa tu número de teléfono móvil</Text>
      <View style={{marginLeft: 20, marginRight: 35}}>
        <PhoneInput
          ref={inputRef}
          onChangePhoneNumber={onChangePhone}
          initialCountry={'ec'}
          textProps={{
            placeholder: '0962914922',
          }}
          flagStyle={loginStyles.flagStyle}
          textStyle={loginStyles.flagInputText}
          style={{height: 45}}
        />
      </View>

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
      <Text style={loginStyles.text}>
        Si continúas, es posible que recibas un SMS de verificación. Peden
        aplicarse las tarifas de mensajes y datos
      </Text>
    </View>
  );
}