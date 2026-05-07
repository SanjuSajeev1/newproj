import { memo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { gs } from '../../home/constants/glassTheme';
import { useGlassPressScale } from '../../home/components/glass/useGlassPressScale';

export type ServiceItem = {
  id: string;
  name: string;
  imageUrl: string;
};

type Props = {
  title: string;
  items: ServiceItem[];
  onPressItem: (name: string) => void;
  cardWidth?: number;
  cardHeight?: number;
  gradient?: 'default' | 'soft';
};

function ServiceCard({
  item,
  onPress,
  width,
  height,
  gradient,
}: {
  item: ServiceItem;
  onPress: () => void;
  width: number;
  height: number;
  gradient: 'default' | 'soft';
}) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.96);
  const colors =
    gradient === 'soft'
      ? ['rgba(255,255,255,0.00)', 'rgba(2,6,23,0.12)', 'rgba(2,6,23,0.46)']
      : ['rgba(2,6,23,0.06)', 'rgba(2,6,23,0.46)', 'rgba(2,6,23,0.86)'];

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={item.name}
      style={{ width }}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        <ImageBackground source={{ uri: item.imageUrl }} style={[styles.bg, { height }]} resizeMode="cover">
          <LinearGradient
            colors={colors}
            locations={[0, 0.6, 1]}
            start={{ x: 0.25, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
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

export const ServiceRailSection = memo(function ServiceRailSection({
  title,
  items,
  onPressItem,
  cardWidth = 156,
  cardHeight = 190,
  gradient = 'default',
}: Props) {
  return (
    <View style={styles.section}>
      {title.length > 0 ? <Text style={styles.title}>{title}</Text> : null}
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        contentContainerStyle={styles.row}
      >
        {items.map((s) => (
          <ServiceCard
            key={s.id}
            item={s}
            onPress={() => onPressItem(s.name)}
            width={cardWidth}
            height={cardHeight}
            gradient={gradient}
          />
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  section: {
    marginTop: 0,
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
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0B1220',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 18,
    elevation: 5,
  },
  bg: {
    width: '100%',
    justifyContent: 'flex-end',
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

