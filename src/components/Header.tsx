import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {iconSizes, spacing} from '../constants/dimensions';
import {useNavigation, useTheme} from '@react-navigation/native';
import type {CustomTheme} from '../types/themes';
import {DrawerNavigationProps} from '../types/navigator';
import Octicons from 'react-native-vector-icons/Octicons';
import useThemeStore from '../store/themeStore';

const ToggleDarkModeIcon = ({
  isDarkMode,
  color,
}: {
  isDarkMode: boolean;
  color: string;
}) => (
  <Octicons
    name={isDarkMode ? 'moon' : 'sun'}
    size={iconSizes.md}
    color={color}
  />
);

const Header = () => {
  // Accessing the current theme colors and navigation functions
  const {colors} = useTheme() as CustomTheme;
  const navigation = useNavigation<DrawerNavigationProps>();
  const {isDarkMode, toggleDarkMode} = useThemeStore();

  // Function to toggle the drawer menu
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.header}>
      {/* Drawer toggle button */}
      <TouchableOpacity onPress={toggleDrawer}>
        <FontAwesome5
          name="grip-lines"
          color={colors.iconPrimary}
          size={iconSizes.md}
        />
      </TouchableOpacity>

      {/* Search button */}
      <TouchableOpacity onPress={toggleDarkMode}>
        <ToggleDarkModeIcon
          color={colors.iconPrimary}
          isDarkMode={isDarkMode}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    alignItems: 'center',
  },
});
