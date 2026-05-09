import { memo, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { spacing } from "../../../constants/theme";
import type { HomeDiscoveryProvider } from "../data/homeDashboardMock";
import { gs } from "../constants/glassTheme";
import type { CategoryChipItem } from "./CategoryChipRow";
import { CategoryChipRow } from "./CategoryChipRow";
import { SubcategoryCards, type SubcategoryItem } from "./SubcategoryCards";
import { DynamicProviderSection } from "./DynamicProviderSection";
import type { InlineServiceTabId } from "./InlineServiceTabs";

type CategoryId =
  | "music-entertainment"
  | "photography-media"
  | "food-catering"
  | "decoration-setup"
  | "artists-creators"
  | "design-performers"
  | "dev-product"
  | "branding-growth"
  | "makeup-bridal"
  | "hair-mehendi";

type SubId =
  | "dj"
  | "live-band"
  | "singer"
  | "photography"
  | "videography"
  | "catering"
  | "decor"
  | "artist"
  | "designer"
  | "developer"
  | "marketing"
  | "makeup"
  | "bridal"
  | "mehendi"
  | "hairstyle";

type Category = CategoryChipItem<CategoryId> & {
  sub: SubcategoryItem<SubId>[];
};

type Props = {
  tab: InlineServiceTabId;
  providersTopRated: HomeDiscoveryProvider[];
  providersTrending: HomeDiscoveryProvider[];
  providersRecent: HomeDiscoveryProvider[];
  onPressProvider: (providerId: string) => void;
};

const DATA: Record<
  InlineServiceTabId,
  { title: string; categories: Category[] }
> = {
  events: {
    title: "Events",
    categories: [
      {
        id: "music-entertainment",
        label: "Music & Entertainment",
        sub: [
          {
            id: "dj",
            label: "DJ",
            imageUrl:
              "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85",
          },
          {
            id: "live-band",
            label: "Live Band",
            imageUrl:
              "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=85",
          },
          {
            id: "singer",
            label: "Singer",
            imageUrl:
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=85",
          },
        ],
      },
      {
        id: "photography-media",
        label: "Photography & Media",
        sub: [
          {
            id: "photography",
            label: "Photography",
            imageUrl:
              "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=85",
          },
          {
            id: "videography",
            label: "Videography",
            imageUrl:
              "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=85",
          },
        ],
      },
      {
        id: "food-catering",
        label: "Food & Catering",
        sub: [
          {
            id: "catering",
            label: "Catering",
            imageUrl:
              "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=85",
          },
        ],
      },
      {
        id: "decoration-setup",
        label: "Decoration & Setup",
        sub: [
          {
            id: "decor",
            label: "Decor",
            imageUrl:
              "https://images.unsplash.com/photo-1524292332709-b33366e086ff?w=800&q=85",
          },
        ],
      },
    ],
  },
  "arts-creative": {
    title: "Arts & Creative",
    categories: [
      {
        id: "artists-creators",
        label: "Artists & Creators",
        sub: [
          {
            id: "artist",
            label: "Artist",
            imageUrl:
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=85",
          },
          {
            id: "designer",
            label: "Designer",
            imageUrl:
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=85",
          },
        ],
      },
      {
        id: "design-performers",
        label: "Performers",
        sub: [
          {
            id: "singer",
            label: "Singer",
            imageUrl:
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=85",
          },
        ],
      },
    ],
  },
  "digital-services": {
    title: "Digital Services",
    categories: [
      {
        id: "dev-product",
        label: "Build & Product",
        sub: [
          {
            id: "developer",
            label: "Developer",
            imageUrl:
              "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&q=85",
          },
          {
            id: "designer",
            label: "Designer",
            imageUrl:
              "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=85",
          },
        ],
      },
      {
        id: "branding-growth",
        label: "Branding & Growth",
        sub: [
          {
            id: "marketing",
            label: "Marketing",
            imageUrl:
              "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=85",
          },
        ],
      },
    ],
  },
  "beauty-styling": {
    title: "Beauty & Styling",
    categories: [
      {
        id: "makeup-bridal",
        label: "Makeup & Bridal",
        sub: [
          {
            id: "makeup",
            label: "Makeup",
            imageUrl:
              "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=85",
          },
          {
            id: "bridal",
            label: "Bridal",
            imageUrl:
              "https://images.unsplash.com/photo-1523260578934-e9318da58c8d?w=800&q=85",
          },
        ],
      },
      {
        id: "hair-mehendi",
        label: "Hair & Mehendi",
        sub: [
          {
            id: "mehendi",
            label: "Mehendi",
            imageUrl:
              "https://images.unsplash.com/photo-1526045478516-99145907023c?w=800&q=85",
          },
          {
            id: "hairstyle",
            label: "Hairstyle",
            imageUrl:
              "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=85",
          },
        ],
      },
    ],
  },
};

function keywordForSub(sub: SubId) {
  switch (sub) {
    case "dj":
      return "dj";
    case "live-band":
      return "band";
    case "singer":
      return "singer";
    case "photography":
      return "photo";
    case "videography":
      return "video";
    case "catering":
      return "catering";
    case "decor":
      return "decor";
    case "artist":
      return "artist";
    case "designer":
      return "design";
    case "developer":
      return "web";
    case "marketing":
      return "marketing";
    case "makeup":
      return "makeup";
    case "bridal":
      return "bridal";
    case "mehendi":
      return "henna";
    case "hairstyle":
      return "hair";
  }
}

function normalize(s: string) {
  return s.toLowerCase();
}

function filterByKeyword(items: HomeDiscoveryProvider[], keyword: string) {
  const k = normalize(keyword);
  const out = items.filter((p) =>
    normalize(`${p.name} ${p.category} ${p.location}`).includes(k),
  );
  return out.length > 0 ? out : items;
}

function ServiceDiscoveryLayoutImpl({
  tab,
  providersTopRated,
  providersTrending,
  providersRecent,
  onPressProvider,
}: Props) {
  const def = DATA[tab];
  const categories = def.categories;

  const [categoryId, setCategoryId] = useState<CategoryId>(
    categories[0]?.id ?? "music-entertainment",
  );
  const category = useMemo(
    () => categories.find((c) => c.id === categoryId) ?? categories[0],
    [categories, categoryId],
  );

  const [subId, setSubId] = useState<SubId>(category?.sub[0]?.id ?? "dj");

  useEffect(() => {
    // reset when main tab changes
    const first = DATA[tab].categories[0];
    setCategoryId(first.id);
    setSubId(first.sub[0].id);
  }, [tab]);

  useEffect(() => {
    // reset when chip changes
    if (!category) return;
    setSubId(category.sub[0]?.id ?? subId);
  }, [categoryId]); // eslint-disable-line react-hooks/exhaustive-deps

  const contextLabel = useMemo(() => {
    const sub = category?.sub.find((s) => s.id === subId);
    return sub?.label ?? def.title;
  }, [category?.sub, def.title, subId]);

  const keyword = keywordForSub(subId);

  const topRated = useMemo(
    () => filterByKeyword(providersTopRated, keyword).slice(0, 8),
    [keyword, providersTopRated],
  );
  const trending = useMemo(
    () => filterByKeyword(providersTrending, keyword).slice(0, 8),
    [keyword, providersTrending],
  );
  const recent = useMemo(
    () => filterByKeyword(providersRecent, keyword).slice(0, 8),
    [keyword, providersRecent],
  );

  return (
    <View style={styles.wrap}>
      <Text style={styles.sectionTitle}>{def.title}</Text>
      <CategoryChipRow
        items={categories}
        value={categoryId}
        onChange={setCategoryId}
      />

      {category ? (
        <SubcategoryCards
          title={category.label}
          items={category.sub}
          value={subId}
          onChange={setSubId}
          transitionKey={category.id}
        />
      ) : null}

      <DynamicProviderSection
        contextLabel={contextLabel}
        topRated={topRated}
        trending={trending}
        recent={recent}
        onPressProvider={onPressProvider}
      />
    </View>
  );
}

export const ServiceDiscoveryLayout = memo(ServiceDiscoveryLayoutImpl);

const styles = StyleSheet.create({
  wrap: {
    marginTop: gs.lg,
    paddingBottom: gs.md,
  },
  sectionTitle: {
    paddingHorizontal: spacing.md,
    marginBottom: gs.sm,
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.6,
  },
});
