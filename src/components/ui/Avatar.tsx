import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';

type Props = {
  name: string;
  size?: number;
  backgroundColor?: string;
  /** When true, draws a story-style ring around the avatar. */
  showStoryRing?: boolean;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  name,
  size = 40,
  backgroundColor = colors.primaryLight,
  showStoryRing = false,
}: Props) {
  const fontSize = size * 0.36;
  const ringPadding = showStoryRing ? 3 : 0;
  const outerSize = size + ringPadding * 2;

  const inner = (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text style={[styles.initials, { fontSize }]}>{initials(name)}</Text>
    </View>
  );

  if (!showStoryRing) {
    return inner;
  }

  return (
    <View
      style={[
        styles.ringWrap,
        {
          width: outerSize,
          height: outerSize,
          borderRadius: outerSize / 2,
          padding: ringPadding,
        },
      ]}
    >
      {inner}
    </View>
  );
}

const styles = StyleSheet.create({
  ringWrap: {
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    fontWeight: '700',
    color: colors.primary,
  },
});
