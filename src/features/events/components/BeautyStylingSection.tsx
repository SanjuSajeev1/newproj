import { memo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { gs } from '../../home/constants/glassTheme';
import { useGlassPressScale } from '../../home/components/glass/useGlassPressScale';

type BeautyService = {
  id: string;
  name: string;
  imageUrl: string;
};

const BEAUTY_SERVICES: BeautyService[] = [
  {
    id: 'makeup',
    name: 'Makeup Artist',
    imageUrl: 'https://images.unsplash.com/photo-1526045478516-99145907023c?w=1200&q=85',
  },
  {
    id: 'bridal-makeover',
    name: 'Bridal Makeover Artist',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=85',
  },
  {
    id: 'henna',
    name: 'Henna Artist',
    imageUrl: 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?w=1200&q=85',
  },
  {
    id: 'beautician',
    name: 'Beautician (Freelance)',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=85',
  },
  {
    id: 'saree-draping',
    name: 'Saree Draping Artist',
    imageUrl: 'https://images.unsplash.com/photo-1520975693411-bf55f4a10b57?w=1200&q=85',
  },
  {
    id: 'costume',
    name: 'Costume Designer',
    imageUrl: 'https://images.unsplash.com/photo-1520976004341-6a4a8b52d32a?w=1200&q=85',
  },
  {
    id: 'hair',
    name: 'Hair Stylist',
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=1200&q=85',
  },
  {
    id: 'nails',
    name: 'Nail Artist',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85',
  },
  {
    id: 'stylist',
    name: 'Personal Stylist',
    imageUrl: 'https://images.unsplash.com/photo-1520975691309-5d3cfd9b0f0b?w=1200&q=85',
  },
];

type Props = {
  title?: string;
  onSelectService: (serviceName: string) => void;
};

function BeautyCard({ item, onPress }: { item: BeautyService; onPress: () => void }) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.96);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={item.name}
      style={styles.cardPress}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <ImageBackground source={{ uri: item.imageUrl }} style={styles.bg} resizeMode="cover">
          <LinearGradient
            colors={['rgba(255,255,255,0.00)', 'rgba(2,6,23,0.08)', 'rgba(2,6,23,0.40)']}
            locations={[0, 0.55, 1]}
            start={{ x: 0.25, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.overlay}
          />
          <View style={styles.labelWrap}>
            <Text style={styles.label} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
}

export const BeautyStylingSection = memo(function BeautyStylingSection({
  title = 'Beauty & Styling',
  onSelectService,
}: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        contentContainerStyle={styles.row}
      >
        {BEAUTY_SERVICES.map((s) => (
          <BeautyCard key={s.id} item={s} onPress={() => onSelectService(s.name)} />
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  section: {
    marginTop: gs.xl,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.2,
    marginBottom: gs.sm,
  },
  row: {
    paddingRight: gs.md,
    gap: gs.sm,
  },
  cardPress: {
    width: 146,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#0B1220',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  bg: {
    width: '100%',
    height: 196,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  labelWrap: {
    paddingHorizontal: gs.sm,
    paddingBottom: gs.sm,
    paddingTop: gs.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.1,
    lineHeight: 18,
  },
});

