// app/_layout.tsx
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Appearance } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { useFonts } from 'expo-font';

// NativeBase
import { NativeBaseProvider, extendTheme } from 'native-base';

// Redux
import { Provider } from 'react-redux';
import  store  from '@/store/store';

// Apollo
import { ApolloProvider } from '@apollo/client';
import { client } from '@/graphql/client';

// Hooks e temas
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme'; 

// Detecta tema do sistema para NativeBase
const colorScheme = Appearance.getColorScheme();
const config = {
  useSystemColorMode: false,
  initialColorMode: colorScheme === 'dark' ? 'dark' : 'light',
};
const customTheme = extendTheme({ config });

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const systemColorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Ubuntu: require('../assets/fonts/Ubuntu-Bold.ttf'), 
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={systemColorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <NativeBaseProvider theme={customTheme}>
            <Stack>
              {}  
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </NativeBaseProvider>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
