import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {iconSizes, spacing} from '../constants/dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <FontAwesome5
          name="grip-lines"
          color={colors.iconPrimary}
          size={iconSizes.md}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign
          name="search1"
          color={colors.iconPrimary}
          size={iconSizes.md}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
});
