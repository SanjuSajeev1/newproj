import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { colors, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';

export function GuestProfileScreen() {
  const beginLogin = useAuthStore((s) => s.beginLogin);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
      <Card style={styles.card} padded>
        <Text style={styles.cardTitle}>You are browsing as a guest</Text>
        <Text style={styles.cardBody}>
          Create an account to book services, message providers, and sync saved items.
        </Text>
        <Button title="Login / Sign up" onPress={beginLogin} />
      </Card>
      <View style={styles.note}>
        <Text style={styles.noteText}>Limited profile · no bookings or chat in guest mode.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.title,
    marginBottom: spacing.sm,
  },
  cardBody: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  note: {
    padding: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
  },
  noteText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
