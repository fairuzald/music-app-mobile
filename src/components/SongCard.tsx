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
import {colors} from '../constants/color';
import {fontFamilies} from '../constants/fonts';
import {fonts, spacing} from '../constants/dimensions';

const imageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/736/325x325/faster-1723161655-zwzjLFKZKK.jpg';

interface SongCardProps {
  containerStyle?: TextStyle | ViewStyle; // Accepts both TextStyle and ViewStyle
  imageStyle?: ImageStyle; // Accepts both TextStyle and ViewStyle
}

const SongCard = ({containerStyle, imageStyle}: SongCardProps) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]}>
      <Image source={{uri: imageUrl}} style={[styles.coverImage, imageStyle]} />
      <Text style={styles.title} numberOfLines={1}>
        Track Name
      </Text>
      <Text style={styles.artist}>Artist Name</Text>
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
    color: colors.textPrimary,
    textAlign: 'center',
    fontFamily: fontFamilies.medium,
    fontSize: fonts.lg,
    paddingVertical: spacing.sm,
  },
  artist: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: fonts.md,
  },
});
