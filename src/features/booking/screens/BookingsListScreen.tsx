import { StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { colors, spacing, typography } from '../../../constants/theme';
import { BookingsStackParamList } from '../../../shell/navigation/types';

type Nav = NativeStackNavigationProp<BookingsStackParamList, 'BookingsMain'>;

export function BookingsListScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your bookings</Text>
      <Card style={styles.card} padded>
        <Text style={styles.cardTitle}>No upcoming bookings</Text>
        <Text style={styles.cardBody}>Start by choosing a provider from Search.</Text>
        <Button title="Book a service" onPress={() => navigation.navigate('BookingFlow')} />
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
  card: {
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.title,
    marginBottom: spacing.xs,
  },
  cardBody: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
});
