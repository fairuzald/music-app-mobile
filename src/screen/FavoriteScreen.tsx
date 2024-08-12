import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {colors} from '../constants/color';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts, iconSizes, spacing} from '../constants/dimensions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {fontFamilies} from '../constants/fonts';
import SongCard from '../components/SongCard';
import {useNavigation} from '@react-navigation/native';

const FavoriteScreen = () => {
  const navigation = useNavigation();
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
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7]}
        ListHeaderComponent={() => (
          <Text style={styles.headingText}>Favorited Songs</Text>
        )}
        renderItem={() => (
          <SongCard
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
