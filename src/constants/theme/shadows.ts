import type { ViewStyle } from 'react-native';

/** Soft elevation for cards (iOS shadow + Android elevation). */
export const shadows = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 3,
  } satisfies ViewStyle,
} as const;

export type ThemeShadows = typeof shadows;
