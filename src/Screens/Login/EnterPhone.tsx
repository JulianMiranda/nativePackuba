import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../context/auth/AuthContext';
import PhoneNumber from './Phone';
import VerifyCode from './Code';
import Name from './Name';
import {Loading} from '../../components/Loading';

export const EnterPhoneScreen = () => {
  const {signInPhone, wait} = useContext(AuthContext);
  const [confirm, setConfirm] = useState<any>();
  const [name, setName] = useState(false);
  const [user, setUser] = useState<any>();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (authenticated) {
      if (user?.displayName !== null) {
        signInPhone();
      } else {
        setName(true);
      }
    }
  }, [authenticated]);

  async function signIn(phoneNumber: any) {
    try {
      console.log(phoneNumber);

      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

      setConfirm(confirmation);
    } catch (error) {
      console.log(error);

      Alert.alert('Debe ingresar un número válido');
    }
  }

  async function confirmVerificationCode(code: any) {
    try {
      await confirm.confirm(code);
      setConfirm(null);
    } catch (error) {
      Alert.alert('El código que ingresaste no es correcto');
    }
  }

  const showInputPhone = () => {
    setConfirm(null);
  };

  auth().onAuthStateChanged(user => {
    if (user) {
      setUser(user);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  if (wait) return <Loading />;

  if (name) return <Name />;

  if (confirm)
    return (
      <VerifyCode
        onSubmit={confirmVerificationCode}
        showInputPhone={showInputPhone}
      />
    );

  return <PhoneNumber onSubmit={signIn} />;
};
