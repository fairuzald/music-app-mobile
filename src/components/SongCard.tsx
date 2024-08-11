import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';
import {fontFamilies} from '../constants/fonts';
import {fonts, spacing} from '../constants/dimensions';

const imageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/736/325x325/faster-1723161655-zwzjLFKZKK.jpg';

const SongCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.coverImage} />
      <Text style={styles.title}>Track Name</Text>
      <Text style={styles.artist}>Artist Name</Text>
    </TouchableOpacity>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  container: {
    height: 330,
    width: 250,
  },
  coverImage: {
    width: 250,
    height: 250,
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
