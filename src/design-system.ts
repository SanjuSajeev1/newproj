import { colors, radius, shadows, spacing, typography, theme } from './constants/theme';

/**
 * Premium 2026 design system.
 *
 * Source of truth for tokens used across the app.
 * (Currently backed by `src/constants/theme/*` for compatibility.)
 */
export const designSystem = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
} as const;

export { colors, typography, spacing, radius, shadows, theme };
export type { Theme } from './constants/theme';

