import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {iconSizes} from '../constants/dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../constants/color';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {GestureResponderEvent} from 'react-native'; // Import GestureResponderEvent

interface PlayerControlProps {
  size?: number;
}

const PlayerControl = ({size = iconSizes.xl}: PlayerControlProps) => {
  return (
    <View style={styles.container}>
      <PreviousButton size={size} />
      <PlayPauseButton size={size} />
      <NextButton size={size} />
    </View>
  );
};

export const PreviousButton = ({size = iconSizes.xl}) => {
  const handlePress = (e: GestureResponderEvent) => {
    e.stopPropagation(); // Prevent event propagation
    // Add any additional logic for the button here
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
      <MaterialCommunityIcons
        name="skip-previous-outline"
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const PlayPauseButton = ({size = iconSizes.xl}) => {
  const playerState = usePlaybackState();
  const isPlaying = playerState.state === State.Playing;

  const handlePlayPause = async (e: GestureResponderEvent) => {
    e.preventDefault(); // Prevent event propagation
    e.stopPropagation(); // Prevent event propagation
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <View
      onStartShouldSetResponder={() => true}
      onTouchEnd={e => {
        e.stopPropagation();
        e.preventDefault();
      }}>
      <TouchableOpacity activeOpacity={0.85} onPress={handlePlayPause}>
        <MaterialCommunityIcons
          name={isPlaying ? 'pause-circle' : 'play-circle'}
          size={size}
          color={colors.iconPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

export const NextButton = ({size = iconSizes.xl}) => {
  const handlePress = (e: GestureResponderEvent) => {
    e.stopPropagation(); // Prevent event propagation
    // Add any additional logic for the button here
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
      <MaterialCommunityIcons
        name="skip-next-outline"
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export default PlayerControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
