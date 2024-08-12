export const minutesConverter = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  const formatedMinutes = String(minutes).padStart(2, '0');

  const formatedSeconds = String(seconds).padStart(2, '0');

  return `${formatedMinutes}:${formatedSeconds}`;
};
