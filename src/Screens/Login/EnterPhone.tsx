import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../context/auth/AuthContext';
import PhoneNumber from './Phone';
import VerifyCode from './Code';
import Name from './Name';
import {Loading} from '../../components/Loading';
import ApiStack from './PhoneOtp';
import api from '../../api/api';
import { Login } from '../../interfaces/Login.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EnterPhoneScreen = () => {
  const {signInPhone, wait} = useContext(AuthContext);
  const [confirm, setConfirm] = useState<any>();
  const [name, setName] = useState(false);
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [reqId, setReqId] = useState('');
  const [number, setNumber] = useState('');
  

  async function signIn(phoneNumber: any) {
    try {
      setIsLoading(true);
      api.get<Login>(
        'generateToken/'+phoneNumber
      ).then(async(resp)=> {
        try {
         if(resp.status === 200){
          setUser(resp.data.user) 
          await AsyncStorage.setItem('token', resp.data.token)}
          if(resp.data.state=== 'Login'){
            signInPhone(resp.data);
          } else{           
            setName(true);
          }
        } catch (error) {
          console.log(error);
          
        }
       
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Alert.alert('Debe ingresar un número válido');
    }
  }

  async function confirmVerificationCode(code: any) {
    try {
      setIsLoading(true);
      ApiStack.verifyOtp(reqId, code).then((resp)=> {
        console.log(resp);
        
        if(resp){
          console.log(resp);
         api.get<Login>(
            'generateToken/'+number
          ).then(async(resp)=> {
            try {
             if(resp.status === 200){
              setUser(resp.data.user) 
              await AsyncStorage.setItem('token', resp.data.token)}
              if(resp.data.state=== 'Login'){
                signInPhone(resp.data);

              } else{               
                setName(true);
              }
            } catch (error) {
              console.log(error);
              
            }
           
          });
          
        } else {
          Alert.alert('El código ingresado no es correcto, por favor verifíquelo');
        }
      }
        )
    
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      Alert.alert('El código ingresado no es correcto');
    }
  }

 

  const showInputPhone = () => {
    setConfirm(null);
  };

  /* if (wait) return <Loading />; */

  if (name) return <Name user={user}/>;

  if (reqId)
    return (
      <VerifyCode
        onSubmit={confirmVerificationCode}
        showInputPhone={showInputPhone}
      />
    );

  return <PhoneNumber onSubmit={signIn} setNumber={setNumber} isLoading={isLoading} />;
};
