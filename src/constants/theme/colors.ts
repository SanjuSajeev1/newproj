export const colors = {
  /** Primary brand surface (charcoal). */
  primary: '#0B1220',
  /** Premium accent (soft blue). */
  accentBlue: '#2563EB',
  accentBlueSoft: '#EFF6FF',
  /** Back-compat alias (was indigo tint). */
  primaryLight: '#EFF6FF',

  background: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceMuted: '#F5F6F8',

  textPrimary: '#0B0F16',
  textSecondary: '#5B6472',
  textTertiary: '#8A93A3',
  textOnPrimary: '#FFFFFF',

  border: '#E7E7EA',
  borderStrong: '#D6D6DB',

  /** Back-compat alias (was bright green). */
  accent: '#16A34A',
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626',
} as const;

export type ThemeColors = typeof colors;
