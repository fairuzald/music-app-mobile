import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';
import {fonts, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import SongCard, {SongProps} from './SongCard';
import TrackPlayer from 'react-native-track-player';

const ItemSeparator = () => <View style={{marginHorizontal: spacing.sm}} />;

interface SongCardCategoryProps {
  item: {
    category: string;
    songs: Array<SongProps>;
  };
}

const SongCardCategory = ({item}: SongCardCategoryProps) => {
  const handlePlayTrac = async (selectedTrack: SongProps) => {
    const trackIndex = item.songs.findIndex(
      track => track.id === selectedTrack.id,
    );

    if (trackIndex === -1) {
      return;
    }

    const beforeTrack = item.songs.slice(0, trackIndex);

    const afterTrack = item.songs.slice(trackIndex + 1);

    const queue = [...beforeTrack, selectedTrack, ...afterTrack];

    await TrackPlayer.reset();
    await TrackPlayer.add(queue);
    await TrackPlayer.skip(trackIndex);
    await TrackPlayer.play();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{item.category}</Text>
      <FlatList
        data={item.songs}
        horizontal
        renderItem={({item}) => (
          <SongCard
            item={item}
            handlePlay={(selectedTrack: SongProps) => {
              handlePlayTrac(selectedTrack);
            }}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
        }}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default SongCardCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: fonts.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
    paddingVertical: spacing.lg,
  },
});
