import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {fonts, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import SongCard, {SongProps} from './SongCard';
import TrackPlayer from 'react-native-track-player';
import type {CustomTheme} from '../types/themes';

// Separator component for FlatList
const ItemSeparator = () => <View style={styles.itemSeparator} />;

export interface ItemDataSongProps {
  category: string;
  songs: Array<SongProps>;
}

interface SongCardCategoryProps {
  item: ItemDataSongProps;
}

// Component to render a category of songs with a list of SongCard components
const SongCardCategory: React.FC<SongCardCategoryProps> = ({item: song}) => {
  const {colors} = useTheme() as CustomTheme;

  // Function to handle track playing
  const handlePlayTrack = async (selectedTrack: SongProps) => {
    const trackIndex = song.songs.findIndex(
      track => track.id === selectedTrack.id,
    );

    if (trackIndex === -1) {
      return;
    }

    const queue = [
      ...song.songs.slice(0, trackIndex),
      selectedTrack,
      ...song.songs.slice(trackIndex + 1),
    ];

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
        contentContainerStyle={styles.flatListContainer}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default SongCardCategory;

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: fonts.xl,
    fontFamily: fontFamilies.bold,
    paddingVertical: spacing.lg,
  },
  itemSeparator: {
    marginHorizontal: spacing.sm,
  },
  flatListContainer: {
    paddingHorizontal: spacing.lg,
  },
});
