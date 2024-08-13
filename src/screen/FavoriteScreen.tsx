import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {fonts, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import SongCard, {SongProps} from '../components/SongCard';
import {useNavigation, useTheme} from '@react-navigation/native';
import useFavoriteStore from '../store/favoritedStore';
import {allSongs} from '../data/songs';
import TrackPlayer from 'react-native-track-player';
import FloatingPlayer from '../components/FloatingPlayer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {CustomTheme} from '../types/themes';
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

const FavoriteScreen = () => {
  const {colors} = useTheme() as CustomTheme;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {favorited} = useFavoriteStore();

  // Filter out undefined and ensure items are of type SongProps
  const favoriteSongs: SongProps[] = favorited
    .map(id => allSongs.find(song => song.id === id))
    .filter((song): song is SongProps => song !== undefined);

  const [filteredSongs, setFilteredSongs] =
    useState<SongProps[]>(favoriteSongs);
  console.log(filteredSongs);
  const [isSearch, setIsSearch] = useState(false);

  const handlePlayTrack = async (selectedTrack: SongProps) => {
    if (!favoriteSongs.length) {
      return;
    }

    const trackIndex = favoriteSongs.findIndex(
      track => track.id === selectedTrack.id,
    );
    if (trackIndex === -1) {
      return;
    }

    const queue = favoriteSongs; // No need to filter for undefined

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
      const results = favoriteSongs.filter(
        song =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredSongs(results);
      setIsSearch(true);
    } else {
      setFilteredSongs(favoriteSongs);
      setIsSearch(false);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={[styles.emptyText, {color: colors.textPrimary}]}>
        No songs found
      </Text>
    </View>
  );
  console.log('filteredSongs', filteredSongs);
  return (
    <View style={styles.container}>
      <Header />
      <HeaderText text={isSearch ? 'Search Results' : 'Favorited Songs'} />
      <Search onSearch={handleSearch} />
      <PlayControlBatch songs={favoriteSongs} />

      {filteredSongs.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredSongs}
          ListHeaderComponent={HeaderText}
          renderItem={({item}) => (
            <SongCard
              item={item}
              handlePlay={handlePlayTrack}
              containerStyle={styles.songCardContainer}
              imageStyle={styles.songCardImage}
            />
          )}
          contentContainerStyle={styles.flatListContentContainer}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
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
  },
  headingText: {
    fontSize: fonts.xl,
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
    width: '47%',
  },
  songCardImage: {
    width: 160,
    height: 160,
  },
  flatListContentContainer: {
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default FavoriteScreen;
