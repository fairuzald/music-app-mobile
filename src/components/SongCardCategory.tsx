import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {fonts, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import SongCard, {SongProps} from './SongCard';
import TrackPlayer from 'react-native-track-player';
import type {CustomTheme} from '../types/themes';

const ItemSeparator = () => <View style={{marginHorizontal: spacing.sm}} />;

export interface ItemDataSongProps {
  category: string;
  songs: Array<SongProps>;
}

interface SongCardCategoryProps {
  item: ItemDataSongProps;
}

const SongCardCategory: React.FC<SongCardCategoryProps> = ({item: song}) => {
  const {colors} = useTheme() as CustomTheme;

  const handlePlayTrack = async (selectedTrack: SongProps) => {
    const trackIndex = song.songs.findIndex(
      track => track.id === selectedTrack.id,
    );

    if (trackIndex === -1) {
      return;
    }

    const beforeTrack = song.songs.slice(0, trackIndex);
    const afterTrack = song.songs.slice(trackIndex + 1);
    const queue = [...beforeTrack, selectedTrack, ...afterTrack];

    await TrackPlayer.reset();
    await TrackPlayer.add(queue);
    await TrackPlayer.skip(trackIndex);
    await TrackPlayer.play();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.headingText, {color: colors.textPrimary}]}>
        {song.category}
      </Text>
      <FlatList
        data={song.songs}
        horizontal
        renderItem={({item}) => (
          <SongCard item={item} handlePlay={handlePlayTrack} />
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
    fontFamily: fontFamilies.bold,
    paddingVertical: spacing.lg,
  },
});
