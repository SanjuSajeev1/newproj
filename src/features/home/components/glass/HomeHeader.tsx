import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { gs } from '../../constants/glassTheme';
import type { HomeHeroSlide } from '../../data/homeDashboardMock';
import { HeaderBackgroundCarousel } from './HeaderBackgroundCarousel';
import { LocationSelector } from './LocationSelector';
import { SearchBar } from './SearchBar';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  topInset: number;
  searchTop: number;
  headerHeight: number;
  heroSlides: HomeHeroSlide[];
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
  headerHeight,
  heroSlides,
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
      <HeaderBackgroundCarousel data={heroSlides} height={headerHeight + topInset} />
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
      <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
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
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  headerTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
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
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: gs.xxs,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)',
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
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    backgroundColor: 'rgba(0,0,0,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
  },
});
