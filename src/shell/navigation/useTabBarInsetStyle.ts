import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../../constants/theme";

const BASE_BAR_HEIGHT = 64;

/** Bottom tab chrome that clears Android gesture bar / 3-button nav and iOS home indicator. */
export function useTabBarInsetStyle(): {
  tabBarStyle: {
    paddingTop: number;
    paddingBottom: number;
    height: number;
    borderTopColor: string;
  };
} {
  const insets = useSafeAreaInsets();

  return useMemo(() => {
    const bottom = Math.max(insets.bottom, 0);
    return {
      tabBarStyle: {
        paddingTop: spacing.xs,
        paddingBottom: spacing.sm + bottom,
        height: BASE_BAR_HEIGHT + bottom,
        borderTopColor: colors.border,
      },
    };
  }, [insets.bottom]);
}
