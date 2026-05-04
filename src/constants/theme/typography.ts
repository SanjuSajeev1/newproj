import { colors } from './colors';

export const typography = {
  heading: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  title: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: colors.textSecondary,
  },
} as const;

export type ThemeTypography = typeof typography;
