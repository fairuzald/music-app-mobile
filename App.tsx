import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {useSetupTrackPlayer} from './src/hooks/useSetupTrackPlayer';
import useFavoriteStore from './src/store/favoritedStore';
const App = () => {
  const {loadFavorited} = useFavoriteStore();
  useEffect(() => {
    loadFavorited();
  }, [loadFavorited]);

  const onLoad = () => {
    console.log('App loaded');
  };
  useSetupTrackPlayer({
    onLoad,
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
