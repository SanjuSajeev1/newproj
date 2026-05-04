import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Card, ScreenContainer } from '../../../components/ui';
import {
  MOCK_PROVIDER_DASHBOARD_BOOKINGS,
  MOCK_PROVIDER_STATS,
  type ProviderDashboardBooking,
} from '../../../constants/mockData';
import { colors, radius, shadows, spacing, typography } from '../../../constants/theme';
import { DashboardStackParamList } from '../../../shell/navigation/types';

type Nav = NativeStackNavigationProp<DashboardStackParamList, 'DashboardMain'>;

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const pendingTone = { bg: '#FFFBEB', fg: '#B45309', border: '#FDE68A' };
const confirmedTone = { bg: '#ECFDF5', fg: '#15803D', border: '#BBF7D0' };

function StatusBadge({ status }: { status: ProviderDashboardBooking['status'] }) {
  const tone = status === 'pending' ? pendingTone : confirmedTone;
  const label = status === 'pending' ? 'Pending' : 'Confirmed';
  return (
    <View style={[styles.badge, { backgroundColor: tone.bg, borderColor: tone.border }]}>
      <Text style={[styles.badgeLabel, { color: tone.fg }]}>{label}</Text>
    </View>
  );
}

function BookingRow({ item }: { item: ProviderDashboardBooking }) {
  return (
    <Card style={styles.bookingCard} padded>
      <View style={styles.bookingTop}>
        <Text style={styles.clientName} numberOfLines={1}>
          {item.client}
        </Text>
        <StatusBadge status={item.status} />
      </View>
      <Text style={styles.service}>{item.service}</Text>
      <View style={styles.metaRow}>
        <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
        <Text style={styles.metaText}>
          {item.date} · {item.time}
        </Text>
      </View>
      {item.status === 'pending' ? (
        <View style={styles.bookingActions}>
          <View style={styles.actionGrow}>
            <Button title="Accept" onPress={() => {}} />
          </View>
          <View style={styles.actionGrow}>
            <Button title="Decline" variant="secondary" onPress={() => {}} />
          </View>
        </View>
      ) : null}
    </Card>
  );
}

export function ProviderDashboardScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  const { pending, confirmed } = useMemo(() => {
    const p: ProviderDashboardBooking[] = [];
    const c: ProviderDashboardBooking[] = [];
    for (const b of MOCK_PROVIDER_DASHBOARD_BOOKINGS) {
      if (b.status === 'pending') p.push(b);
      else c.push(b);
    }
    return { pending: p, confirmed: c };
  }, []);

  const fabBottom = Math.max(insets.bottom, spacing.md) + spacing.sm;

  return (
    <View style={styles.wrap}>
      <ScreenContainer
        scrollable
        edges={['left', 'right', 'bottom']}
        horizontalPadding="lg"
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.screenTitle}>Overview</Text>
        <Text style={styles.subtitle}>This month</Text>

        <View style={styles.statsRow}>
          <Card style={styles.statCard} padded>
            <View style={[styles.statIconWrap, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="calendar" size={22} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{MOCK_PROVIDER_STATS.bookingsThisMonth}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </Card>
          <Card style={styles.statCard} padded>
            <View style={[styles.statIconWrap, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="cash-outline" size={22} color={colors.accent} />
            </View>
            <Text style={styles.statValue}>{money.format(MOCK_PROVIDER_STATS.earningsUsd)}</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Bookings</Text>

        {pending.length > 0 ? (
          <>
            <Text style={styles.subsection}>Pending</Text>
            <View style={styles.listGap}>
              {pending.map((item) => (
                <BookingRow key={item.id} item={item} />
              ))}
            </View>
          </>
        ) : null}

        {confirmed.length > 0 ? (
          <>
            <Text style={[styles.subsection, pending.length > 0 && styles.subsectionSpaced]}>
              Confirmed
            </Text>
            <View style={styles.listGap}>
              {confirmed.map((item) => (
                <BookingRow key={item.id} item={item} />
              ))}
            </View>
          </>
        ) : null}
      </ScreenContainer>

      <Pressable
        style={({ pressed }) => [styles.fab, { bottom: fabBottom }, pressed && styles.fabPressed]}
        onPress={() => navigation.navigate('StoryUpload')}
        accessibilityRole="button"
        accessibilityLabel="Upload story"
      >
        <Ionicons name="cloud-upload-outline" size={26} color={colors.textOnPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xl + 56,
  },
  screenTitle: {
    ...typography.heading,
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: 0,
  },
  statIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  statLabel: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.sm,
  },
  subsection: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 0.6,
  },
  subsectionSpaced: {
    marginTop: spacing.lg,
  },
  listGap: {
    gap: spacing.md,
  },
  bookingCard: {
    marginBottom: 0,
  },
  bookingTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  clientName: {
    ...typography.title,
    fontSize: 17,
    flex: 1,
  },
  service: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    ...typography.caption,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.button,
    borderWidth: 1,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  bookingActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionGrow: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  fabPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
});
