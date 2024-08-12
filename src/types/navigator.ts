import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Favorite: undefined;
  Player: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type {RootStackParamList, NavigationProp};
