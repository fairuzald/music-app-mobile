import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import SongCardCategory, {
  ItemDataSongProps,
} from '../components/SongCardCategory';
import FloatingPlayer from '../components/FloatingPlayer';
import {songs} from '../data/songs';
import {useTheme} from '@react-navigation/native';
import {spacing} from '../constants/dimensions';

const HomeScreen: React.FC = () => {
  const {colors} = useTheme();

  const renderSongCategory = ({item}: {item: ItemDataSongProps}) => (
    <SongCardCategory item={item} />
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header />
      <FlatList
        data={songs}
        renderItem={renderSongCategory}
        keyExtractor={item => item.category}
      />
      <FloatingPlayer />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.tr,
  },
});
