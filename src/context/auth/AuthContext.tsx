import React, {createContext, useEffect, useReducer} from 'react';

import auth from '@react-native-firebase/auth';
/* import firebase from 'firebase'; */

import {getHeaders} from '../../api/getHeaders';

import api from '../../api/api';
import {User, LoginData, RegisterData} from '../../interfaces/User.interface';

import {authReducer, AuthState} from './authReducer'; /* 
import {registerForPushNotifications} from '../../utils/notificationPermissions'; */

type AuthContextProps = {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  wait: boolean;
  user: User | null;
  errorMessage: string;
  signUpPhone: (name: string) => void;
  signInPhone: () => void;
  logOut: () => void;
  removeError: () => void;
  loginB: () => void;
};

const authInicialState: AuthState = {
  status: 'checking',
  wait: false,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);

  useEffect(() => {
    //auth().signOut();
    checkToken();
  }, []);

  const checkToken = async (isLogin = false) => {
    const headers = await getHeaders();

    // No token, no autenticado
    if (!headers.get('x-token')) return dispatch({type: 'notAuthenticated'});

    // Hay token
    try {
      const resp = await api.get<User>('/login');

      if (resp.status !== 200) {
        return dispatch({type: 'notAuthenticated'});
      }
      /* if (isLogin && resp.data.role === 'JUN') {
				const notificationTokens = await registerForPushNotifications();
				if (notificationTokens !== '')
					api.put(`/users/update/${resp.data.id}`, {
						notificationTokens: [notificationTokens]
					});
			} */
      console.log('aut', resp.data);

      dispatch({
        type: 'signUp',
        payload: {
          user: resp.data,
        },
      });
    } catch (error) {
      return dispatch({type: 'notAuthenticated'});
    }
  };

  const signInPhone = () => {
    try {
      dispatch({type: 'initCheck'});
      checkToken(true);
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: 'Error Catch',
      });
    }
  };

  const signUpPhone = async (name: string) => {
    dispatch({type: 'initCheck'});
    try {
      auth()
        .currentUser?.updateProfile({
          displayName: name.trim(),
        })
        .then(async () => {
          let forceRefresh = true;
          await auth().currentUser?.getIdToken(forceRefresh);

          checkToken(true);
        })
        .catch(() =>
          dispatch({
            type: 'addError',
            payload: 'Error al actualizar nombre',
          }),
        );
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: 'Error al actualizar nombre',
      });
    }
  };

  const loginB = async () => {
    dispatch({type: 'loginB'});
  };

  const logOut = async () => {
    auth().signOut();
    dispatch({type: 'logout'});
  };

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logOut,
        removeError,
        signInPhone,
        signUpPhone,
        loginB,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
