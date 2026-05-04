import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';

type PadKey = keyof typeof spacing;

type Props = {
  children: ReactNode;
  /** Default: top + bottom safe area. */
  edges?: Edge[];
  scrollable?: boolean;
  /** Horizontal inset inside safe area (theme spacing key). */
  horizontalPadding?: PadKey;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const defaultEdges: Edge[] = ['top', 'bottom'];

const horizontalPad = StyleSheet.create({
  xs: { paddingHorizontal: spacing.xs },
  sm: { paddingHorizontal: spacing.sm },
  md: { paddingHorizontal: spacing.md },
  lg: { paddingHorizontal: spacing.lg },
  xl: { paddingHorizontal: spacing.xl },
});

const padByKey: Record<PadKey, (typeof horizontalPad)[keyof typeof horizontalPad]> = {
  xs: horizontalPad.xs,
  sm: horizontalPad.sm,
  md: horizontalPad.md,
  lg: horizontalPad.lg,
  xl: horizontalPad.xl,
};

export function ScreenContainer({
  children,
  edges = defaultEdges,
  scrollable = false,
  horizontalPadding = 'md',
  style,
  contentContainerStyle,
}: Props) {
  const padStyle = padByKey[horizontalPadding];

  if (scrollable) {
    return (
      <SafeAreaView style={[styles.safe, style]} edges={edges}>
        <ScrollView
          style={styles.scroll}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.scrollContent, padStyle, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, padStyle, style]} edges={edges}>
      <View style={[styles.fill, contentContainerStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fill: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.lg,
  },
});
