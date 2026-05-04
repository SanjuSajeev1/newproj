import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';

export { colors } from './colors';
export { typography } from './typography';
export { spacing } from './spacing';
export { radius } from './radius';
export { shadows } from './shadows';

export type { ThemeColors } from './colors';
export type { ThemeTypography } from './typography';
export type { ThemeSpacing } from './spacing';
export type { ThemeRadius } from './radius';
export type { ThemeShadows } from './shadows';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
} as const;

export type Theme = typeof theme;
