import { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/ui';
import { LoginPromptModal } from '../../../components/LoginPromptModal';
import {
  MOCK_PROVIDERS,
  MOCK_REVIEWS,
  ServiceProvider,
} from '../../../constants/mockData';
import { colors, radius, shadows, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';
import { SearchStackParamList } from '../../../shell/navigation/types';
import Animated, { FadeInDown, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { CoverHeader } from '../components/CoverHeader';
import type { PortfolioItem } from '../components/PortfolioGallery';
import { ProfileInfoCard } from '../components/ProfileInfoCard';
import { ProfileTabs, ProfileTabsPager, type ProfileTab } from '../components/ProfileTabs';
import { PortfolioTab } from '../tabs/PortfolioTab';
import { AboutTab } from '../tabs/AboutTab';
import { QuickStatsTab } from '../tabs/QuickStatsTab';
import { ReviewSection } from '../components/ReviewSection';
import { AvailabilitySection } from '../components/AvailabilitySection';

type R = RouteProp<SearchStackParamList, 'ProviderProfile'>;
type Nav = NativeStackNavigationProp<SearchStackParamList, 'ProviderProfile'>;

export function ProviderProfileScreen() {
  const route = useRoute<R>();
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [loginOpen, setLoginOpen] = useState(false);
  const [providerOnlyOpen, setProviderOnlyOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const scrollY = useSharedValue(0);
  const tabX = useSharedValue(0);

  const isGuest = useAuthStore((s) => s.isGuest);
  const role = useAuthStore((s) => s.currentRole);

  const provider: ServiceProvider | undefined = useMemo(
    () => MOCK_PROVIDERS.find((p) => p.id === route.params.providerId),
    [route.params.providerId],
  );

  const data = provider ?? MOCK_PROVIDERS[0];

  const onBookNow = () => {
    if (isGuest) {
      setLoginOpen(true);
      return;
    }
    if (role === 'provider') {
      setProviderOnlyOpen(true);
      return;
    }
    const parent = navigation.getParent();
    parent?.navigate('BookingsTab', { screen: 'BookingFlow' });
  };

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const portfolioItems: PortfolioItem[] = useMemo(() => {
    const items = data.portfolio ?? [];
    if (items.length > 0) return items;
    return buildDummyPortfolio(data.category);
  }, [data.category, data.portfolio]);

  const tabs: ProfileTab[] = useMemo(
    () => [
      { key: 'portfolio', title: 'Portfolio' },
      { key: 'about', title: 'About' },
      { key: 'stats', title: 'Stats' },
    ],
    [],
  );

  const onPressTab = useCallback((idx: number) => setTabIndex(idx), []);

  const reviews = useMemo(
    () => MOCK_REVIEWS.map((r) => ({ ...r, rating: r.rating, context: data.category })),
    [data.category],
  );

  return (
    <View style={styles.screen}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        stickyHeaderIndices={[3]}
      >
        <CoverHeader
          topInset={insets.top}
          scrollY={scrollY}
          coverImageUrl={data.coverImageUrl}
          profileImageUrl={data.profileImageUrl}
          fallbackColor={data.imageColor}
          name={data.name}
          serviceTitle={data.category}
          rating={data.rating}
          reviewCount={data.reviewCount}
          verified={data.verified}
          location={data.location}
          onBack={() => navigation.goBack()}
          onShare={() => {}}
          onToggleFavorite={() => setFavorite((v) => !v)}
          isFavorite={favorite}
        />

        <Animated.View entering={FadeInDown.duration(420)} style={styles.actionsRow}>
          <Pressable
            onPress={() => {}}
            accessibilityRole="button"
            accessibilityLabel="Message"
            style={[styles.actionChip, styles.actionChipSecondary]}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.textPrimary} />
            <Text style={styles.actionChipText}>Message</Text>
          </Pressable>

          <Pressable onPress={onBookNow} accessibilityRole="button" accessibilityLabel="Book Now" style={styles.actionChip}>
            <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
            <Text style={[styles.actionChipText, styles.actionChipTextOnPrimary]}>Book Now</Text>
          </Pressable>
        </Animated.View>

        <View style={styles.sectionTight}>
          <ProfileInfoCard
            priceFrom={data.priceFrom}
            availability={data.availability ?? 'Available this week'}
            location={data.location}
          />
        </View>

        <ProfileTabs tabs={tabs} activeIndex={tabIndex} onPressTab={onPressTab} indicatorX={tabX} />
        <ProfileTabsPager
          tabs={tabs}
          activeIndex={tabIndex}
          onIndexChange={setTabIndex}
          indicatorX={tabX}
          renderScene={(tab) => {
            if (tab.key === 'portfolio') return <PortfolioTab items={portfolioItems} />;
            if (tab.key === 'about')
              return (
                <AboutTab
                  bio={data.bio}
                  specialties={data.services}
                  experienceYears={data.experienceYears}
                  workingStyle="Clean, collaborative, and detail-first."
                />
              );
            if (tab.key === 'stats')
              return (
                <QuickStatsTab
                  completedBookings={data.completedBookings}
                  experienceYears={data.experienceYears}
                  reviewCount={data.reviewCount}
                  responseTime={data.responseTime}
                />
              );
            return null;
          }}
        />

        <View style={styles.sectionPad}>
          <ReviewSection title="Reviews" items={reviews} />
          <AvailabilitySection
            nextAvailable={data.availability ?? 'This week'}
            slots={['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed']}
            onOpenCalendar={() => {}}
          />
        </View>
      </Animated.ScrollView>

      <LoginPromptModal
        visible={loginOpen}
        onClose={() => setLoginOpen(false)}
        title="Login required"
        message="Sign in as a customer to book this provider."
      />

      <Modal visible={providerOnlyOpen} onClose={() => setProviderOnlyOpen(false)} title="Customer booking">
        <Text style={styles.modalBody}>
          Switch to customer mode (mock) to book services from other providers.
        </Text>
        <Button title="OK" onPress={() => setProviderOnlyOpen(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  actionChip: {
    flex: 1,
    height: 48,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...shadows.card,
  },
  actionChipSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionChipText: {
    ...typography.body,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  actionChipTextOnPrimary: {
    color: '#FFFFFF',
  },
  sectionTight: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionPad: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  modalBody: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
});

function buildDummyPortfolio(category: string): PortfolioItem[] {
  const c = category.toLowerCase();
  const isDJ = c.includes('dj') || c.includes('music') || c.includes('events');
  const isMakeup = c.includes('makeup') || c.includes('beauty') || c.includes('henna') || c.includes('stylist');
  const isPhoto = c.includes('photo') || c.includes('camera') || c.includes('wedding');
  const isDev = c.includes('dev') || c.includes('tech') || c.includes('web') || c.includes('digital');

  const base = isDJ
    ? [
        { id: 'g1', type: 'video' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=85' },
        { id: 'g2', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=900&q=85' },
        { id: 'g3', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=85' },
        { id: 'g4', type: 'video' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&q=85' },
        { id: 'g5', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&q=85' },
        { id: 'g6', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=900&q=85' },
      ]
    : isMakeup
      ? [
          { id: 'g1', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=85' },
          { id: 'g2', type: 'video' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=900&q=85' },
          { id: 'g3', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=85' },
          { id: 'g4', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&q=85' },
          { id: 'g5', type: 'video' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85' },
          { id: 'g6', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=85' },
        ]
      : isPhoto
        ? [
            { id: 'g1', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=900&q=85' },
            { id: 'g2', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85' },
            { id: 'g3', type: 'video' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85' },
            { id: 'g4', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85' },
            { id: 'g5', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=85' },
            { id: 'g6', type: 'video' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1520975682031-ae5d4d9b5a66?w=900&q=85' },
          ]
        : isDev
          ? [
              { id: 'g1', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&q=85' },
              { id: 'g2', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=85' },
              { id: 'g3', type: 'video' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=900&q=85' },
              { id: 'g4', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=85' },
              { id: 'g5', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=85' },
              { id: 'g6', type: 'video' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85' },
            ]
          : [
              { id: 'g1', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=85' },
              { id: 'g2', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1520975682031-ae5d4d9b5a66?w=900&q=85' },
              { id: 'g3', type: 'video' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85' },
              { id: 'g4', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85' },
              { id: 'g5', type: 'photo' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&q=85' },
              { id: 'g6', type: 'video' as const, thumbnailUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=85' },
            ];

  return base;
}
