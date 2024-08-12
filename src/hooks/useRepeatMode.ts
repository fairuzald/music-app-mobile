import {useCallback, useEffect, useState} from 'react';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

export const useRepeatMode = () => {
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(RepeatMode.Off);

  const changeRepeatMode = useCallback(async (repeat: RepeatMode) => {
    await TrackPlayer.setRepeatMode(repeat);
    setRepeatMode(repeat);
  }, []);

  useEffect(() => {
    TrackPlayer.getRepeatMode().then((mode: RepeatMode) => setRepeatMode(mode));
  }, []);

  return {repeatMode, changeRepeatMode};
};

export const repeatOrder = [RepeatMode.Off, RepeatMode.Queue, RepeatMode.Track];
