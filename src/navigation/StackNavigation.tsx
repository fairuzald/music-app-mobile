import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import FavoriteScreen from '../screen/FavoriteScreen';
import PlayerScreen from '../screen/PlayerScreen';
import AllSongScreen from '../screen/AllSongScreen';

type RootStackParamList = {
  Home: undefined;
  Favorite: undefined;
  Player: undefined;
  AllSongs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
      <Stack.Screen name="AllSongs" component={AllSongScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
