import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {fonts, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import SongCard, {SongProps} from './SongCard';
import TrackPlayer from 'react-native-track-player';
import type {CustomTheme} from '../types/themes';
import {NavigationProp} from '../types/navigator';

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
  const navigation = useNavigation<NavigationProp>();

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
      <View style={styles.albumContainer}>
        <Text style={[styles.headingText, {color: colors.textPrimary}]}>
          {song.category}
        </Text>

        {song.category === 'Your Songs' ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllSongs');
            }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: fonts.lg,
                fontFamily: fontFamilies.bold,
              }}>
              See all
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
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
    gap: spacing.md,
  },
  headingText: {
    fontSize: fonts.xl,
    fontFamily: fontFamilies.bold,
  },
  itemSeparator: {
    marginHorizontal: spacing.sm,
  },
  flatListContainer: {
    paddingHorizontal: spacing.sm,
  },
  albumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
});
