import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { gs } from '../../constants/glassTheme';

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
      <View style={styles.inner}>
        <Ionicons name="location-sharp" size={16} color="#6366F1" />
        <Text numberOfLines={1} style={styles.text}>
          {location}
        </Text>
        <Ionicons name="chevron-down" size={15} color="#64748B" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 40,
    maxWidth: '78%',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
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
    color: '#0F172A',
  },
});
