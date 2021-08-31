import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Switch, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { toggleTheme } from '../../redux/actions';
import { SettingsScreenProps, Theme } from '../../types/interfaces';
import styles from './styles';

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenProps>();
  const dispatch = useDispatch();
  const { colors } = useTheme() as Theme;
  const settingsReducer = useSelector((state: any) => state.settingsReducer);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    if (settingsReducer.theme === 'dark') {
      setIsSwitchOn(true);
    }
  }, [settingsReducer.theme]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Settings',
      headerTintColor: colors.textColor1,
      headerLeft: () => {
        const toggleMenu = () => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        };
        return (
          <Button onPress={toggleMenu}>
            <Icon name="menu" size={30} color={colors.iconColor} />
          </Button>
        );
      },
      headerStyle: {
        backgroundColor: colors.background3,
      },
    });
  }, [navigation, colors.background3, colors.iconColor, colors.textColor1]);

  const handleTheme = () => {
    setIsSwitchOn(!isSwitchOn);
    dispatch(toggleTheme());
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={styles.switchContainer}>
        <Text style={{ color: colors.textColor1 }}>Toggle theme</Text>
        <Switch value={isSwitchOn} onValueChange={() => handleTheme()} />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
