import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useCallback, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { glass, gs } from '../../constants/glassTheme';

type Props = {
  placeholder?: string;
  onSubmit?: (text: string) => void;
};

const spring = { damping: 20, stiffness: 260 };

export function SearchBar({
  placeholder = 'Search services...',
  onSubmit,
}: Props) {
  const [value, setValue] = useState('');
  const focused = useSharedValue(0);

  const shellStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + focused.value * 0.02 }],
  }));

  const onFocus = useCallback(() => {
    focused.value = withSpring(1, spring);
  }, [focused]);

  const onBlur = useCallback(() => {
    focused.value = withSpring(0, spring);
  }, [focused]);

  return (
    <Animated.View style={[styles.outer, shellStyle]}>
      <BlurView
        intensity={glass.blurSearch}
        tint="light"
        style={styles.blur}
        experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
      />
      <View style={styles.tint} />
      <View style={styles.row}>
        <Ionicons name="search" size={20} color={glass.textPrimary} style={styles.icon} />
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.5)"
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={() => onSubmit?.(value)}
          onFocus={onFocus}
          onBlur={onBlur}
          selectionColor="rgba(255,255,255,0.9)"
        />
        {value.length > 0 ? (
          <Pressable
            onPress={() => setValue('')}
            hitSlop={10}
            accessibilityLabel="Clear search"
          >
            <Ionicons name="close-circle" size={20} color={glass.textSecondary} />
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: glass.radiusPill,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: glass.border,
    minHeight: 52,
    shadowColor: glass.shadow,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 22,
    elevation: 12,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: gs.md,
    paddingVertical: gs.sm,
    minHeight: 52,
  },
  icon: {
    marginRight: gs.sm,
    opacity: 0.95,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: glass.textPrimary,
    paddingVertical: 4,
  },
});
