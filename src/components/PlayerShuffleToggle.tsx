import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer from 'react-native-track-player';
import {useTheme} from '@react-navigation/native';

import {iconSizes} from '../constants/dimensions';
import type {CustomTheme} from '../types/themes';

const PlayerShuffleToggle: React.FC = () => {
  const {colors} = useTheme() as CustomTheme;

  // Handle shuffle functionality
  const handleShuffle = async () => {
    try {
      // Get the current queue
      const queue = await TrackPlayer.getQueue();

      // Reset the player
      await TrackPlayer.reset();

      // Shuffle the queue
      const shuffledQueue = queue.sort(() => Math.random() - 0.5);

      // Add shuffled queue and play
      await TrackPlayer.add(shuffledQueue);
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error shuffling queue:', error);
      // Optionally, you could implement error handling or user feedback here
    }
  };

  return (
    <TouchableOpacity onPress={handleShuffle}>
      <MaterialCommunityIcons
        name="shuffle"
        size={iconSizes.lg}
        color={colors.iconSecondary}
      />
    </TouchableOpacity>
  );
};

export default PlayerShuffleToggle;
