import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import { AuthProvider } from './src/hooks/auth';
import { AppRoutes } from './src/routes/app.routes';
import { SignIn } from './src/screens/SignIn';

import theme from './src/global/styles/theme';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
