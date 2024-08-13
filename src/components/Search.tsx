import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Corrected import name
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../types/themes';
import {spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({onSearch}) => {
  const [query, setQuery] = useState('');
  const {colors} = useTheme() as CustomTheme;

  const handleSearch = () => {
    onSearch(query);
    Keyboard.dismiss();
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            color: colors.textPrimary,
            backgroundColor: colors.backgroundSecondary,
          },
        ]}
        placeholder="Find your song"
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
      />
      {query.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={[
            styles.iconButton,
            {
              backgroundColor: colors.backgroundSecondary,
            },
          ]}>
          <AntDesign name="close" size={24} color={colors.iconPrimary} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={handleSearch}
        style={[
          styles.iconButton,
          {
            backgroundColor: colors.backgroundSecondary,
          },
        ]}>
        <AntDesign name="search1" size={24} color={colors.iconPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.ssm,
  },
  input: {
    flex: 1,
    fontFamily: fontFamilies.medium,
    fontSize: 18,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
  },
});

export default Search;
