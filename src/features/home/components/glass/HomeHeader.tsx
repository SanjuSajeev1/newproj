import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { gs, glass } from '../../constants/glassTheme';
import { LocationSelector } from './LocationSelector';
import { SearchBar } from './SearchBar';

type Props = {
  topInset: number;
  searchTop: number;
  firstName: string;
  location: string;
  onLocationPress: () => void;
  onSearchSubmit: (text: string) => void;
  containerStyle: object;
  bgOpacityStyle: object;
  topRowStyle: object;
  greetingStyle: object;
  searchStyle: object;
};

export function HomeHeader({
  topInset,
  searchTop,
  firstName,
  location,
  onLocationPress,
  onSearchSubmit,
  containerStyle,
  bgOpacityStyle,
  topRowStyle,
  greetingStyle,
  searchStyle,
}: Props) {
  return (
    <Animated.View style={[styles.header, containerStyle]}>
      <BlurView intensity={44} tint="dark" style={StyleSheet.absoluteFillObject} />
      <Animated.View style={[styles.headerTint, bgOpacityStyle]} />
      <View style={[styles.inner, { paddingTop: topInset + gs.sm }]}>
        <Animated.View style={[styles.topRow, topRowStyle]}>
          <LocationSelector location={location} onPress={onLocationPress} />
          <Pressable
            style={styles.notif}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <BlurIconButton />
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.greetingWrap, greetingStyle]}>
          <Text style={styles.greeting}>Hi, {firstName} 👋</Text>
          <Text style={styles.subtitle}>What are you planning today?</Text>
        </Animated.View>

        <Animated.View style={[styles.searchFloating, { top: searchTop }, searchStyle]}>
          <SearchBar onSubmit={onSearchSubmit} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

function BlurIconButton() {
  return (
    <View style={styles.notifInner}>
      <BlurView intensity={44} tint="light" style={StyleSheet.absoluteFillObject} />
      <View style={styles.notifTint} />
      <View style={styles.notifIcon}>
        <Ionicons name="notifications-outline" size={22} color={glass.textPrimary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    overflow: 'hidden',
  },
  headerTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3,7,18,0.72)',
  },
  inner: {
    flex: 1,
    paddingHorizontal: gs.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: gs.sm,
  },
  greetingWrap: {
    marginBottom: gs.lg,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: glass.textPrimary,
    letterSpacing: -0.5,
    marginBottom: gs.xxs,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: glass.textSecondary,
    lineHeight: 22,
  },
  searchFloating: {
    position: 'absolute',
    left: gs.md,
    right: gs.md,
  },
  notif: {
    marginTop: 2,
  },
  notifInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: glass.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: glass.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  notifTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  notifIcon: {
    zIndex: 1,
  },
});
