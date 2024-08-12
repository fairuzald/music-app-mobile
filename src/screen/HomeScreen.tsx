import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {colors} from '../constants/color';
import Header from '../components/Header';
import SongCardCategory from '../components/SongCardCategory';
import FloatingPlayer from '../components/FloatingPlayer';
import {songs} from '../data/songs';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FlatList data={songs} renderItem={SongCardCategory} />
      <FloatingPlayer />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
