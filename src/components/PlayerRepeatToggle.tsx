import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {RepeatMode} from 'react-native-track-player';

import {iconSizes} from '../constants/dimensions';
import {repeatOrder, useRepeatMode} from '../hooks/useRepeatMode';
import type {CustomTheme} from '../types/themes';

// Map RepeatMode to icon names
const repeatModeIcons = {
  [RepeatMode.Off]: 'repeat-off',
  [RepeatMode.Queue]: 'repeat',
  [RepeatMode.Track]: 'repeat-once',
};

const PlayerRepeatToggle: React.FC = () => {
  const {colors} = useTheme() as CustomTheme;
  const {repeatMode, changeRepeatMode} = useRepeatMode();

  // Handle repeat mode change
  const handleRepeat = () => {
    if (repeatMode === null) {
      return;
    }

    // Find the next repeat mode in the order
    const currentIndex = repeatOrder.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % repeatOrder.length;
    const nextRepeatMode = repeatOrder[nextIndex];

    // Change to the next repeat mode
    changeRepeatMode(nextRepeatMode);
  };

  // Determine the icon to display
  const iconName =
    repeatMode !== null ? repeatModeIcons[repeatMode] : 'repeat-off';

  return (
    <TouchableOpacity onPress={handleRepeat}>
      <MaterialCommunityIcons
        name={iconName}
        size={iconSizes.lg}
        color={colors.iconSecondary}
      />
    </TouchableOpacity>
  );
};

export default PlayerRepeatToggle;
