import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../../components/Card';
import { colors, spacing, typography } from '../../../constants/theme';

export function BookingHistoryScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Booking history</Text>
      <Card padded>
        <Text style={styles.body}>Past bookings will appear here (mock).</Text>
      </Card>
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
  body: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
