import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import TrackPlayer, {
  useActiveTrack,
  useProgress,
} from 'react-native-track-player';

import {fontFamilies} from '../constants/fonts';
import {fonts, spacing} from '../constants/dimensions';
import {minutesConverter} from '../utils/minutesConverter';
import type {CustomTheme} from '../types/themes';

const PlayerProgressBar: React.FC = () => {
  const {colors} = useTheme() as CustomTheme;

  // Shared values for slider
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);

  // Track player hooks
  const {position, duration} = useProgress();
  const curSong = useActiveTrack();

  // Convert duration and position to string format
  const durationString = minutesConverter(duration);
  const positionString = minutesConverter(position);

  // Update progress when position or duration changes
  useEffect(() => {
    if (duration > 0) {
      progress.value = position / duration;
    }
  }, [position, duration, progress]);

  if (!curSong) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={[styles.timeText, {color: colors.textPrimary}]}>
          {positionString}
        </Text>
        <Text style={[styles.timeText, {color: colors.textPrimary}]}>
          {durationString}
        </Text>
      </View>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        style={styles.slider}
        theme={{
          minimumTrackTintColor: colors.minimumTinkColor,
          maximumTrackTintColor: colors.maximumTrackColor,
        }}
        renderBubble={() => <View />}
        containerStyle={styles.sliderContainer}
        thumbWidth={spacing.lg}
        onSlidingStart={() => {
          isSliding.value = true;
        }}
        onValueChange={async value => {
          await TrackPlayer.seekTo(value * duration);
        }}
        onSlidingComplete={async value => {
          if (isSliding.value) {
            isSliding.value = false;
            await TrackPlayer.seekTo(value * duration);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginTop: spacing['3xl'],
    flexDirection: 'column',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  timeText: {
    fontFamily: fontFamilies.regular,
    fontSize: fonts.sm,
    opacity: 0.75,
  },
  slider: {
    marginVertical: spacing.md,
  },
  sliderContainer: {
    height: 7,
    borderRadius: spacing.sm,
  },
});

export default PlayerProgressBar;
