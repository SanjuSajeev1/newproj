import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../../constants/theme';

const screenHeight = Dimensions.get('window').height;

type Props = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  sheetStyle?: StyleProp<ViewStyle>;
};

export function BottomSheetModal({ visible, onClose, title, children, sheetStyle }: Props) {
  const [rendered, setRendered] = useState(visible);
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const closeAnimating = useRef(false);

  const runOpen = useCallback(() => {
    translateY.setValue(screenHeight);
    backdropOpacity.setValue(0);
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 9,
        tension: 65,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backdropOpacity, translateY]);

  const runClose = useCallback(
    (then?: () => void) => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: screenHeight,
          duration: 240,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) then?.();
      });
    },
    [backdropOpacity, translateY],
  );

  useEffect(() => {
    if (visible) {
      setRendered(true);
    }
  }, [visible]);

  useEffect(() => {
    if (visible && rendered) {
      closeAnimating.current = false;
      runOpen();
      return;
    }
    if (!visible && rendered && !closeAnimating.current) {
      closeAnimating.current = true;
      runClose(() => {
        closeAnimating.current = false;
        setRendered(false);
      });
    }
  }, [visible, rendered, runClose, runOpen]);

  if (!rendered) {
    return null;
  }

  return (
    <Modal
      visible={rendered}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.layer}>
          <Pressable
            style={styles.backdropPress}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close sheet"
          >
            <Animated.View style={[styles.backdropFill, { opacity: backdropOpacity }]} />
          </Pressable>
          <Animated.View style={[styles.sheet, { transform: [{ translateY }] }, sheetStyle]}>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View style={styles.handleWrap}>
                <View style={styles.handle} />
              </View>
              {title ? (
                <Text style={styles.title} accessibilityRole="header">
                  {title}
                </Text>
              ) : null}
              <View style={styles.body}>{children}</View>
            </Pressable>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  layer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdropPress: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropFill: {
    flex: 1,
    backgroundColor: 'rgba(11,15,22,0.48)',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    paddingBottom: spacing.lg,
    maxHeight: screenHeight * 0.92,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderStrong,
  },
  title: {
    ...typography.title,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  body: {
    paddingHorizontal: spacing.lg,
  },
});
