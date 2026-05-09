import type { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import type { InlineServiceTabId } from "../components/InlineServiceTabs";
import type { SubcategoryItem } from "../components/SubcategoryCards";
import type { HomeDiscoveryProvider } from "./homeDashboardMock";

export type IonGlyph = ComponentProps<typeof Ionicons>["name"];

export type DiscoveryCategoryId =
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

export type DiscoverySubId =
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

export type DiscoveryCategoryRow = {
  id: DiscoveryCategoryId;
  label: string;
  /** Hero image for discovery category cards */
  imageUrl: string;
  sub: SubcategoryItem<DiscoverySubId>[];
};

export const CATEGORY_ICON: Record<DiscoveryCategoryId, IonGlyph> = {
  "music-entertainment": "musical-notes-outline",
  "photography-media": "camera-outline",
  "food-catering": "restaurant-outline",
  "decoration-setup": "sparkles-outline",
  "artists-creators": "color-palette-outline",
  "design-performers": "mic-outline",
  "dev-product": "code-slash-outline",
  "branding-growth": "trending-up-outline",
  "makeup-bridal": "diamond-outline",
  "hair-mehendi": "cut-outline",
};

export const SUB_ICON: Record<DiscoverySubId, IonGlyph> = {
  dj: "radio-outline",
  "live-band": "people-outline",
  singer: "mic-outline",
  photography: "aperture-outline",
  videography: "videocam-outline",
  catering: "fast-food-outline",
  decor: "flower-outline",
  artist: "brush-outline",
  designer: "pencil-outline",
  developer: "laptop-outline",
  marketing: "megaphone-outline",
  makeup: "sparkles-outline",
  bridal: "heart-outline",
  mehendi: "hand-left-outline",
  hairstyle: "cut-outline",
};

const DATA: Record<
  InlineServiceTabId,
  { categories: DiscoveryCategoryRow[] }
> = {
  events: {
    categories: [
      {
        id: "music-entertainment",
        label: "Music & Entertainment",
        imageUrl:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=85",
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
        imageUrl:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=85",
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
        imageUrl:
          "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=85",
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
        imageUrl:
          "https://images.unsplash.com/photo-1524292332709-b33366e086ff?w=800&q=85",
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
    categories: [
      {
        id: "artists-creators",
        label: "Artists & Creators",
        imageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=85",
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
        imageUrl:
          "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=85",
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
    categories: [
      {
        id: "dev-product",
        label: "Build & Product",
        imageUrl:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&q=85",
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
        imageUrl:
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=85",
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
    categories: [
      {
        id: "makeup-bridal",
        label: "Makeup & Bridal",
        imageUrl:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=85",
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
        imageUrl:
          "https://images.unsplash.com/photo-1526045478516-99145907023c?w=800&q=85",
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

export function getDiscoveryCategories(
  tab: InlineServiceTabId,
): DiscoveryCategoryRow[] {
  return DATA[tab].categories;
}

export function getDiscoveryCategoryRow(
  tab: InlineServiceTabId,
  categoryId: DiscoveryCategoryId,
): DiscoveryCategoryRow | undefined {
  return DATA[tab].categories.find((c) => c.id === categoryId);
}

/** Optional filter chip passed to ProviderListing for the given main tab. */
export function discoverySearchChip(
  tab: InlineServiceTabId,
): "Events" | "Tech" | undefined {
  if (tab === "events") return "Events";
  if (tab === "digital-services") return "Tech";
  return undefined;
}

export function keywordForSub(sub: DiscoverySubId): string {
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

export function normalize(s: string): string {
  return s.toLowerCase();
}

export function filterDiscoveryProvidersByKeyword(
  items: HomeDiscoveryProvider[],
  keyword: string,
): HomeDiscoveryProvider[] {
  const k = normalize(keyword);
  const out = items.filter((p) =>
    normalize(`${p.name} ${p.category} ${p.location}`).includes(k),
  );
  return out.length > 0 ? out : items;
}

const ALL_DISCOVERY_CATEGORY_IDS = new Set<DiscoveryCategoryId>(
  (["events", "arts-creative", "digital-services", "beauty-styling"] as const).flatMap(
    (tab) => DATA[tab].categories.map((c) => c.id),
  ),
);

export function isDiscoveryCategoryId(
  raw: string,
): raw is DiscoveryCategoryId {
  return ALL_DISCOVERY_CATEGORY_IDS.has(raw as DiscoveryCategoryId);
}
