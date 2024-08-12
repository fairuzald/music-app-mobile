import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FavoriteScreen from './src/screen/FavoriteScreen';
import PlayerScreen from './src/screen/PlayerScreen';

type RootStackParamList = {
  Home: undefined;
  Favorite: undefined;
  Player: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Favorite" component={FavoriteScreen} />
          <Stack.Screen name="Player" component={PlayerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
