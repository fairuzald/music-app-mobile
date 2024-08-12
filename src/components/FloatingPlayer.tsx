import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../constants/color';
import {fontFamilies} from '../constants/fonts';
import {fonts, spacing} from '../constants/dimensions';
import PlayerControl from './PlayerControl';
import {useSharedValue} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';
import MovingText from './MovingText';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer, {
  useActiveTrack,
  useProgress,
} from 'react-native-track-player';
import {NavigationProp} from '../types/navigator';

const FloatingPlayer = () => {
  const navigation = useNavigation<NavigationProp>();
  const progresss = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);
  const {position, duration} = useProgress();
  const curSong = useActiveTrack();

  useEffect(() => {
    if (duration > 0) {
      progresss.value = position / duration;
    }
  }, [position, duration, progresss]);
  const handleOpenPlayer = () => {
    navigation.navigate('Player');
  };

  if (!curSong) {
    return null;
  }

  return (
    <View>
      <View style={{zIndex: 1}}>
        <Slider
          progress={progresss}
          minimumValue={min}
          maximumValue={max}
          style={styles.container}
          theme={{
            minimumTrackTintColor: colors.minimumTinkColor,
            maximumTrackTintColor: colors.maximumTrackColor,
          }}
          renderBubble={() => <View />}
          containerStyle={{
            height: 8,
          }}
          onSlidingStart={() => {
            isSliding.value = true;
          }}
          onValueChange={async value => {
            await TrackPlayer.seekTo(value * duration);
          }}
          onSlidingComplete={async value => {
            if (isSliding.value) {
              isSliding.value = false;
              await TrackPlayer.seekTo(value * duration);
            }
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.85}
        onPress={handleOpenPlayer}>
        <Image source={{uri: curSong.artwork}} style={styles.coverImage} />
        <View style={styles.titleContainer}>
          <MovingText
            text={curSong?.title || ''}
            style={styles.title}
            animationThreshold={15}
          />
          <Text style={styles.artist}>{curSong.artist}</Text>
        </View>
        <PlayerControl />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  coverImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
    fontSize: fonts.lg,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    marginLeft: spacing.sm,
    marginRight: spacing.lg,
  },
  artist: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.regular,
    fontSize: fonts.md,
  },
});
