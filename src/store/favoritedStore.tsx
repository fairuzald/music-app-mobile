import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

export type FavoriteStore = {
  favorited: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  loadFavorited: () => void;
};

const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorited: [],
  addFavorite: id => {
    set(state => ({favorited: [...state.favorited, id]}));
    AsyncStorage.setItem('favorited', JSON.stringify(get().favorited));
  },
  removeFavorite: id => {
    set(state => ({favorited: state.favorited.filter(i => i !== id)}));
    AsyncStorage.setItem('favorited', JSON.stringify(get().favorited));
  },
  toggleFavorite: id => {
    set(state => {
      const newFavorited = state.favorited.includes(id)
        ? state.favorited.filter(i => i !== id)
        : [...state.favorited, id];

      AsyncStorage.setItem('favorited', JSON.stringify(newFavorited));

      return {favorited: newFavorited};
    });
  },
  loadFavorited: async () => {
    try {
      const favorited = await AsyncStorage.getItem('favorited');
      if (favorited) {
        set({favorited: JSON.parse(favorited)});
      }
    } catch (e) {
      console.error(e);
    }
  },
}));

export default useFavoriteStore;
