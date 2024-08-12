import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {colors} from '../constants/color';
import {fonts, iconSizes, spacing} from '../constants/dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {fontFamilies} from '../constants/fonts';

const CloseIcon = () => (
  <AntDesign name="close" color={colors.iconPrimary} size={iconSizes.lg} />
);

const ToggleDarkModeIcon = ({isDarkMode}: {isDarkMode: boolean}) => (
  <Octicons
    name={isDarkMode ? 'sun' : 'moon'}
    color={colors.iconPrimary}
    size={iconSizes.lg}
  />
);

const HomeIcon = () => (
  <AntDesign name="home" color={colors.iconSecondary} size={iconSizes.md} />
);

const ProfileIcon = () => (
  <AntDesign name="user" color={colors.iconSecondary} size={iconSizes.md} />
);

const FavoriteIcon = () => (
  <AntDesign name="hearto" color={colors.iconSecondary} size={iconSizes.md} />
);

const LanguageIcon = () => (
  <AntDesign name="earth" color={colors.iconSecondary} size={iconSizes.md} />
);
const ContactIcon = () => (
  <AntDesign name="contacts" color={colors.iconSecondary} size={iconSizes.md} />
);

const FAQIcon = () => (
  <AntDesign
    name="questioncircleo"
    color={colors.iconSecondary}
    size={iconSizes.md}
  />
);

const SettingsIcon = () => (
  <AntDesign name="setting" color={colors.iconSecondary} size={iconSizes.md} />
);

const Navbar: React.FC<DrawerContentComponentProps> = props => {
  const isDarkMode = 1;

  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <CloseIcon />
        </TouchableOpacity>
        <TouchableOpacity>
          <ToggleDarkModeIcon isDarkMode={!!isDarkMode} />
        </TouchableOpacity>
      </View>

      {/* Menu items */}
      <View style={styles.drawerItem}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
          labelStyle={styles.textDrawer}
          icon={HomeIcon}
        />
        <DrawerItem
          label="Profile"
          onPress={() => props.navigation.navigate('Profile')}
          labelStyle={styles.textDrawer}
          icon={ProfileIcon}
        />
        <DrawerItem
          label="Favorited Songs"
          onPress={() => props.navigation.navigate('Favorite')}
          labelStyle={styles.textDrawer}
          icon={FavoriteIcon}
        />
        <DrawerItem
          label="Language"
          onPress={() => props.navigation.navigate('Language')}
          labelStyle={styles.textDrawer}
          icon={LanguageIcon}
        />
        <DrawerItem
          label="Contact"
          onPress={() => props.navigation.navigate('Contact')}
          labelStyle={styles.textDrawer}
          icon={ContactIcon}
        />
        <DrawerItem
          label="FAQ"
          onPress={() => props.navigation.navigate('FAQ')}
          labelStyle={styles.textDrawer}
          icon={FAQIcon}
        />

        <DrawerItem
          label="Settings"
          onPress={() => props.navigation.navigate('Settings')}
          labelStyle={styles.textDrawer}
          icon={SettingsIcon}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    color: colors.textPrimary,
    fontSize: fonts.md,
    fontFamily: fontFamilies.medium,
  },
});
