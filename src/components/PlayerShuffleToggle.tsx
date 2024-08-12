import {TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {iconSizes} from '../constants/dimensions';
import {colors} from '../constants/color';
import TrackPlayer from 'react-native-track-player';

const PlayerShuffleToggle = () => {
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
