import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts, iconSizes, spacing} from '../constants/dimensions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {fontFamilies} from '../constants/fonts';
import SongCard, {SongProps} from '../components/SongCard';
import {useNavigation} from '@react-navigation/native';
import useFavoriteStore from '../store/favoritedStore';
import {allSongs} from '../data/songs';
import TrackPlayer from 'react-native-track-player';
import FloatingPlayer from '../components/FloatingPlayer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';

const FavoriteScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {favorited} = useFavoriteStore();
  const favoriteSongs = favorited.map(id => {
    return allSongs.find(song => song.id === id);
  });

  const handlePlayTrac = async (selectedTrack: SongProps) => {
    if (!favoriteSongs) return;
    const trackIndex = favoriteSongs.findIndex(
      track => track?.id === selectedTrack.id,
    );

    if (trackIndex === -1) {
      return;
    }

    // Filter out undefined values
    const queue = favoriteSongs.filter(track => track !== undefined);

    await TrackPlayer.reset();
    if (queue.length > 0) {
      await TrackPlayer.add(queue);
    }
    await TrackPlayer.skip(trackIndex);
    await TrackPlayer.play();
    navigation.navigate('Player');
  };

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

      {favoriteSongs.length === 0 ? (
        <View
          style={{
            flex: 1,
            textAlign: 'center',
            textAlignVertical: 'center',
            paddingHorizontal: spacing.lg,
          }}>
          <Text style={styles.headingText}>Favorited Songs</Text>
          <Text
            style={[
              styles.headingText,
              {textAlign: 'center', marginTop: spacing.lg, alignSelf: 'center'},
            ]}>
            No favorite songs yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteSongs}
          ListHeaderComponent={() => (
            <Text style={styles.headingText}>Favorited Songs</Text>
          )}
          renderItem={({item}) => (
            <SongCard
              item={item}
              handlePlay={(selectedTrack: SongProps) => {
                handlePlayTrac(selectedTrack);
              }}
              containerStyle={{
                width: '47%',
              }}
              imageStyle={{
                width: 160,
                height: 160,
              }}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 200,
            paddingHorizontal: spacing.lg,
          }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginVertical: spacing.lg,
          }}
        />
      )}
      <FloatingPlayer />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    alignContent: 'center',
  },
  headingText: {
    fontSize: fonts.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
  },
});
