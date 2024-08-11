import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {iconSizes} from '../constants/dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../constants/color';
const PlayerControl = () => {
  return (
    <View style={styles.container}>
      <PreviousButton size={iconSizes.lg} />
      <PlayPauseButton />
      <NextButton size={iconSizes.lg} />
    </View>
  );
};

export const PreviousButton = ({size = iconSizes.xl}) => {
  return (
    <TouchableOpacity activeOpacity={0.85}>
      <MaterialCommunityIcons
        name="skip-previous-outline"
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const PlayPauseButton = ({size = iconSizes.xl}) => {
  const isPlaying = false;
  return (
    <TouchableOpacity activeOpacity={0.85}>
      <MaterialCommunityIcons
        name={isPlaying ? 'pause-circle' : 'play-circle'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const NextButton = ({size = iconSizes.xl}) => {
  return (
    <TouchableOpacity activeOpacity={0.85}>
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
