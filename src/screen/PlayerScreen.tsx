import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts, iconSizes, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import Feather from 'react-native-vector-icons/Feather';
import PlayerRepeatToggle from '../components/PlayerRepeatToggle';
import PlayerShuffleToggle from '../components/PlayerShuffleToggle';
import PlayerProggressBar from '../components/PlayerProggressBar';
import PlayerControl from '../components/PlayerControl';
import TrackPlayer, {useActiveTrack} from 'react-native-track-player';
import {useNavigation, useTheme} from '@react-navigation/native';
import useFavoriteStore from '../store/favoritedStore';
import type {CustomTheme} from '../types/themes';

const PlayerScreen = () => {
  const curSong = useActiveTrack();
  const navigation = useNavigation();
  const [isMute, setIsMute] = useState(false);
  const {favorited, toggleFavorite} = useFavoriteStore();
  const isFavorite = favorited.includes(curSong?.id || '');
  const {colors} = useTheme() as CustomTheme;

  useEffect(() => {
    const fetchVolume = async () => {
      const volume = await TrackPlayer.getVolume();
      setIsMute(volume === 0);
    };
    fetchVolume();
  }, []);

  const handleVolume = async () => {
    const volume = await TrackPlayer.getVolume();
    await TrackPlayer.setVolume(volume === 0 ? 1 : 0);
    setIsMute(!isMute);
  };

  const handleFavorite = () => {
    if (!curSong) {
      return null;
    }
    toggleFavorite(curSong.id);
  };

  if (!curSong) {
    return (
      <View
        style={[styles.centeredView, {backgroundColor: colors.background}]}
      />
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={iconSizes.md}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: colors.textPrimary}]}>
          Now Playing
        </Text>
      </View>

      <Image source={{uri: curSong?.artwork}} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, {color: colors.textPrimary}]}>
            {curSong?.title}
          </Text>
          <Text style={[styles.artist, {color: colors.textSecondary}]}>
            {curSong?.artist}
          </Text>
        </View>
        <TouchableOpacity onPress={handleFavorite}>
          <AntDesign
            name={isFavorite ? 'heart' : 'hearto'}
            size={iconSizes.md}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.playerControlContainer}>
        <TouchableOpacity onPress={handleVolume}>
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
    paddingHorizontal: spacing.lg,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  headerText: {
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
    fontFamily: fontFamilies.medium,
    fontSize: fonts.lg,
    textAlign: 'center',
  },
  artist: {
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
