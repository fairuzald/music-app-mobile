import {allSongs} from './allSongs';
import {newestSongs} from './newestSongs';
import {popularSongs} from './popularSongs';
import {recommendationSongs} from './recommendationSongs';

const songs = [
  {
    category: 'Recommended',
    songs: recommendationSongs,
  },
  {
    category: 'Popular',
    songs: popularSongs,
  },
  {
    category: 'New',
    songs: newestSongs,
  },
  {
    category: 'All Songs',
    songs: allSongs,
  },
];

export {songs, allSongs, newestSongs, recommendationSongs, popularSongs};
