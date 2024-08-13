import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {fontFamilies} from '../constants/fonts';
import {fonts, spacing} from '../constants/dimensions';
import {NavigationProp} from '../types/navigator';
import type {CustomTheme} from '../types/themes';

export interface SongProps {
  id: string;
  url: string;
  artist: string;
  title: string;
  artwork: string;
  dateText: string;
  daysAgo: number;
}

interface SongCardProps {
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  item?: SongProps;
  handlePlay: (item: SongProps) => void;
}

const SongCard: React.FC<SongCardProps> = ({
  item,
  containerStyle,
  imageStyle,
  handlePlay,
}) => {
  const {colors} = useTheme() as CustomTheme;
  const navigation = useNavigation<NavigationProp>();

  // If there's no item provided, render nothing
  if (!item) {
    return null;
  }
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]} // Merging custom container styles
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
      <Text
        numberOfLines={1}
        style={[styles.artist, {color: colors.textSecondary}]}>
        {item.artist}
      </Text>
    </TouchableOpacity>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.md,
    overflow: 'hidden',
    flexDirection: 'column',
    gap: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    flexShrink: 0,
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    fontFamily: fontFamilies.bold,
    fontSize: fonts.lg,
    maxWidth: 220,
  },
  artist: {
    maxWidth: 200,
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: fonts.md,
  },
});
