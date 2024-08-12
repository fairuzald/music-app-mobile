import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

type ThemeState = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
  loadTheme: () => void;
};

const useThemeStore = create<ThemeState>(set => ({
  isDarkMode: false,

  // Function to directly set the dark mode state
  setDarkMode: (value: boolean) => {
    set({isDarkMode: value});
    AsyncStorage.setItem('isDarkMode', JSON.stringify(value));
  },

  // Function to toggle the dark mode state
  toggleDarkMode: () =>
    set(state => {
      const newIsDarkMode = !state.isDarkMode;
      AsyncStorage.setItem('isDarkMode', JSON.stringify(newIsDarkMode));
      return {isDarkMode: newIsDarkMode};
    }),

  // Function to load the theme from AsyncStorage
  loadTheme: async () => {
    try {
      const isDarkMode = await AsyncStorage.getItem('isDarkMode');
      if (isDarkMode !== null) {
        set({isDarkMode: JSON.parse(isDarkMode)});
      }
    } catch (e) {
      console.error('Failed to load theme:', e);
    }
  },
}));

export default useThemeStore;
