import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import {fontFamilies} from '../constants/fonts';
import {fonts, spacing} from '../constants/dimensions';
import type {CustomTheme} from '../types/themes';
import {useSharedValue} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface VolumeProgressBarProps {
  onMute: (val: number) => void;
  isMute: boolean;
}

const VolumeProgressBar: React.FC<VolumeProgressBarProps> = ({
  onMute,
  isMute,
}) => {
  const {colors} = useTheme() as CustomTheme;
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  // State to manage slider value
  const volume = useSharedValue(0.5);

  // Fetch volume level from TrackPlayer
  useEffect(() => {
    const fetchVolume = async () => {
      const currentVolume = await TrackPlayer.getVolume();
      volume.value = currentVolume;
    };

    fetchVolume();
  }, [volume]);
  useEffect(() => {
    if (isMute) {
      volume.value = 0;
    } else {
      volume.value = 0.5;
    }
  }, [isMute, volume]);

  const handleValueChange = async (value: number) => {
    await TrackPlayer.setVolume(value);
    volume.value = value;
    onMute(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <FontAwesome
          name="volume-off"
          size={fonts.lg}
          color={colors.textPrimary}
        />
        <Slider
          progress={volume}
          minimumValue={min}
          maximumValue={max}
          onValueChange={handleValueChange}
          theme={{
            minimumTrackTintColor: colors.minimumTinkColor,
            maximumTrackTintColor: colors.maximumTrackColor,
          }}
          containerStyle={styles.sliderContainer}
          thumbWidth={spacing.md}
        />
        <FontAwesome
          name="volume-up"
          size={fonts.lg}
          color={colors.textPrimary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginTop: spacing['2xl'],
    flexDirection: 'column',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  timeText: {
    fontFamily: fontFamilies.regular,
    fontSize: fonts.sm,
    opacity: 0.75,
  },
  sliderContainer: {
    marginVertical: spacing.md,
  },
});

export default VolumeProgressBar;
