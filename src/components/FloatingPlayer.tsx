import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';
import {fontFamilies} from '../constants/fonts';
import {fonts} from '../constants/dimensions';
import PlayerControl from './PlayerControl';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';

const imageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/736/325x325/faster-1723161655-zwzjLFKZKK.jpg';

const FloatingPlayer = () => {
  const progress = useSharedValue(50);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  return (
    <View>
      <View style={{zIndex: 1}}>
        <Slider
          progress={progress}
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
        />
      </View>
      <TouchableOpacity style={styles.container} activeOpacity={0.85}>
        <Image source={{uri: imageUrl}} style={styles.coverImage} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Track Name</Text>
          <Text style={styles.artist}>Artist Name</Text>
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
    marginLeft: 10,
  },
  artist: {
    color: colors.textSecondary,
    fontFamily: fontFamilies.regular,
    fontSize: fonts.md,
  },
});
