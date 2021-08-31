import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Theme as PaperTheme } from 'react-native-paper/lib/typescript/types';

type CustomColors = {
  background2: string;
  background3: string;
  iconColor: string;
  textColor1: string;
  textColor2: string;
};

type PaperColors = PaperTheme['colors'];
type Colors = PaperColors & CustomColors;

export interface Theme extends PaperTheme {
  colors: Colors;
}

export type RootDrawerParamList = {
  Main: undefined;
  Settings: undefined;
};

export type BottomNavigatorParamList = {
  AllNotes: undefined;
  ArchivedNotes: undefined;
  FavoriteNotes: undefined;
};

export type MainStackParamList = {
  BottomNavigator: undefined;
  EditNote: { id?: number };
};

export type AllNotesScreenProps = StackNavigationProp<MainStackParamList, 'BottomNavigator'>;
export type EditNoteScreenProps = StackNavigationProp<MainStackParamList, 'EditNote'>;
export type EditNoteScreenRouteProps = RouteProp<MainStackParamList, 'EditNote'>;
export type SettingsScreenProps = DrawerNavigationProp<RootDrawerParamList, 'Settings'>;

export interface TabBarIconProps {
  color?: string;
  focused?: boolean;
  size?: number;
}

export interface Note {
  id?: number;
  title?: string;
  body?: string;
  created_at?: number;
  updated_at?: number;
  is_favorite?: boolean;
  is_archived?: boolean;
}
