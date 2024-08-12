import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {fonts, iconSizes, spacing} from '../constants/dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {fontFamilies} from '../constants/fonts';
import type {CustomTheme} from '../types/themes';
import {useTheme} from '@react-navigation/native';
import useThemeStore from '../store/themeStore';

const CloseIcon = ({color}: {color: string}) => (
  <AntDesign name="close" color={color} size={iconSizes.lg} />
);

const ToggleDarkModeIcon = ({
  isDarkMode,
  color,
}: {
  isDarkMode: boolean;
  color: string;
}) => (
  <Octicons
    name={isDarkMode ? 'sun' : 'moon'}
    color={color}
    size={iconSizes.lg}
  />
);

const HomeIcon = ({color}: {color: string}) => (
  <AntDesign name="home" color={color} size={iconSizes.md} />
);

// const ProfileIcon = ({color}: {color: string}) => (
//   <AntDesign name="user" color={color} size={iconSizes.md} />
// );

const FavoriteIcon = ({color}: {color: string}) => (
  <AntDesign name="hearto" color={color} size={iconSizes.md} />
);

// const LanguageIcon = ({color}: {color: string}) => (
//   <AntDesign name="earth" color={color} size={iconSizes.md} />
// );
// const ContactIcon = ({color}: {color: string}) => (
//   <AntDesign name="contacts" color={color} size={iconSizes.md} />
// );

// const FAQIcon = ({color}: {color: string}) => (
//   <AntDesign name="questioncircleo" color={color} size={iconSizes.md} />
// );

// const SettingsIcon = ({color}: {color: string}) => (
//   <AntDesign name="setting" color={color} size={iconSizes.md} />
// );

const Navbar: React.FC<DrawerContentComponentProps> = props => {
  const {colors} = useTheme() as CustomTheme;
  const {isDarkMode, toggleDarkMode} = useThemeStore();

  return (
    <DrawerContentScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <CloseIcon color={colors.iconPrimary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDarkMode}>
          <ToggleDarkModeIcon
            isDarkMode={!!isDarkMode}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Menu items */}
      <View style={styles.drawerItem}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
          labelStyle={[styles.textDrawer, {color: colors.textPrimary}]}
          icon={() => <HomeIcon color={colors.iconSecondary} />}
        />
        {/* <DrawerItem
          label="Profile"
          onPress={() => props.navigation.navigate('Profile')}
          labelStyle={[styles.textDrawer, {color: colors.textPrimary}]}
          icon={() => <ProfileIcon color={colors.iconSecondary} />}
        /> */}
        <DrawerItem
          label="Favorited Songs"
          onPress={() => props.navigation.navigate('Favorite')}
          labelStyle={[styles.textDrawer, {color: colors.textPrimary}]}
          icon={() => <FavoriteIcon color={colors.iconSecondary} />}
        />
        {/* <DrawerItem
          label="Language"
          onPress={() => props.navigation.navigate('Language')}
          labelStyle={[styles.textDrawer, {color: colors.textPrimary}]}
          icon={() => <LanguageIcon color={colors.iconSecondary} />}
        />
        <DrawerItem
          label="Contact"
          onPress={() => props.navigation.navigate('Contact')}
          labelStyle={[styles.textDrawer, {color: colors.textPrimary}]}
          icon={() => <ContactIcon color={colors.iconSecondary} />}
        />
        <DrawerItem
          label="FAQ"
          onPress={() => props.navigation.navigate('FAQ')}
          labelStyle={[styles.textDrawer, {color: colors.textPrimary}]}
          icon={() => <FAQIcon color={colors.iconSecondary} />}
        />

        <DrawerItem
          label="Settings"
          onPress={() => props.navigation.navigate('Settings')}
          labelStyle={[styles.textDrawer, {color: colors.textPrimary}]}
          icon={() => <SettingsIcon color={colors.iconSecondary} />}
        /> */}
      </View>
    </DrawerContentScrollView>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerItem: {
    marginVertical: spacing.md,
  },
  textDrawer: {
    fontSize: fonts.md,
    fontFamily: fontFamilies.medium,
  },
});
