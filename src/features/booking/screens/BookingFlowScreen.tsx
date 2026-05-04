import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Card } from '../../../components/ui';
import { colors, radius, shadows, spacing, typography } from '../../../constants/theme';
import { BookingsStackParamList } from '../../../shell/navigation/types';
import { formatBookingDate, getCalendarMatrix } from '../utils/calendarMatrix';

type Nav = NativeStackNavigationProp<BookingsStackParamList, 'BookingFlow'>;

const BOOKING_YEAR = 2026;
const BOOKING_MONTH = 4;
const MONTH_LABEL = 'May 2026';
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

const SLOTS = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM', '6:00 PM'] as const;

const STEP_TITLES = ['Pick a date', 'Pick a time', 'Review', 'Confirmed'] as const;

const SERVICE_NAME = 'Standard visit';
const SERVICE_PRICE = 120;

export function BookingFlowScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number>(7);
  const [selectedSlot, setSelectedSlot] = useState<string>(SLOTS[2]);
  const matrix = useRef(getCalendarMatrix(BOOKING_YEAR, BOOKING_MONTH)).current;

  const contentOpacity = useRef(new Animated.Value(1)).current;
  const contentTranslate = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0)).current;

  const dateLabel = formatBookingDate(BOOKING_YEAR, BOOKING_MONTH, selectedDay);

  useLayoutEffect(() => {
    navigation.setOptions({ title: STEP_TITLES[step] });
  }, [navigation, step]);

  const runStepTransition = useCallback(
    (nextStep: number) => {
      const forward = nextStep > step;
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 0,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslate, {
          toValue: forward ? 18 : -18,
          duration: 140,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setStep(nextStep);
        contentTranslate.setValue(forward ? -18 : 18);
        Animated.parallel([
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(contentTranslate, {
            toValue: 0,
            useNativeDriver: true,
            friction: 9,
            tension: 120,
          }),
        ]).start();
      });
    },
    [contentOpacity, contentTranslate, step],
  );

  const goNext = useCallback(() => {
    if (step >= 2) return;
    runStepTransition(step + 1);
  }, [runStepTransition, step]);

  const goBack = useCallback(() => {
    if (step <= 0) return;
    runStepTransition(step - 1);
  }, [runStepTransition, step]);

  const confirmBooking = useCallback(() => {
    if (step !== 2) return;
    runStepTransition(3);
  }, [runStepTransition, step]);

  useEffect(() => {
    if (step !== 3) return;
    successScale.setValue(0);
    Animated.spring(successScale, {
      toValue: 1,
      friction: 6,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [step, successScale]);

  const finish = useCallback(() => {
    navigation.dispatch(StackActions.popToTop());
  }, [navigation]);

  const renderDateStep = () => (
    <View style={styles.stepBody}>
      <Text style={styles.stepHint}>Select a day in {MONTH_LABEL}</Text>
      <View style={styles.calendarCard}>
        <Text style={styles.monthTitle}>{MONTH_LABEL}</Text>
        <View style={styles.weekRow}>
          {WEEKDAYS.map((d) => (
            <Text key={d} style={styles.weekday}>
              {d}
            </Text>
          ))}
        </View>
        {matrix.map((row, ri) => (
          <View key={`r-${ri}`} style={styles.dayRow}>
            {row.map((day, ci) => {
              if (day === null) {
                return <View key={`e-${ri}-${ci}`} style={styles.dayCell} />;
              }
              const selected = day === selectedDay;
              return (
                <Pressable
                  key={`d-${day}`}
                  onPress={() => setSelectedDay(day)}
                  style={[styles.dayCell, styles.dayPress]}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                >
                  <View style={[styles.dayInner, selected && styles.dayInnerSelected]}>
                    <Text style={[styles.dayNum, selected && styles.dayNumSelected]}>{day}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );

  const renderTimeStep = () => (
    <View style={styles.stepBody}>
      <Text style={styles.stepHint}>Available slots for {dateLabel}</Text>
      <View style={styles.chipWrap}>
        {SLOTS.map((slot) => {
          const active = slot === selectedSlot;
          return (
            <Pressable
              key={slot}
              onPress={() => setSelectedSlot(slot)}
              style={[styles.chip, active && styles.chipActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>{slot}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  const renderSummaryStep = () => (
    <View style={styles.stepBody}>
      <Card padded style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Booking details</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryKey}>Service</Text>
          <Text style={styles.summaryVal}>{SERVICE_NAME}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryKey}>Date</Text>
          <Text style={styles.summaryVal}>{dateLabel}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryKey}>Time</Text>
          <Text style={styles.summaryVal}>{selectedSlot}</Text>
        </View>
        <View style={[styles.summaryRow, styles.summaryTotalRow]}>
          <Text style={styles.summaryTotalKey}>Total</Text>
          <Text style={styles.summaryTotalVal}>${SERVICE_PRICE}</Text>
        </View>
      </Card>
    </View>
  );

  const renderSuccessStep = () => (
    <View style={styles.successBody}>
      <Animated.View style={[styles.successIconWrap, { transform: [{ scale: successScale }] }]}>
        <Ionicons name="checkmark-circle" size={88} color={colors.accent} />
      </Animated.View>
      <Text style={styles.successTitle}>{"You're all set"}</Text>
      <Text style={styles.successSub}>
        {"Your booking is saved. We'll send a reminder before your visit."}
      </Text>
    </View>
  );

  const stepContent =
    step === 0
      ? renderDateStep()
      : step === 1
        ? renderTimeStep()
        : step === 2
          ? renderSummaryStep()
          : renderSuccessStep();

  return (
    <View style={styles.screen}>
      <View style={styles.progressTrack}>
        {STEP_TITLES.map((_, i) => (
          <View
            key={String(i)}
            style={[styles.progressDot, i <= step && styles.progressDotActive]}
          />
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={{
            opacity: contentOpacity,
            transform: [{ translateX: contentTranslate }],
          }}
        >
          {stepContent}
        </Animated.View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            paddingBottom: insets.bottom + spacing.md,
            paddingTop: spacing.md,
          },
        ]}
      >
        {step < 3 ? (
          <View style={styles.footerRow}>
            {step > 0 ? (
              <Pressable onPress={goBack} style={styles.backBtn} accessibilityRole="button">
                <Text style={styles.backLabel}>Back</Text>
              </Pressable>
            ) : (
              <View style={styles.backSpacer} />
            )}
            {step < 2 ? (
              <View style={styles.footerPrimary}>
                <Button title="Continue" onPress={goNext} />
              </View>
            ) : (
              <View style={styles.footerPrimary}>
                <Button title="Confirm booking" onPress={confirmBooking} />
              </View>
            )}
          </View>
        ) : (
          <Button title="Done" onPress={finish} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressTrack: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  progressDotActive: {
    backgroundColor: colors.primary,
    width: 22,
    borderRadius: 4,
  },
  scrollInner: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  stepBody: {
    paddingTop: spacing.sm,
  },
  stepHint: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  calendarCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  monthTitle: {
    ...typography.title,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    ...typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  dayRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayPress: {
    padding: 2,
  },
  dayInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  dayInnerSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  dayNum: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dayNumSelected: {
    color: colors.primary,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  chipLabel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  chipLabelActive: {
    color: colors.primary,
  },
  summaryCard: {
    marginTop: spacing.xs,
  },
  summaryTitle: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  summaryKey: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  summaryVal: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    flexShrink: 1,
    textAlign: 'right',
  },
  summaryTotalRow: {
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: 0,
  },
  summaryTotalKey: {
    ...typography.title,
    fontSize: 17,
  },
  summaryTotalVal: {
    ...typography.title,
    color: colors.primary,
    fontSize: 20,
  },
  successBody: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  successIconWrap: {
    marginBottom: spacing.lg,
  },
  successTitle: {
    ...typography.heading,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  successSub: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    ...shadows.card,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    minWidth: 72,
  },
  backLabel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.primary,
  },
  backSpacer: {
    minWidth: 72,
  },
  footerPrimary: {
    flex: 1,
  },
});
