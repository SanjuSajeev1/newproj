import { memo, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ServiceRailSection, type ServiceItem } from './ServiceRailSection';
import { gs } from '../../home/constants/glassTheme';

type Props = {
  title: string;
  items: ServiceItem[];
  gradient?: 'default' | 'soft';
  previewCount?: number;
  onPressItem: (name: string) => void;
  onViewAll: () => void;
};

export const SubCategorySection = memo(function SubCategorySection({
  title,
  items,
  gradient = 'default',
  previewCount = 6,
  onPressItem,
  onViewAll,
}: Props) {
  const preview = useMemo(() => items.slice(0, Math.max(0, previewCount)), [items, previewCount]);

  return (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onViewAll} accessibilityRole="button" accessibilityLabel={`View all ${title}`}>
          <View style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#2563EB" />
          </View>
        </Pressable>
      </View>

      <ServiceRailSection title="" items={preview} onPressItem={onPressItem} gradient={gradient} />
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    marginTop: gs.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: gs.sm,
    marginBottom: gs.sm,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#2563EB',
    letterSpacing: 0.2,
  },
});

