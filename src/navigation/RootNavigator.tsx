import React from 'react';
import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import { RootDrawerParamList, Theme } from '../types/interfaces';
import SettingsScreen from '../screens/Settings';
import MainNavigator from './MainNavigator';
import { useSelector } from 'react-redux';

const lightTheme: Theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    background: '#b3b3b3',
    background2: '#fff',
    background3: '#fff',
    iconColor: '#000',
    textColor1: '#000',
    textColor2: '#575757',
  },
};

const darkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    background: '#3f3f3f',
    background2: '#000',
    background3: '#000',
    iconColor: '#fff',
    textColor1: '#fff',
    textColor2: '#adadad',
  },
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const RootNavigator = () => {
  const settingsReducer = useSelector((state: any) => state.settingsReducer);

  return (
    <PaperProvider theme={settingsReducer.theme === 'light' ? lightTheme : darkTheme}>
      <Drawer.Navigator
        screenOptions={({ route }): DrawerNavigationOptions => ({
          drawerStyle: {
            backgroundColor:
              settingsReducer.theme === 'light'
                ? lightTheme.colors.background2
                : darkTheme.colors.background2,
          },
          drawerLabelStyle: {
            color:
              settingsReducer.theme === 'light'
                ? lightTheme.colors.textColor1
                : darkTheme.colors.textColor1,
          },
        })}>
        <Drawer.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </PaperProvider>
  );
};

export default RootNavigator;
