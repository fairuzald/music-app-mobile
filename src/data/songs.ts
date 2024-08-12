const allSongs = [
  {
    id: '1',
    url: 'https://rmhyklncszeellodxhrm.supabase.co/storage/v1/object/public/songdb/1.mp3?t=2024-08-12T10%3A19%3A06.503Z', // Load media from the network
    title: 'Royality',
    artist: 'Egzod',
    duration: 180,
    artwork:
      'https://linkstorage.linkfire.com/medialinks/images/374fc4ba-fe39-4bcf-9cf0-74c87c879ed0/artwork-440x440.jpg', // Load artwork from the network
  },
  {
    id: '2',
    url: 'https://rmhyklncszeellodxhrm.supabase.co/storage/v1/object/public/songdb/1.mp3?t=2024-08-12T10%3A19%3A06.503Z', // Load media from the network
    title: 'Royality 2',
    artist: 'Egzod 2',
    duration: 180,

    artwork:
      'https://linkstorage.linkfire.com/medialinks/images/374fc4ba-fe39-4bcf-9cf0-74c87c879ed0/artwork-440x440.jpg', // Load artwork from the network
  },
  {
    id: '3',
    url: 'https://rmhyklncszeellodxhrm.supabase.co/storage/v1/object/public/songdb/1.mp3?t=2024-08-12T10%3A19%3A06.503Z', // Load media from the network
    title: 'Royality 3',
    duration: 180,

    artist: 'Egzod 3',
    artwork:
      'https://linkstorage.linkfire.com/medialinks/images/374fc4ba-fe39-4bcf-9cf0-74c87c879ed0/artwork-440x440.jpg', // Load artwork from the network
  },
];

const songs = [
  {
    category: 'All Songs',
    songs: allSongs,
  },
];

export {songs, allSongs};
