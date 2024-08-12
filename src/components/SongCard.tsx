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
}

interface SongCardProps {
  containerStyle?: ViewStyle; // Changed from TextStyle to ViewStyle for container
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
        handlePlay(item); // Play the selected song
        navigation.navigate('Player'); // Navigate to the Player screen
      }}>
      <Image
        source={{uri: item.artwork}}
        style={[styles.coverImage, imageStyle]}
      />
      <Text
        style={[styles.title, {color: colors.textPrimary}]}
        numberOfLines={2} // Ensures the title is clamped to one line
      >
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
    overflow: 'hidden', // Ensures content does not overflow
  },
  coverImage: {
    width: 220,
    height: 220,
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: fontFamilies.medium,
    fontSize: fonts.lg,
    paddingVertical: spacing.sm,
    maxWidth: 220,
  },
  artist: {
    maxWidth: 220,
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: fonts.md,
  },
});
