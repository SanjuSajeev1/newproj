export type HomeCategory = {
  id: string;
  label: string;
  icon:
    | "musical-notes"
    | "restaurant"
    | "camera"
    | "color-palette"
    | "gift"
    | "heart"
    | "business"
    | "mic"
    | "flower"
    | "videocam";
  cut: "topRight" | "bottomLeft";
};

export type HomeServiceCategory = {
  id: "events" | "arts-creative" | "digital-services" | "beauty-styling";
  title: string;
  subtitle?: string;
  imageUrl: string;
};

export type HomeDiscoveryProvider = {
  id: string;
  name: string;
  category: string;
  rating: number;
  startingPrice: number;
  imageUrl: string;
  location: string;
};

export type HomeEventPlan = {
  id: string;
  label: string;
  imageUrl: string;
  cut: "topRight" | "bottomLeft";
};

export const HOME_SERVICE_CATEGORIES: HomeServiceCategory[] = [
  {
    id: "events",
    title: "Events",
    subtitle: "Weddings, concerts, parties & everything in between",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=85",
  },
  {
    id: "arts-creative",
    title: "Arts & Creative",
    subtitle: "Artists, performers, designers & creative pros",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=85",
  },
  {
    id: "digital-services",
    title: "Digital Services",
    subtitle: "Web, apps, branding, content & growth",
    imageUrl:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600&q=85",
  },
  {
    id: "beauty-styling",
    title: "Beauty & Styling",
    subtitle: "Makeup, bridal styling, hair, nails & more",
    imageUrl:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=85",
  },
];

export const HOME_TOP_RATED_PROFESSIONALS: HomeDiscoveryProvider[] = [
  {
    id: "top-dj-rahul",
    name: "DJ Rahul",
    category: "DJ · Events",
    rating: 4.9,
    startingPrice: 799,
    location: "Indiranagar",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=85",
  },
  {
    id: "top-pixel-photography",
    name: "Pixel Photography",
    category: "Photography · Events",
    rating: 4.8,
    startingPrice: 499,
    location: "Koramangala",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=85",
  },
  {
    id: "top-elite-caterers",
    name: "Elite Caterers",
    category: "Catering · Events",
    rating: 4.9,
    startingPrice: 999,
    location: "HSR Layout",
    imageUrl:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=85",
  },
];

export const HOME_TRENDING_NEAR_YOU: HomeDiscoveryProvider[] = [
  {
    id: "trend-velvet-sound",
    name: "Velvet Sound",
    category: "DJ · Events",
    rating: 4.7,
    startingPrice: 699,
    location: "Koramangala",
    imageUrl:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&q=85",
  },
  {
    id: "trend-bloom-co",
    name: "Bloom & Co.",
    category: "Decor · Events",
    rating: 4.8,
    startingPrice: 599,
    location: "Indiranagar",
    imageUrl:
      "https://images.unsplash.com/photo-1524292332709-b33366e086ff?w=1200&q=85",
  },
  {
    id: "trend-frame-studio",
    name: "Frame Studio",
    category: "Videography · Events",
    rating: 4.6,
    startingPrice: 549,
    location: "Whitefield",
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=85",
  },
  {
    id: "trend-code-craft",
    name: "CodeCraft Studio",
    category: "Web · Digital",
    rating: 4.8,
    startingPrice: 399,
    location: "HSR Layout",
    imageUrl:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1200&q=85",
  },
];

export const HOME_RECENTLY_ADDED: HomeDiscoveryProvider[] = [
  {
    id: "new-stage-muse",
    name: "Stage Muse",
    category: "Live Performance",
    rating: 4.7,
    startingPrice: 299,
    location: "Koramangala",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=85",
  },
  {
    id: "new-brush-beat",
    name: "Brush & Beat",
    category: "Arts & Creative",
    rating: 4.6,
    startingPrice: 249,
    location: "Indiranagar",
    imageUrl:
      "https://images.unsplash.com/photo-1458538977777-0549b94ea0f3?w=1200&q=85",
  },
  {
    id: "new-nova-dev",
    name: "Nova Dev",
    category: "App Development",
    rating: 4.8,
    startingPrice: 499,
    location: "HSR Layout",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85",
  },
];

export const HOME_EVENT_PLANS: HomeEventPlan[] = [
  {
    id: "birthday",
    label: "Birthday Party",
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1400&q=80",
    cut: "topRight",
  },
  {
    id: "wedding",
    label: "Wedding",
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&q=80",
    cut: "bottomLeft",
  },
  {
    id: "corporate",
    label: "Corporate Event",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1400&q=80",
    cut: "bottomLeft",
  },
  {
    id: "live-show",
    label: "Live Show",
    imageUrl:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1400&q=80",
    cut: "topRight",
  },
];

export const HOME_ALL_SERVICES: HomeCategory[] = [
  { id: "dj", label: "DJ", icon: "musical-notes", cut: "topRight" },
  { id: "catering", label: "Catering", icon: "restaurant", cut: "bottomLeft" },
  { id: "photo", label: "Photography", icon: "camera", cut: "bottomLeft" },
  { id: "artist", label: "Artist", icon: "color-palette", cut: "topRight" },
  { id: "decor", label: "Decor", icon: "flower", cut: "bottomLeft" },
  { id: "video", label: "Videography", icon: "videocam", cut: "topRight" },
];

export type FeaturedProvider = {
  id: string;
  name: string;
  rating: number;
  imageUrl: string;
};

export const HOME_FEATURED_PROVIDERS: FeaturedProvider[] = [
  {
    id: "f1",
    name: "Luna Events",
    rating: 4.9,
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80",
  },
  {
    id: "f2",
    name: "Velvet Sound",
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&q=80",
  },
  {
    id: "f3",
    name: "Bloom & Co.",
    rating: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
  },
  {
    id: "f4",
    name: "Frame Studio",
    rating: 4.7,
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
  },
];

export type HomeHeroSlide = {
  id: string;
  title: string;
  imageUrl: string;
};

export const HOME_HERO_SLIDES: HomeHeroSlide[] = [
  {
    id: "h1",
    title: "DJ Event Nights",
    imageUrl:
      "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=1400&q=80",
  },
  {
    id: "h2",
    title: "Premium Catering Setup",
    imageUrl:
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=1400&q=80",
  },
  {
    id: "h3",
    title: "Photography Sessions",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&q=80",
  },
  {
    id: "h4",
    title: "Live Artist Performance",
    imageUrl:
      "https://images.unsplash.com/photo-1461784121038-f088ca1e7714?w=1400&q=80",
  },
];

export type UpcomingBooking = {
  providerName: string;
  dateLabel: string;
  status: "Confirmed" | "Pending";
};

export const HOME_UPCOMING_BOOKING: UpcomingBooking | null = {
  providerName: "Northside Cleaning",
  dateLabel: "Sat, May 10 · 2:00 PM",
  status: "Confirmed",
};

export const HOME_BACKGROUND_URI =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85";
