import {TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {iconSizes} from '../constants/dimensions';
import {repeatOrder, useRepeatMode} from '../hooks/useRepeatMode';
import {RepeatMode} from 'react-native-track-player';
import type {CustomTheme} from '../types/themes';

import {useTheme} from '@react-navigation/native';

const PlayerRepeatToggle = () => {
  const {colors} = useTheme() as CustomTheme;

  const {repeatMode, changeRepeatMode} = useRepeatMode();

  const handleRepeat = () => {
    if (repeatMode === null) {
      return;
    }
    // Find the current repeat mode index in the repeatOrder array
    const currentIndex = repeatOrder.indexOf(repeatMode);
    // Calculate the next index (looping back to 0 if at the end)
    const nextIndex = (currentIndex + 1) % repeatOrder.length;
    // Get the next repeat mode
    const nextRepeatMode = repeatOrder[nextIndex];
    // Change to the next repeat mode
    changeRepeatMode(nextRepeatMode);
  };

  return (
    <TouchableOpacity onPress={handleRepeat}>
      <MaterialCommunityIcons
        name={
          RepeatMode.Off === repeatMode
            ? 'repeat-off'
            : RepeatMode.Queue === repeatMode
            ? 'repeat'
            : 'repeat-once'
        }
        size={iconSizes.lg}
        color={colors.iconSecondary}
      />
    </TouchableOpacity>
  );
};

export default PlayerRepeatToggle;
