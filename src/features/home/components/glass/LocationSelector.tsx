import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { glass, gs } from '../../constants/glassTheme';

type Props = {
  location: string;
  onPress: () => void;
};

export function LocationSelector({ location, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Choose location"
      style={styles.wrap}
    >
      <BlurView intensity={38} tint="light" style={StyleSheet.absoluteFillObject} />
      <View style={styles.tint} />
      <View style={styles.inner}>
        <Ionicons name="location-sharp" size={16} color={glass.textPrimary} />
        <Text numberOfLines={1} style={styles.text}>
          {location}
        </Text>
        <Ionicons name="chevron-down" size={15} color={glass.textSecondary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 40,
    maxWidth: '78%',
    borderRadius: glass.radiusPill,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: glass.border,
    justifyContent: 'center',
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gs.xxs,
    paddingHorizontal: gs.sm,
    paddingVertical: 8,
  },
  text: {
    maxWidth: 170,
    fontSize: 14,
    fontWeight: '700',
    color: glass.textPrimary,
  },
});
