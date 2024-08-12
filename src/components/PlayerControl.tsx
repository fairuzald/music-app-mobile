import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {useTheme} from '@react-navigation/native';
import {iconSizes} from '../constants/dimensions';
import type {CustomTheme} from '../types/themes';

// Props for the reusable ControlButton component
interface ControlButtonProps {
  size?: number;
  iconName: string;
  onPress: () => Promise<void>;
}

// Reusable button component for all control buttons
const ControlButton: React.FC<ControlButtonProps> = ({
  size = iconSizes.xl,
  iconName,
  onPress,
}) => {
  const {colors} = useTheme() as CustomTheme;

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <MaterialCommunityIcons
        name={iconName}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

// Previous track button component
const PreviousButton: React.FC<{size?: number}> = ({size}) => (
  <ControlButton
    size={size}
    iconName="skip-previous-outline"
    onPress={async () => await TrackPlayer.skipToPrevious()}
  />
);

// Next track button component
const NextButton: React.FC<{size?: number}> = ({size}) => (
  <ControlButton
    size={size}
    iconName="skip-next-outline"
    onPress={async () => await TrackPlayer.skipToNext()}
  />
);

// Play/Pause button component
const PlayPauseButton: React.FC<{size?: number}> = ({size = iconSizes.xl}) => {
  // Get current playback state
  const playerState = usePlaybackState();
  const isPlaying = playerState.state === State.Playing;

  // Toggle play/pause
  const handlePlayPause = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <ControlButton
      size={size}
      iconName={isPlaying ? 'pause-circle' : 'play-circle'}
      onPress={handlePlayPause}
    />
  );
};

// Props for the main PlayerControl component
interface PlayerControlProps {
  size?: number;
}

// Main PlayerControl component that combines all control buttons
const PlayerControl: React.FC<PlayerControlProps> = ({size = iconSizes.xl}) => {
  return (
    <View style={styles.container}>
      <PreviousButton size={size} />
      <PlayPauseButton size={size} />
      <NextButton size={size} />
    </View>
  );
};

// Styles for the container
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PlayerControl;
