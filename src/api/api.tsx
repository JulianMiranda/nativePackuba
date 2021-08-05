import axios from 'axios';
import {getHeaders} from './getHeaders';

import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.200.3:5001/api';
/* const baseURL = 'https://packuba.herokuapp.com/api'; */

const api = axios.create({baseURL});

api.interceptors.request.use(async config => {
 /*  const headers = await getHeaders();
  const token = headers.get('x-token'); */
  
  const token = await AsyncStorage.getItem('token');

  if (token)
    config.headers = {
      'access-control-allow-origin': '*',
      'content-type': 'application/json',
      'x-token': token,
    };

  return config;
});

export default api;
