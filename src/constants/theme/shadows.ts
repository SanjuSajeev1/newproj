import type { ViewStyle } from 'react-native';

/** Soft elevation for cards (iOS shadow + Android elevation). */
export const shadows = {
  card: {
    shadowColor: '#0B0F16',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 22,
    elevation: 4,
  } satisfies ViewStyle,
  float: {
    shadowColor: '#0B0F16',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.10,
    shadowRadius: 26,
    elevation: 7,
  } satisfies ViewStyle,
} as const;

export type ThemeShadows = typeof shadows;
