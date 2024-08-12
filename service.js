const {default: TrackPlayer, Event} = require('react-native-track-player');

module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());

  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext(),
  );

  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious(),
  );

  TrackPlayer.addEventListener(Event.RemoteSeek, ({position}) =>
    TrackPlayer.seekTo(position),
  );

  TrackPlayer.addEventListener(Event.RemoteJumpForward, ({interval}) =>
    TrackPlayer.seekTo(position => position + interval),
  );

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, ({interval}) =>
    TrackPlayer.seekTo(position => position - interval),
  );

  TrackPlayer.addEventListener(Event.RemoteDuck, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteVolume, ({volume}) =>
    TrackPlayer.setVolume(volume),
  );

  TrackPlayer.addEventListener(Event.RemoteRate, ({rate}) =>
    TrackPlayer.setRate(rate),
  );
};
