import React, {useContext, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {loginStyles} from '../../styles/loginTheme';

export default function Name() {
  const {signUpPhone} = useContext(AuthContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const [name, setName] = useState('');

  return (
    <View style={loginStyles.screen}>
      <Text style={loginStyles.title}>Ayúdanos con tu nombre</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{...loginStyles.inputName, color: 'black'}}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          ...loginStyles.button,
          backgroundColor: name.trim().length > 0 ? colors.card : '#abcffa',
        }}
        onPress={
          name.trim().length > 0 ? () => signUpPhone(name.trim()) : () => {}
        }>
        <Text style={loginStyles.textButton}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
