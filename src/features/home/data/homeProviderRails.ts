import { MOCK_PROVIDERS, type ServiceProvider } from "../../../constants/mockData";
import type { HomeDiscoveryProvider } from "./homeDashboardMock";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=85";

export function toHomeDiscoveryProvider(p: ServiceProvider): HomeDiscoveryProvider {
  const imageUrl = p.coverImageUrl ?? p.profileImageUrl ?? FALLBACK_IMAGE;
  return {
    id: p.id,
    name: p.name,
    category: p.services?.[0] ?? p.category,
    rating: p.rating,
    startingPrice: p.priceFrom,
    imageUrl,
    location: p.location ?? "Bangalore",
  };
}

export function getTopRatedArtistsForHome(limit = 8): HomeDiscoveryProvider[] {
  return [...MOCK_PROVIDERS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
    .map(toHomeDiscoveryProvider);
}

/** Mock "near me": prefer same neighborhood label, else fall back to popularity. */
export function getNearMeArtistsForHome(
  neighborhood: string,
  limit = 8,
): HomeDiscoveryProvider[] {
  const n = neighborhood.trim().toLowerCase();
  const ranked = [...MOCK_PROVIDERS].sort((a, b) => {
    const score = (p: ServiceProvider) => {
      const loc = (p.location ?? "").toLowerCase();
      if (n && (loc === n || loc.includes(n) || n.includes(loc))) return 1000 + (p.popularity ?? 0);
      return p.popularity ?? 0;
    };
    return score(b) - score(a);
  });
  return ranked.slice(0, limit).map(toHomeDiscoveryProvider);
}

export function getAllArtistsRailForHome(limit = 10): HomeDiscoveryProvider[] {
  return [...MOCK_PROVIDERS]
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, limit)
    .map(toHomeDiscoveryProvider);
}
