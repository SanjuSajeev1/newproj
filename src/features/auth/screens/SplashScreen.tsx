import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';

export function SplashScreen() {
  const setAppFlow = useAuthStore((s) => s.setAppFlow);

  useEffect(() => {
    const t = setTimeout(() => setAppFlow('welcome'), 1600);
    return () => clearTimeout(t);
  }, [setAppFlow]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Nexus</Text>
      <Text style={styles.tagline}>Services · Community · Stories</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  tagline: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.85)',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
