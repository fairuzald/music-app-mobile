import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {iconSizes, spacing} from '../constants/dimensions';
import {useNavigation, useTheme} from '@react-navigation/native';
import type {CustomTheme} from '../types/themes';
import {DrawerNavigationProps} from '../types/navigator';

const Header = () => {
  // Accessing the current theme colors and navigation functions
  const {colors} = useTheme() as CustomTheme;
  const navigation = useNavigation<DrawerNavigationProps>();

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
      <TouchableOpacity>
        <AntDesign
          name="search1"
          color={colors.iconPrimary}
          size={iconSizes.md}
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
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
});
