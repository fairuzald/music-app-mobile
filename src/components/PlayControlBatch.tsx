import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import {fonts, iconSizes, spacing} from '../constants/dimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {CustomTheme} from '../types/themes';
import {SongProps} from '../components/SongCard';
import {fontFamilies} from '../constants/fonts';

const PlayControlBatch: React.FC<{songs: SongProps[]}> = ({songs}) => {
  const {colors} = useTheme() as CustomTheme;

  const onPlay = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(songs);
    await TrackPlayer.play();
  };

  const onShuffle = async () => {
    await TrackPlayer.reset();
    const shuffledSongs = songs.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(shuffledSongs);
    await TrackPlayer.play();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPlay}
        style={[styles.button, {backgroundColor: colors.backgroundSecondary}]}>
        <FontAwesome5
          name="play"
          size={iconSizes.xs}
          color={colors.iconPrimary}
        />
        <Text style={[styles.playAllText, {color: colors.textPrimary}]}>
          Play All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onShuffle}
        style={[styles.button, {backgroundColor: colors.backgroundSecondary}]}>
        <FontAwesome6
          name="shuffle"
          size={iconSizes.xs}
          color={colors.iconPrimary}
        />
        <Text style={[styles.playAllText, {color: colors.textPrimary}]}>
          Shuffle
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  button: {
    padding: spacing.sm,
    borderRadius: 12,
    flex: 1,
    flexDirection: 'row',
    gap: spacing.ssm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playAllText: {
    fontFamily: fontFamilies.bold,
    fontSize: fonts.md,
    textAlign: 'center',
  },
});

export default PlayControlBatch;
