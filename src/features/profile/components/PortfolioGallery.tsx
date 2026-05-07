import { Ionicons } from '@expo/vector-icons';
import { memo, useMemo, useState } from 'react';
import { Dimensions, FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors, radius, shadows, spacing, typography } from '../../../constants/theme';
import { useGlassPressScale } from '../../home/components/glass/useGlassPressScale';

export type PortfolioItem = {
  id: string;
  type: 'photo' | 'video';
  thumbnailUrl: string;
};

type Props = {
  title?: string;
  items: PortfolioItem[];
};

function Tile({ item, height, onPress }: { item: PortfolioItem; height: number; onPress: () => void }) {
  const { animatedStyle, onPressIn, onPressOut } = useGlassPressScale(0.98);
  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} accessibilityRole="button">
      <Animated.View style={[styles.tile, { height }, animatedStyle]}>
        <Image source={{ uri: item.thumbnailUrl }} style={styles.img} />
        {item.type === 'video' ? (
          <View style={styles.playBadge}>
            <Ionicons name="play" size={14} color="#FFFFFF" />
          </View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

export const PortfolioGallery = memo(function PortfolioGallery({ title = 'Portfolio', items }: Props) {
  const [open, setOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const winW = Dimensions.get('window').width;
  const gap = spacing.sm;
  const pad = spacing.md;
  const col = (winW - pad * 2 - gap) / 2;

  const heights = useMemo(() => items.map((_, i) => (i % 5 === 0 ? 232 : i % 3 === 0 ? 196 : 170)), [items]);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>

      <View style={[styles.grid, { gap }]}>
        <View style={{ width: col, gap }}>
          {items.filter((_, i) => i % 2 === 0).map((it, idx) => {
            const originalIndex = idx * 2;
            return (
              <Tile
                key={it.id}
                item={it}
                height={heights[originalIndex]}
                onPress={() => {
                  setInitialIndex(originalIndex);
                  setOpen(true);
                }}
              />
            );
          })}
        </View>
        <View style={{ width: col, gap }}>
          {items.filter((_, i) => i % 2 === 1).map((it, idx) => {
            const originalIndex = idx * 2 + 1;
            return (
              <Tile
                key={it.id}
                item={it}
                height={heights[originalIndex]}
                onPress={() => {
                  setInitialIndex(originalIndex);
                  setOpen(true);
                }}
              />
            );
          })}
        </View>
      </View>

      <Modal visible={open} onRequestClose={() => setOpen(false)} animationType="fade">
        <View style={styles.viewer}>
          <Pressable onPress={() => setOpen(false)} style={styles.viewerTop} accessibilityRole="button">
            <Ionicons name="close" size={26} color="#FFFFFF" />
          </Pressable>

          <FlatList
            data={items}
            horizontal
            pagingEnabled
            initialScrollIndex={initialIndex}
            getItemLayout={(_, index) => ({ length: winW, offset: winW * index, index })}
            keyExtractor={(i) => i.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Animated.View entering={FadeIn.duration(220)} style={{ width: winW, height: '100%' }}>
                <Image source={{ uri: item.thumbnailUrl }} style={styles.viewerImg} />
                {item.type === 'video' ? (
                  <View style={styles.viewerPlay}>
                    <Ionicons name="play-circle" size={72} color="rgba(255,255,255,0.92)" />
                    <Text style={styles.viewerHint}>Video preview (mock)</Text>
                  </View>
                ) : null}
              </Animated.View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.md,
  },
  title: {
    ...typography.title,
    fontSize: 18,
    marginBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
  },
  tile: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    ...shadows.card,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  playBadge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(2,6,23,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  viewer: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewerTop: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  viewerImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    backgroundColor: '#000',
  },
  viewerPlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  viewerHint: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.72)',
  },
});

