import { Ionicons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { gs } from '../../constants/glassTheme';

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
      <View style={styles.row}>
        <Ionicons name="search" size={20} color="#64748B" style={styles.icon} />
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={() => onSubmit?.(value)}
          onFocus={onFocus}
          onBlur={onBlur}
          selectionColor="#6366F1"
        />
        {value.length > 0 ? (
          <Pressable
            onPress={() => setValue('')}
            hitSlop={10}
            accessibilityLabel="Clear search"
          >
            <Ionicons name="close-circle" size={20} color="#94A3B8" />
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    height: 48,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
  },
  icon: {
    marginRight: gs.sm,
    opacity: 0.95,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
    paddingVertical: 4,
  },
});
