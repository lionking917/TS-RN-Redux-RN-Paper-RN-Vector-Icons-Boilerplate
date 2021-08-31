import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import {
  MainStackParamList,
  BottomNavigatorParamList,
  TabBarIconProps,
  Theme,
} from '../types/interfaces';
import AllNotesScreen from '../screens/AllNotes';
import EditNoteScreen from '../screens/EditNote';

const Tab = createBottomTabNavigator<BottomNavigatorParamList>();

const BottomNavigator = () => {
  const { colors } = useTheme() as Theme;
  return (
    <Tab.Navigator
      initialRouteName="AllNotes"
      backBehavior="initialRoute"
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarLabelStyle: {
          color: colors.textColor1,
        },
        tabBarStyle: {
          backgroundColor: colors.background2,
        },
        tabBarIcon: ({ color, size }: TabBarIconProps) => {
          let iconName = '';

          switch (route.name) {
            case 'AllNotes':
              iconName = 'notes';
              break;
            case 'ArchivedNotes':
              iconName = 'note';
              break;
            case 'FavoriteNotes':
              iconName = 'event-note';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="AllNotes"
        component={AllNotesScreen}
        options={{ tabBarLabel: 'All Notes' }}
      />
      <Tab.Screen
        name="FavoriteNotes"
        component={AllNotesScreen}
        options={{ tabBarLabel: 'Favorite Notes' }}
      />
      <Tab.Screen
        name="ArchivedNotes"
        component={AllNotesScreen}
        options={{ tabBarLabel: 'Archived Notes' }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BottomNavigator">
      <Stack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EditNote" component={EditNoteScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
