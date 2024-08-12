import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {useSetupTrackPlayer} from './src/hooks/useSetupTrackPlayer';
import useFavoriteStore from './src/store/favoritedStore';
import {darkTheme} from './src/theme/darkTheme';
import useThemeStore from './src/store/themeStore';
import {lightTheme} from './src/theme/lightTheme';
import {useColorScheme} from 'react-native';
const App = () => {
  const {isDarkMode, loadTheme, setDarkMode} = useThemeStore();
  const {loadFavorited} = useFavoriteStore();
  const scheme = useColorScheme();

  useEffect(() => {
    loadFavorited();
  }, [loadFavorited]);

  useEffect(() => {
    loadTheme();
    scheme === 'light' ? setDarkMode(false) : setDarkMode(true);
  }, [loadTheme, scheme, setDarkMode]);

  const onLoad = () => {
    console.log('App loaded');
  };
  useSetupTrackPlayer({
    onLoad,
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
