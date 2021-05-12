import 'react-native-gesture-handler';
import React from 'react';
import {StackNavigator} from './src/navigation/Navigation';
import {AuthProvider} from './src/context/auth/AuthContext';
import {ThemeProvider} from './src/context/theme/ThemeContext';
import {ShopProvider} from './src/context/shop/ShopContext';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const AppState = ({children}: any) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ShopProvider>{children}</ShopProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export const App = () => {
  return (
    <AppState>
      <StackNavigator />
    </AppState>
  );
};
export default App;
