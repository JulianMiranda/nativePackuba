import React, {useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import Authenticated from './src/Screens/Login/Auth';
import PhoneNumber from './src/Screens/Login/EnterPhone';
import VerifyCode from './src/Screens/Login/EnterCode';

export default function App() {
  const [confirm, setConfirm] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState(false);

  async function signIn(phoneNumber: any) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      Alert.alert(error);
    }
  }
  // auth().signOut();

  async function confirmVerificationCode(code: any) {
    try {
      await confirm.confirm(code);
      setConfirm(null);
    } catch (error) {
      Alert.alert('Invalid code');
    }
  }

  auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  if (authenticated) return <Authenticated />;

  if (confirm) return <VerifyCode onSubmit={confirmVerificationCode} />;

  return <PhoneNumber onSubmit={signIn} />;
}
