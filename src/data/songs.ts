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
    category: 'Your Songs',
    songs: allSongs.slice(0, 20),
  },
];

export {songs, allSongs, newestSongs, recommendationSongs, popularSongs};
