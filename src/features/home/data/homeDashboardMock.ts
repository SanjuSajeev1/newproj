export type HomeCategory = {
  id: string;
  label: string;
  icon: 'musical-notes' | 'restaurant' | 'camera' | 'color-palette';
  cut: 'topRight' | 'bottomLeft';
};

export const HOME_CATEGORIES: HomeCategory[] = [
  { id: 'dj', label: 'DJ', icon: 'musical-notes', cut: 'topRight' },
  { id: 'catering', label: 'Catering', icon: 'restaurant', cut: 'bottomLeft' },
  { id: 'photo', label: 'Photography', icon: 'camera', cut: 'bottomLeft' },
  { id: 'artist', label: 'Artist', icon: 'color-palette', cut: 'topRight' },
];

export type FeaturedProvider = {
  id: string;
  name: string;
  rating: number;
  imageUrl: string;
};

export const HOME_FEATURED_PROVIDERS: FeaturedProvider[] = [
  {
    id: 'f1',
    name: 'Luna Events',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
  },
  {
    id: 'f2',
    name: 'Velvet Sound',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&q=80',
  },
  {
    id: 'f3',
    name: 'Bloom & Co.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
  },
  {
    id: 'f4',
    name: 'Frame Studio',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
  },
];

export type UpcomingBooking = {
  providerName: string;
  dateLabel: string;
  status: 'Confirmed' | 'Pending';
};

export const HOME_UPCOMING_BOOKING: UpcomingBooking | null = {
  providerName: 'Northside Cleaning',
  dateLabel: 'Sat, May 10 · 2:00 PM',
  status: 'Confirmed',
};

export const HOME_BACKGROUND_URI =
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85';
