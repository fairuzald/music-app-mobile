import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {fontFamilies} from '../constants/fonts';
import {fonts, spacing} from '../constants/dimensions';
import PlayerControl from './PlayerControl';
import {useSharedValue} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';
import MovingText from './MovingText';
import {useNavigation, useTheme} from '@react-navigation/native';
import TrackPlayer, {
  useActiveTrack,
  useProgress,
} from 'react-native-track-player';
import {NavigationProp} from '../types/navigator';
import type {CustomTheme} from '../types/themes';

const FloatingPlayer = () => {
  // Theme and navigation hooks
  const {colors} = useTheme() as CustomTheme;
  const navigation = useNavigation<NavigationProp>();

  // Shared values for slider and progress tracking
  const progressValue = useSharedValue(0);
  const minValue = useSharedValue(0);
  const maxValue = useSharedValue(1);
  const isSliding = useSharedValue(false);

  // Track the position and duration of the current song
  const {position, duration} = useProgress();
  const currentTrack = useActiveTrack();

  // Update progress value when the position or duration changes
  useEffect(() => {
    if (duration > 0) {
      progressValue.value = position / duration;
    }
  }, [position, duration, progressValue]);

  // Handle opening the full player view
  const handleOpenPlayer = () => {
    navigation.navigate('Player');
  };

  // Return null if there is no active track
  if (!currentTrack) {
    return null;
  }

  return (
    <View>
      {/* Slider of current song */}
      <View style={styles.sliderContainer}>
        <Slider
          progress={progressValue}
          minimumValue={minValue}
          maximumValue={maxValue}
          style={styles.container}
          theme={{
            minimumTrackTintColor: colors.minimumTinkColor,
            maximumTrackTintColor: colors.maximumTrackColor,
          }}
          renderBubble={() => <View />}
          containerStyle={styles.sliderStyle}
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

      {/* Control and information */}
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.85}
        onPress={handleOpenPlayer}>
        {/* Album image */}
        <Image source={{uri: currentTrack.artwork}} style={styles.coverImage} />

        {/* Content Text */}
        <View style={styles.titleContainer}>
          {/* Title */}
          <MovingText
            text={currentTrack.title || ''}
            style={[styles.title, {color: colors.textPrimary}]}
            animationThreshold={15}
          />
          {/* Artist Name */}
          <Text style={[styles.artist, {color: colors.textSecondary}]}>
            {currentTrack.artist}
          </Text>
        </View>
        <PlayerControl />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  coverImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: fontFamilies.medium,
    fontSize: fonts.lg,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    marginLeft: spacing.sm,
    marginRight: spacing.lg,
  },
  artist: {
    fontFamily: fontFamilies.regular,
    fontSize: fonts.md,
  },
  sliderContainer: {
    zIndex: 1,
  },
  sliderStyle: {
    height: 8,
  },
});
