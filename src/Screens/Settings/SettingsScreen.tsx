import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useRef} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
/* import Toast from 'react-native-easy-toast'; */
import InfoUser from '../../components/Account/InfoUser';
import SettingsOptions from '../../components/SettingsOptions';
import {TopScreen} from '../../components/TopScreen';
import {AuthContext} from '../../context/auth/AuthContext';
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props extends StackScreenProps<any, any> {}
export const SettingsScreen = ({navigation}: Props) => {
  const {user, logOut} = useContext(AuthContext);
  const toastRef = useRef();
  const {top} = useSafeAreaInsets();
  /* let toastRef: any; */
  /*  const {
    theme: {colors},
  } = useContext(ThemeContext); */

  const colors = ['#2684FD', '#bae6f7'];

  return (
    <View>
      {/* <InfoUser toastRef={toastRef} /> */}
      <TopScreen
        colors={colors}
        text="Mi Perfil"
        backButton={false}
        height={170}
      />
      <SettingsOptions />

      {/* <Toast ref={toastRef.current} position="center" opacity={0.9} /> */}
    </View>
  );
};
