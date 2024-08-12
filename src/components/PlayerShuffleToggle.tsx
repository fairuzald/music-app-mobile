import {TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {iconSizes} from '../constants/dimensions';
import TrackPlayer from 'react-native-track-player';
import {useTheme} from '@react-navigation/native';
import type {CustomTheme} from '../types/themes';

const PlayerShuffleToggle = () => {
  const {colors} = useTheme() as CustomTheme;
  const handleShuffle = async () => {
    let queue = await TrackPlayer.getQueue();

    await TrackPlayer.reset();

    queue.sort(() => Math.random() - 0.5);

    await TrackPlayer.add(queue);
    await TrackPlayer.play();
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
