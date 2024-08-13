import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {fonts, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import {SongProps} from '../components/SongCard';
import {useNavigation, useTheme} from '@react-navigation/native';
import {allSongs} from '../data/songs';
import TrackPlayer from 'react-native-track-player';
import FloatingPlayer from '../components/FloatingPlayer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import type {CustomTheme} from '../types/themes';
import SongCardRow from '../components/SongCardRow';
import Header from '../components/Header';
import Search from '../components/Search';

import PlayControlBatch from '../components/PlayControlBatch';

const HeaderText = ({text}: {text: string}) => {
  const {colors} = useTheme() as CustomTheme;
  return (
    <Text style={[styles.headingText, {color: colors.textPrimary}]}>
      {text}
    </Text>
  );
};

const AllSongScreen = () => {
  const {colors} = useTheme() as CustomTheme;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [filteredSongs, setFilteredSongs] = useState<SongProps[]>(allSongs);
  const [isSearch, setIsSearch] = useState(false);

  const handlePlayTrack = async (selectedTrack: SongProps) => {
    if (!allSongs.length || !allSongs) {
      return;
    }

    const trackIndex = allSongs.findIndex(
      track => track?.id === selectedTrack.id,
    );
    if (trackIndex === -1) {
      return;
    }

    // Filter out undefined values
    const queue = allSongs.filter(track => track !== undefined);

    await TrackPlayer.reset();
    if (queue.length > 0) {
      await TrackPlayer.add(queue);
    }
    await TrackPlayer.skip(trackIndex);
    await TrackPlayer.play();
    navigation.navigate('Player');
  };

  const handleSearch = (query: string) => {
    if (query) {
      const results = allSongs.filter(
        song =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredSongs(results);
      setIsSearch(true);
    } else {
      setFilteredSongs(allSongs);
      setIsSearch(false);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={[styles.headingText, {color: colors.textPrimary}]}>
        All Songs
      </Text>
      <Text style={[styles.emptyText, {color: colors.textPrimary}]}>
        No result found
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <HeaderText text={isSearch ? 'Search Results' : 'All Songs'} />
      <Search onSearch={handleSearch} />
      <PlayControlBatch songs={allSongs} />
      {filteredSongs.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredSongs}
          renderItem={({item}) => (
            <SongCardRow
              item={item}
              handlePlay={handlePlayTrack}
              containerStyle={styles.songCardContainer}
              imageStyle={styles.songCardImage}
            />
          )}
          contentContainerStyle={styles.flatListContentContainer}
        />
      )}
      <FloatingPlayer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.tr,
    gap: spacing.xs,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  headingText: {
    fontSize: fonts['2xl'],
    fontFamily: fontFamilies.bold,
  },
  emptyStateContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  songCardContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  songCardImage: {
    width: '100%',
    height: 160,
  },
  flatListContentContainer: {
    paddingBottom: 200,
  },
  playAllText: {
    fontFamily: fontFamilies.bold,
    fontSize: fonts.md,
    textAlign: 'center',
  },
});

export default AllSongScreen;
