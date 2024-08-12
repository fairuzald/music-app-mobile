import {Theme} from '@react-navigation/native';

export type CustomTheme = Theme & {
  colors: {
    background: string;
    textPrimary: string;
    textSecondary: string;
    iconPrimary: string;
    iconSecondary: string;
    minimumTinkColor: string;
    maximumTrackColor: string;
  };
};
