import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Favorite: undefined;
  Player: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type RootDrawerParamList = {
  DrawerHome: undefined;
};

type DrawerNavigationProps = DrawerNavigationProp<RootDrawerParamList>;

export type {RootStackParamList, NavigationProp, DrawerNavigationProps};
