import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Card } from '../../../components/ui';
import { colors, spacing, typography } from '../../../constants/theme';

export type ReviewItem = {
  id: string;
  author: string;
  rating: number;
  text: string;
  context?: string;
};

type Props = {
  title?: string;
  items: ReviewItem[];
};

export const ReviewSection = memo(function ReviewSection({ title = 'Reviews', items }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{items.length}</Text>
      </View>

      <View style={styles.list}>
        {items.map((rev) => (
          <Card key={rev.id} style={styles.card} padded>
            <View style={styles.top}>
              <Avatar name={rev.author} size={40} backgroundColor={colors.primaryLight} />
              <View style={styles.meta}>
                <Text style={styles.author} numberOfLines={1}>
                  {rev.author}
                </Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#F59E0B" />
                  <Text style={styles.ratingText}>{rev.rating.toFixed(1)}</Text>
                  {rev.context ? <Text style={styles.context}>· {rev.context}</Text> : null}
                </View>
              </View>
            </View>
            <Text style={styles.text}>{rev.text}</Text>
          </Card>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.title,
    fontSize: 18,
  },
  count: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  list: {
    gap: spacing.md,
  },
  card: {},
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  meta: {
    flex: 1,
    minWidth: 0,
  },
  author: {
    ...typography.title,
    fontSize: 16,
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  context: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  text: {
    ...typography.body,
    color: colors.textPrimary,
    lineHeight: 22,
  },
});

