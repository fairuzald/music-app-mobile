import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {fonts, iconSizes, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import SongCard, {SongProps} from '../components/SongCard';
import {useNavigation, useTheme} from '@react-navigation/native';
import {allSongs} from '../data/songs';
import TrackPlayer from 'react-native-track-player';
import FloatingPlayer from '../components/FloatingPlayer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import type {CustomTheme} from '../types/themes';

const Header = () => {
  const {colors} = useTheme() as CustomTheme;
  return (
    <Text style={[styles.headingText, {color: colors.textPrimary}]}>
      All Songs
    </Text>
  );
};

const AllSongScreen = () => {
  const {colors} = useTheme() as CustomTheme;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={[styles.headingText, {color: colors.textPrimary}]}>
        All Songs
      </Text>
      <Text style={[styles.emptyText, {color: colors.textPrimary}]}>
        No favorite songs yet
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={iconSizes.md}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SimpleLineIcons
            name="equalizer"
            size={iconSizes.md}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
      </View>

      {allSongs.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={allSongs}
          ListHeaderComponent={Header}
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

export default AllSongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
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
    paddingBottom: 200,
    paddingHorizontal: spacing.lg,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginVertical: spacing.lg,
  },
});
