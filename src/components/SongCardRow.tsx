import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {fontFamilies} from '../constants/fonts';
import {fonts, spacing} from '../constants/dimensions';
import {NavigationProp} from '../types/navigator';
import type {CustomTheme} from '../types/themes';
import useFavoriteStore from '../store/favoritedStore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useActiveTrack} from 'react-native-track-player';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export interface SongProps {
  id: string;
  url: string;
  artist: string;
  title: string;
  artwork: string;
}

interface SongCardRowProps {
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  item?: SongProps;
  handlePlay: (item: SongProps) => void;
}

const SongCardRow: React.FC<SongCardRowProps> = ({item, handlePlay}) => {
  const {colors} = useTheme() as CustomTheme;
  const navigation = useNavigation<NavigationProp>();
  const {isFavorited, toggleFavorite} = useFavoriteStore();
  const curSong = useActiveTrack();
  const isNow = curSong?.id === item?.id;

  // If there's no item provided, render nothing
  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderBottomColor: colors.textSecondary,
        },
      ]}
      onPress={() => {
        handlePlay(item);
        navigation.navigate('Player');
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.artwork}} style={[styles.coverImage]} />
        {isNow && (
          <View style={styles.overlay}>
            <FontAwesome5 name="play" size={24} color={'#FFFFFF'} />
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[styles.title, {color: colors.textPrimary}]}
          numberOfLines={1}>
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.artist, {color: colors.textSecondary}]}>
          {item.artist}
        </Text>
      </View>
      <TouchableOpacity
        onPress={e => {
          e.stopPropagation();
          toggleFavorite(item.id);
        }}>
        <AntDesign
          name={isFavorited(item.id) ? 'heart' : 'hearto'}
          size={24}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SongCardRow;

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.ssm,
    overflow: 'hidden',
    flexDirection: 'row',
    gap: spacing.lg,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  imageContainer: {
    position: 'relative', // Needed for overlay positioning
  },
  coverImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    flexShrink: 0,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    fontFamily: fontFamilies.bold,
    fontSize: fonts.lg,
  },
  artist: {
    fontFamily: fontFamilies.regular,
    fontSize: fonts.md,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xs,
  },
});
