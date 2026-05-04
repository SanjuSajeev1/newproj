export const colors = {
  primary: '#6366F1',
  primaryLight: '#EEF2FF',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textOnPrimary: '#FFFFFF',
  border: '#E2E8F0',
  accent: '#22C55E',
} as const;

export type ThemeColors = typeof colors;
