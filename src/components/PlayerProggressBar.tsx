import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';
import {fontFamilies} from '../constants/fonts';
import {fonts, spacing} from '../constants/dimensions';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';

const PlayerProggressBar = () => {
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  const progress = useSharedValue(50);
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>00:00</Text>
        <Text style={styles.timeText}>- 03:00</Text>
      </View>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        style={styles.slider}
        theme={{
          minimumTrackTintColor: colors.minimumTinkColor,
          maximumTrackTintColor: colors.maximumTrackColor,
        }}
        renderBubble={() => <View />}
        containerStyle={{
          height: 7,
          borderRadius: spacing.sm,
        }}
        thumbWidth={spacing.lg}
      />
    </View>
  );
};

export default PlayerProggressBar;

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  timeText: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.regular,
    fontSize: fonts.sm,
    opacity: 0.75,
  },
  container: {
    paddingHorizontal: spacing.md,
    marginTop: spacing['3xl'],
    flexDirection: 'column',
  },
  slider: {
    marginVertical: spacing.md,
  },
});
