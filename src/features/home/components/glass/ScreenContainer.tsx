import { ReactNode } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HOME_BACKGROUND_URI } from '../../data/homeDashboardMock';
import { glass, gs } from '../../constants/glassTheme';

type Props = {
  children: ReactNode;
  /** Optional override for background image. */
  backgroundUri?: string;
};

export function ScreenContainer({
  children,
  backgroundUri = HOME_BACKGROUND_URI,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={{ uri: backgroundUri }}
      style={styles.bg}
      resizeMode="cover"
    >
      <View pointerEvents="none" style={styles.dim} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + gs.sm,
            paddingBottom: insets.bottom + gs.xl + 8,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: glass.overlay,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: gs.md,
    flexGrow: 1,
  },
});
