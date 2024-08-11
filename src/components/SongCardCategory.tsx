import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';
import {fonts, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import SongCard from './SongCard';

const ItemSeparator = () => <View style={{marginHorizontal: spacing.sm}} />;

const SongCardCategory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Recommended for you</Text>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        horizontal
        renderItem={SongCard}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
        }}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default SongCardCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: fonts.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
    paddingVertical: spacing.lg,
  },
});
