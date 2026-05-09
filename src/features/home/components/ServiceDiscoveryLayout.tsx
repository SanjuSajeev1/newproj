import { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../../shell/navigation/types";
import { gs } from "../constants/glassTheme";
import {
  CATEGORY_ICON,
  getDiscoveryCategories,
  type DiscoveryCategoryId,
} from "../data/serviceDiscoveryData";
import {
  DiscoveryCategoryGrid,
  type DiscoveryCategory,
} from "./DiscoveryCategoryGrid";
import type { InlineServiceTabId } from "./InlineServiceTabs";

type Nav = NativeStackNavigationProp<HomeStackParamList, "HomeMain">;

type Props = {
  tab: InlineServiceTabId;
};

function ServiceDiscoveryLayoutImpl({ tab }: Props) {
  const navigation = useNavigation<Nav>();
  const categories = useMemo(() => getDiscoveryCategories(tab), [tab]);

  const iconFor = useCallback(
    (id: DiscoveryCategoryId) => CATEGORY_ICON[id] ?? "ellipse-outline",
    [],
  );

  const openCategory = useCallback(
    (categoryId: DiscoveryCategoryId) => {
      navigation.navigate("DiscoveryCategoryDetail", {
        mainTab: tab,
        categoryId,
      });
    },
    [navigation, tab],
  );

  const items: DiscoveryCategory<DiscoveryCategoryId>[] = categories;

  return (
    <View style={styles.wrap}>
      <DiscoveryCategoryGrid
        items={items}
        iconFor={iconFor}
        onPressItem={(id) => openCategory(id as DiscoveryCategoryId)}
      />
    </View>
  );
}

export const ServiceDiscoveryLayout = memo(ServiceDiscoveryLayoutImpl);

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: gs.md,
    width: "100%",
  },
});
