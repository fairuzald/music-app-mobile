import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {iconSizes} from '../constants/dimensions';
import {colors} from '../constants/color';

const PlayerRepeatToggle = () => {
  return (
    <TouchableOpacity>
      <MaterialCommunityIcons
        name="repeat"
        size={iconSizes.lg}
        color={colors.iconSecondary}
      />
    </TouchableOpacity>
  );
};

export default PlayerRepeatToggle;

const styles = StyleSheet.create({});
