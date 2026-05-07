import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { OnboardingCarousel, type OnboardingSlide } from '../components/OnboardingCarousel';
import { useAuthStore } from '../../../store/authStore';

export function OnboardingScreen() {
  const beginLogin = useAuthStore((s) => s.beginLogin);

  const slides: OnboardingSlide[] = useMemo(
    () => [
      {
        key: 'discover',
        title: 'Discover trusted\nprofessionals',
        subtitle: 'Premium talent for events, creative work, and everyday services — curated and reviewed.',
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=85',
      },
      {
        key: 'book',
        title: 'Book seamlessly',
        subtitle: 'Chat, compare, and confirm in minutes with clear pricing and availability.',
        imageUrl: 'https://images.unsplash.com/photo-1520975682031-ae5d4d9b5a66?w=1800&q=85',
      },
      {
        key: 'explore',
        title: 'Explore talent\n& creativity',
        subtitle: 'Makeup artists, photographers, performers, and creators — all in one place.',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1800&q=85',
      },
    ],
    [],
  );

  return (
    <View style={styles.screen}>
      <OnboardingCarousel slides={slides} onDone={beginLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

