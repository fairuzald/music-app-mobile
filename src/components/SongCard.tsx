import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {fontFamilies} from '../constants/fonts';
import {fonts, spacing} from '../constants/dimensions';
import {useNavigation, useTheme} from '@react-navigation/native';
import {NavigationProp} from '../types/navigator';
import type {CustomTheme} from '../types/themes';

export interface SongProps {
  id: string;
  url: string;
  artist: string;
  title: string;
  artwork: string;
}
interface SongCardProps {
  containerStyle?: TextStyle | ViewStyle; // Accepts both TextStyle and ViewStyle
  imageStyle?: ImageStyle; // Accepts both TextStyle and ViewStyle
  item?: SongProps;
  handlePlay: (item: SongProps) => void;
}

const SongCard = ({
  item,
  containerStyle,
  imageStyle,
  handlePlay,
}: SongCardProps) => {
  const {colors} = useTheme() as CustomTheme;
  const navigation = useNavigation<NavigationProp>();
  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => {
        handlePlay(item);
        navigation.navigate('Player');
      }}>
      <Image
        source={{uri: item.artwork}}
        style={[styles.coverImage, imageStyle]}
      />
      <Text
        style={[styles.title, {color: colors.textPrimary}]}
        numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={[styles.artist, {color: colors.textSecondary}]}>
        {item.artist}
      </Text>
    </TouchableOpacity>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.md,
  },
  coverImage: {
    width: 220,
    height: 220,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: fontFamilies.medium,
    fontSize: fonts.lg,
    paddingVertical: spacing.sm,
  },
  artist: {
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: fonts.md,
  },
});
