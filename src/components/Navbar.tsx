import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {fonts, iconSizes, spacing} from '../constants/dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontFamilies} from '../constants/fonts';
import type {CustomTheme} from '../types/themes';
import {useTheme} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

const Icon = ({
  name,
  type: IconComponent,
  size,
  isPrimary,
}: {
  name: string;
  type: React.ComponentType<any>;
  size: number;
  isPrimary?: boolean;
}) => {
  const {colors} = useTheme() as CustomTheme;

  return (
    <IconComponent
      name={name}
      color={isPrimary ? colors.iconPrimary : colors.iconSecondary}
      size={size}
    />
  );
};

// Icon components for reusability and clarity
const CloseIcon = () => (
  <Icon name="close" type={AntDesign} size={iconSizes.lg} isPrimary />
);

const HomeIcon = () => (
  <Icon name="home" type={AntDesign} size={iconSizes.md} />
);

const FavoriteIcon = () => (
  <Icon name="hearto" type={AntDesign} size={iconSizes.md} />
);

const AllSongsIcon = () => (
  <Icon name="music" type={Feather} size={iconSizes.md} />
);

// Main Navbar component
const Navbar: React.FC<DrawerContentComponentProps> = props => {
  const {colors} = useTheme() as CustomTheme;

  return (
    <DrawerContentScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Header with Close and Dark Mode toggle buttons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      {/* Drawer items */}
      <View style={styles.drawerItem}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
          labelStyle={[styles.textDrawer, {color: colors.textPrimary}]}
          icon={HomeIcon}
        />
        <DrawerItem
          label="Favorited Songs"
          onPress={() => props.navigation.navigate('Favorite')}
          labelStyle={[styles.textDrawer, {color: colors.textPrimary}]}
          icon={FavoriteIcon}
        />
        {/* Allsongs */}
        <DrawerItem
          label="All Songs"
          onPress={() => props.navigation.navigate('AllSongs')}
          labelStyle={[styles.textDrawer, {color: colors.textPrimary}]}
          icon={AllSongsIcon}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default Navbar;

// Styles for the Navbar component
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
