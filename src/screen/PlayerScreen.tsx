import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts, iconSizes, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import Feather from 'react-native-vector-icons/Feather';
import PlayerRepeatToggle from '../components/PlayerRepeatToggle';
import PlayerShuffleToggle from '../components/PlayerShuffleToggle';
import PlayerProggressBar from '../components/PlayerProggressBar';
import PlayerControl from '../components/PlayerControl';
const imageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/736/325x325/faster-1723161655-zwzjLFKZKK.jpg';

const PlayerScreen = () => {
  const isFavorite = 0;
  const isMute = 1;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <AntDesign
            name="arrowleft"
            size={iconSizes.md}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Now Playing</Text>
      </View>

      <Image source={{uri: imageUrl}} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Track Name</Text>
          <Text style={styles.artist}>Artist Name</Text>
        </View>
        <TouchableOpacity>
          <AntDesign
            name={isFavorite ? 'heart' : 'hearto'}
            size={iconSizes.md}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Player Control */}
      <View style={styles.playerControlContainer}>
        <TouchableOpacity>
          <Feather
            name={isMute ? 'volume-x' : 'volume-2'}
            size={iconSizes.lg}
            color={colors.iconSecondary}
          />
        </TouchableOpacity>
        <View style={styles.toggleContainer}>
          <PlayerRepeatToggle />
          <PlayerShuffleToggle />
        </View>
      </View>

      {/* Progress Bar */}
      <PlayerProggressBar />

      <View style={styles.pad}>
        <PlayerControl size={iconSizes['2xl']} />
      </View>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  headerText: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
    fontSize: fonts.lg,
    flex: 1,
    textAlign: 'center',
  },
  coverImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
    fontSize: fonts.lg,
    textAlign: 'center',
  },
  artist: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.regular,
    fontSize: fonts.md,
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  textContainer: {
    flex: 1,
  },
  playerControlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pad: {
    paddingVertical: spacing['2xl'],
  },
});
