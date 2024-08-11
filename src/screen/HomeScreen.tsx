import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {colors} from '../constants/color';
import Header from '../components/Header';
import SongCardCategory from '../components/SongCardCategory';
import FloatingPlayer from '../components/FloatingPlayer';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FlatList data={[1, 2, 3, 4, 5]} renderItem={SongCardCategory} />
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
