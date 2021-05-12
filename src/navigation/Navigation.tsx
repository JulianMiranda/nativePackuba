import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; /* 
import SplashScreen from 'react-native-splash-screen'; */
import {ThemeContext} from '../context/theme/ThemeContext';
import {AuthContext} from '../context/auth/AuthContext';
import {Tabs} from './Tabs';
import {EnterPhoneScreen} from '../screens/Login/EnterPhone';
import {InfoScreen} from '../screens/Login/InfoScreen';
import {Loading} from '../components/Loading';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const {status} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  /* useEffect(() => {
    SplashScreen.hide();
  }, []); */
  if (status === 'checking') return <Loading />;
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            /* 	backgroundColor: 'white' */
          },
        }}>
        {status !== 'authenticated' ? (
          <>
            <Stack.Screen name="InfoScreen" component={InfoScreen} />
            <Stack.Screen
              name="EnterPhoneScreen"
              component={EnterPhoneScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Tabs" component={Tabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
  /* </View> */
};
