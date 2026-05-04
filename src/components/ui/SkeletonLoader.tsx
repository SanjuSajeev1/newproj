import { StyleSheet, View } from 'react-native';
import { spacing } from '../../constants/theme';
import { SkeletonBlock } from './SkeletonBlock';

type GapKey = keyof typeof spacing;

type Props = {
  lines?: number;
  gap?: GapKey;
  titleWidth?: `${number}%` | number;
};

const gapStyles = StyleSheet.create({
  xs: { gap: spacing.xs },
  sm: { gap: spacing.sm },
  md: { gap: spacing.md },
  lg: { gap: spacing.lg },
  xl: { gap: spacing.xl },
});

const gapByKey: Record<GapKey, (typeof gapStyles)[keyof typeof gapStyles]> = {
  xs: gapStyles.xs,
  sm: gapStyles.sm,
  md: gapStyles.md,
  lg: gapStyles.lg,
  xl: gapStyles.xl,
};

export function SkeletonLoader({ lines = 4, gap = 'sm', titleWidth = '55%' }: Props) {
  return (
    <View
      style={[styles.column, gapByKey[gap]]}
      accessibilityLabel="Loading content"
    >
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBlock
          key={String(index)}
          width={index === 0 ? titleWidth : '100%'}
          height={index === 0 ? 20 : 14}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    width: '100%',
  },
});
