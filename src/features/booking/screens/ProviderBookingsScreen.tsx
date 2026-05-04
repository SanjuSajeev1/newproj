import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../../components/Card';
import { MOCK_BOOKING_REQUESTS } from '../../../constants/mockData';
import { colors, spacing, typography } from '../../../constants/theme';

export function ProviderBookingsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your schedule</Text>
      {MOCK_BOOKING_REQUESTS.map((b) => (
        <Card key={b.id} style={styles.card} padded>
          <Text style={styles.service}>{b.service}</Text>
          <Text style={styles.client}>{b.client}</Text>
          <Text style={styles.when}>
            {b.date} · {b.time}
          </Text>
        </Card>
      ))}
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
    marginBottom: spacing.sm,
  },
  service: {
    ...typography.title,
  },
  client: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  when: {
    ...typography.body,
    marginTop: spacing.sm,
  },
});
