import { memo, useLayoutEffect, useMemo, useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../../shell/navigation/types";
import { gs } from "../constants/glassTheme";
import { SubcategoryCards, type SubcategoryItem } from "../components/SubcategoryCards";
import {
  SUB_ICON,
  discoverySearchChip,
  getDiscoveryCategoryRow,
  isDiscoveryCategoryId,
  type DiscoverySubId,
} from "../data/serviceDiscoveryData";

type Route = RouteProp<HomeStackParamList, "DiscoveryCategoryDetail">;

type Nav = NativeStackNavigationProp<HomeStackParamList, "DiscoveryCategoryDetail">;

function DiscoveryCategoryDetailScreenImpl() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { mainTab, categoryId } = route.params;

  const category = useMemo(() => {
    if (!isDiscoveryCategoryId(categoryId)) return undefined;
    return getDiscoveryCategoryRow(mainTab, categoryId);
  }, [categoryId, mainTab]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category?.label ?? "",
      headerShadowVisible: false,
      headerStyle: { backgroundColor: "#FFFFFF" },
    });
  }, [category?.label, navigation]);

  const chip = discoverySearchChip(mainTab);
  const iconFor = useCallback((id: DiscoverySubId) => SUB_ICON[id] ?? "ellipse-outline", []);

  const openProviders = useCallback(
    (item: SubcategoryItem<DiscoverySubId>) => {
      navigation.navigate("Search", {
        screen: "ProviderListing",
        params: {
          serviceName: item.label,
          initialQuery: "",
          ...(chip ? { initialChip: chip } : {}),
        },
      });
    },
    [chip, navigation],
  );

  if (!category) {
    return <View style={styles.fallback} />;
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SubcategoryCards<DiscoverySubId>
        mode="navigate"
        items={category.sub}
        transitionKey={category.id}
        iconFor={iconFor}
        onPressItem={openProviders}
        style={styles.grid}
      />
    </ScrollView>
  );
}

export const DiscoveryCategoryDetailScreen = memo(DiscoveryCategoryDetailScreenImpl);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fallback: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: gs.md,
    paddingTop: gs.md,
    paddingBottom: gs.xl + 8,
  },
  grid: {
    marginTop: 0,
  },
});
