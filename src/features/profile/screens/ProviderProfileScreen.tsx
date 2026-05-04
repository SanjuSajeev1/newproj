import { useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Modal } from '../../../components/Modal';
import { Avatar, Button, Card } from '../../../components/ui';
import { LoginPromptModal } from '../../../components/LoginPromptModal';
import {
  MOCK_PRICING,
  MOCK_PROVIDERS,
  MOCK_REVIEWS,
  ServiceProvider,
} from '../../../constants/mockData';
import { colors, radius, shadows, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';
import { SearchStackParamList } from '../../../shell/navigation/types';

type R = RouteProp<SearchStackParamList, 'ProviderProfile'>;
type Nav = NativeStackNavigationProp<SearchStackParamList, 'ProviderProfile'>;

type TabKey = 'gallery' | 'reviews' | 'pricing';

const SCROLL_COLLAPSE_RANGE = 140;
const GALLERY_TILES = 9;
const CTA_VERTICAL_PADDING = spacing.md;

export function ProviderProfileScreen() {
  const route = useRoute<R>();
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [tab, setTab] = useState<TabKey>('gallery');
  const [loginOpen, setLoginOpen] = useState(false);
  const [providerOnlyOpen, setProviderOnlyOpen] = useState(false);

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

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
  });

  const heroScale = scrollY.interpolate({
    inputRange: [0, SCROLL_COLLAPSE_RANGE],
    outputRange: [1, 0.88],
    extrapolate: 'clamp',
  });

  const heroTranslate = scrollY.interpolate({
    inputRange: [0, SCROLL_COLLAPSE_RANGE],
    outputRange: [0, -10],
    extrapolate: 'clamp',
  });

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_COLLAPSE_RANGE * 0.65, SCROLL_COLLAPSE_RANGE],
    outputRange: [1, 0.96, 0.92],
    extrapolate: 'clamp',
  });

  const horizontalInset = spacing.md * 2;
  const gridGap = spacing.sm;
  const cellSize = Math.floor((windowWidth - horizontalInset - gridGap * 2) / 3);

  const bottomPad = insets.bottom + 56 + CTA_VERTICAL_PADDING * 2;

  const renderGallery = () => (
    <View style={styles.grid}>
      {Array.from({ length: GALLERY_TILES }).map((_, i) => (
        <View
          key={String(i)}
          style={[
            styles.gridCell,
            {
              width: cellSize,
              height: cellSize,
              marginRight: (i + 1) % 3 === 0 ? 0 : gridGap,
              marginBottom: i < GALLERY_TILES - 3 ? gridGap : 0,
              backgroundColor: data.imageColor,
              opacity: 0.55 + (i % 3) * 0.12,
            },
          ]}
        />
      ))}
    </View>
  );

  const renderReviews = () => (
    <View style={styles.panel}>
      {MOCK_REVIEWS.map((rev) => (
        <Card key={rev.id} style={styles.reviewCard} padded>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewAuthor}>{rev.author}</Text>
            <Text style={styles.stars}>{'★'.repeat(rev.rating)}</Text>
          </View>
          <Text style={styles.reviewText}>{rev.text}</Text>
        </Card>
      ))}
    </View>
  );

  const renderPricing = () => (
    <View style={styles.panel}>
      {MOCK_PRICING.map((row) => (
        <Card key={row.id} style={styles.priceCard} padded>
          <View style={styles.priceRow}>
            <View style={styles.priceLeft}>
              <Text style={styles.priceLabel}>{row.label}</Text>
              <Text style={styles.priceDetail}>{row.detail}</Text>
            </View>
            <Text style={styles.priceValue}>${row.price}</Text>
          </View>
        </Card>
      ))}
    </View>
  );

  const tabContent =
    tab === 'gallery' ? renderGallery() : tab === 'reviews' ? renderReviews() : renderPricing();

  return (
    <View style={styles.screen}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate="normal"
        bounces
        stickyHeaderIndices={[1]}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad }]}
      >
        <Animated.View
          style={[
            styles.heroOuter,
            {
              opacity: heroOpacity,
              transform: [{ translateY: heroTranslate }, { scale: heroScale }],
            },
          ]}
        >
          <View style={styles.heroInner}>
            <Avatar name={data.name} size={104} backgroundColor={data.imageColor} />
            <View style={styles.heroMetaRow}>
              <View style={styles.heroTextBlock}>
                <Text style={styles.heroName} numberOfLines={2}>
                  {data.name}
                </Text>
                <Text style={styles.heroCategory} numberOfLines={1}>
                  {data.category} · Professional services
                </Text>
              </View>
              <View style={styles.ratingBadge} accessibilityLabel={`Rating ${data.rating}`}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={styles.ratingBadgeText}>{data.rating.toFixed(1)}</Text>
              </View>
            </View>
            <Text style={styles.reviewCount}>{data.reviewCount} reviews</Text>
          </View>
        </Animated.View>

        <View style={styles.stickyTabs} collapsable={false}>
          {(['gallery', 'reviews', 'pricing'] as TabKey[]).map((key) => {
            const active = tab === key;
            const label = key === 'gallery' ? 'Gallery' : key === 'reviews' ? 'Reviews' : 'Pricing';
            return (
              <Pressable
                key={key}
                onPress={() => setTab(key)}
                style={[styles.tab, active && styles.tabActive]}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
              >
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.tabPanel}>{tabContent}</View>
      </Animated.ScrollView>

      <View
        style={[
          styles.ctaBar,
          {
            paddingBottom: insets.bottom + CTA_VERTICAL_PADDING,
            paddingTop: CTA_VERTICAL_PADDING,
          },
        ]}
      >
        <Button title="Book Now" onPress={onBookNow} style={styles.ctaButton} />
      </View>

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
    paddingHorizontal: spacing.md,
  },
  heroOuter: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    marginHorizontal: -spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.card,
  },
  heroInner: {
    alignItems: 'center',
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  heroTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  heroName: {
    ...typography.heading,
    fontSize: 24,
    lineHeight: 30,
  },
  heroCategory: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontWeight: '600',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.button,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ratingBadgeText: {
    ...typography.title,
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reviewCount: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  stickyTabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    marginHorizontal: -spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.card,
    zIndex: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.button,
  },
  tabActive: {
    backgroundColor: colors.primaryLight,
  },
  tabLabel: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  tabPanel: {
    paddingTop: spacing.lg,
  },
  panel: {
    paddingBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  gridCell: {
    borderRadius: radius.image,
  },
  reviewCard: {
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  reviewAuthor: {
    ...typography.title,
    fontSize: 17,
  },
  stars: {
    color: '#F59E0B',
  },
  reviewText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  priceCard: {
    marginBottom: spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },
  priceLabel: {
    ...typography.title,
    fontSize: 17,
  },
  priceDetail: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  priceValue: {
    ...typography.title,
    color: colors.primary,
    fontSize: 18,
  },
  ctaBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.card,
  },
  ctaButton: {
    width: '100%',
  },
  modalBody: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
});
