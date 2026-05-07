import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../../components/ui';
import { colors, spacing, typography } from '../../../constants/theme';

type Props = {
  bio?: string;
  specialties?: string[];
  experienceYears?: number;
  workingStyle?: string;
};

export const AboutTab = memo(function AboutTab({ bio, specialties, experienceYears, workingStyle }: Props) {
  const chips = specialties?.filter(Boolean) ?? [];
  return (
    <View style={styles.wrap}>
      <Card padded style={styles.card}>
        <Text style={styles.body}>
          {bio ??
            'Premium professional services with a focus on quality, clarity, and a seamless booking experience.'}
        </Text>
      </Card>

      {(chips.length > 0 || experienceYears || workingStyle) && (
        <Card padded style={styles.card}>
          {chips.length > 0 ? (
            <View style={styles.block}>
              <Text style={styles.label}>Specialties</Text>
              <View style={styles.chips}>
                {chips.slice(0, 8).map((s) => (
                  <View key={s} style={styles.chip}>
                    <Text style={styles.chipText}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {experienceYears ? (
            <View style={styles.block}>
              <Text style={styles.label}>Experience</Text>
              <Text style={styles.value}>{experienceYears} years</Text>
            </View>
          ) : null}

          {workingStyle ? (
            <View style={styles.block}>
              <Text style={styles.label}>Working style</Text>
              <Text style={styles.value}>{workingStyle}</Text>
            </View>
          ) : null}
        </Card>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  card: {},
  body: {
    ...typography.body,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  block: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  value: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '800',
  },
});

