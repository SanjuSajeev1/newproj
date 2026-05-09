export type Story = {
  id: string;
  name: string;
  avatarUrl: string;
  color: string;
};

export type Post = {
  id: string;
  authorName: string;
  authorAvatar: string;
  caption: string;
  likes: number;
  comments: number;
  /** Placeholder tint for feed media. */
  imageColor?: string;
};

export type ServiceProvider = {
  id: string;
  name: string;
  imageColor: string;
  /** Large portfolio/cover image for listings. */
  coverImageUrl?: string;
  /** Profile portrait image for avatar. */
  profileImageUrl?: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  category: string;
  location?: string;
  /** Contact email shown on provider profile. */
  email?: string;
  bio?: string;
  verified?: boolean;
  availability?: string;
  experienceYears?: number;
  /** List of service keywords supported by this provider. */
  services?: string[];
  /** Popularity score for "Most Popular" sorting. */
  popularity?: number;
  /** Used for "Recently Added" sorting. */
  createdAt?: string;
  /** Profile stats */
  completedBookings?: number;
  responseTime?: string;
  /** Portfolio items for profile */
  portfolio?: import('../features/profile/components/PortfolioGallery').PortfolioItem[];
};

export type ChatThread = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  /** Optional tint for list avatars. */
  avatarColor?: string;
};

export type Message = {
  id: string;
  text: string;
  isMine: boolean;
  time: string;
};

export const MOCK_STORIES: Story[] = [
  { id: '1', name: 'Alex', avatarUrl: '', color: '#93C5FD' },
  { id: '2', name: 'Jordan', avatarUrl: '', color: '#FCA5A5' },
  { id: '3', name: 'Sam', avatarUrl: '', color: '#86EFAC' },
  { id: '4', name: 'Riley', avatarUrl: '', color: '#FDE047' },
  { id: '5', name: 'Casey', avatarUrl: '', color: '#C4B5FD' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    authorName: 'Studio North',
    authorAvatar: '',
    caption:
      'Fresh interior styling session — book a walkthrough this week. We bring samples, mood boards, and a clear plan so you can relax while your space comes together.',
    likes: 128,
    comments: 14,
    imageColor: '#C7D2FE',
  },
  {
    id: 'p2',
    authorName: 'Urban Fix',
    authorAvatar: '',
    caption:
      'Same-day handyman slots open in downtown. Minor repairs, furniture assembly, and smart-home installs — message us with photos for a fast quote.',
    likes: 89,
    comments: 6,
    imageColor: '#FECDD3',
  },
  {
    id: 'p3',
    authorName: 'Glow Co.',
    authorAvatar: '',
    caption:
      'Skincare pop-up this Saturday with limited spots. Mini facials, LED add-ons, and a take-home routine card so you keep glowing after you leave.',
    likes: 204,
    comments: 31,
    imageColor: '#FDE68A',
  },
  {
    id: 'p4',
    authorName: 'Lens & Light',
    authorAvatar: '',
    caption:
      'Golden-hour portraits are back on the calendar. Perfect for creators, couples, and small brands who want editorial polish without the studio price tag.',
    likes: 312,
    comments: 48,
    imageColor: '#DDD6FE',
  },
];

export const MOCK_PROVIDERS: ServiceProvider[] = [
  {
    id: 'pr1',
    name: 'Northside Cleaning',
    imageColor: '#BFDBFE',
    coverImageUrl: 'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&q=85',
    rating: 4.9,
    reviewCount: 210,
    priceFrom: 85,
    category: 'Home',
    location: 'Indiranagar',
    email: 'northside.cleaning@mock.app',
    bio: 'Deep cleans and weekly refresh — punctual, quiet, spotless.',
    verified: true,
    availability: 'Available this week',
    experienceYears: 6,
    services: ['Home Cleaning'],
    popularity: 82,
    createdAt: '2026-03-18',
  },
  {
    id: 'pr2',
    name: 'Lens & Light Photo',
    imageColor: '#FECACA',
    coverImageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1520975682031-ae5d4d9b5a66?w=600&q=85',
    rating: 4.8,
    reviewCount: 132,
    priceFrom: 200,
    category: 'Photo',
    location: 'Koramangala',
    email: 'hello@lensandlight.mock.app',
    bio: 'Golden hour portraits and event coverage with editorial polish.',
    verified: true,
    availability: 'Next slot: Sat',
    experienceYears: 7,
    services: ['Photographer', 'Photography', 'Photo Booth Setup'],
    popularity: 91,
    createdAt: '2026-02-04',
    completedBookings: 214,
    responseTime: 'Within 1 hour',
    portfolio: [
      { id: 'p-1', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=85' },
      { id: 'p-2', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1520975682031-ae5d4d9b5a66?w=900&q=85' },
      { id: 'p-3', type: 'video', thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85' },
      { id: 'p-4', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=85' },
      { id: 'p-5', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&q=85' },
      { id: 'p-6', type: 'video', thumbnailUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=85' },
    ],
  },
  {
    id: 'pr3',
    name: 'TechTune IT',
    imageColor: '#BBF7D0',
    coverImageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=85',
    rating: 4.7,
    reviewCount: 88,
    priceFrom: 120,
    category: 'Tech',
    location: 'HSR Layout',
    email: 'support@techtune.mock.app',
    bio: 'Fast fixes, clean setups, and long-term support for teams.',
    verified: false,
    availability: 'Available today',
    experienceYears: 5,
    services: ['Backend Developer', 'Web Developer', 'Full Stack Developer'],
    popularity: 66,
    createdAt: '2026-04-10',
  },
  {
    id: 'pr4',
    name: 'Velvet Events',
    imageColor: '#E9D5FF',
    coverImageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=85',
    rating: 5.0,
    reviewCount: 54,
    priceFrom: 450,
    category: 'Events',
    location: 'Indiranagar',
    email: 'events@velvet.mock.app',
    bio: 'Full-service event planning with premium vendor coordination.',
    verified: true,
    availability: 'Bookings open',
    experienceYears: 8,
    services: ['Anchor / MC', 'Sound Engineer', 'Lighting Setup'],
    popularity: 77,
    createdAt: '2026-01-22',
  },
  {
    id: 'pr5',
    name: 'Summit Catering',
    imageColor: '#FED7AA',
    coverImageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=85',
    rating: 4.9,
    reviewCount: 164,
    priceFrom: 65,
    category: 'Catering',
    location: 'Whitefield',
    email: 'bookings@summit.mock.app',
    bio: 'Modern menus, impeccable service, and flawless setup.',
    verified: true,
    availability: 'Available this week',
    experienceYears: 10,
    services: ['Catering Service', 'Private Chef', 'Dessert Counter', 'Cake Designer'],
    popularity: 89,
    createdAt: '2025-12-14',
  },
  {
    id: 'pr6',
    name: 'Pulse DJ Collective',
    imageColor: '#A5B4FC',
    coverImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=85',
    rating: 4.8,
    reviewCount: 203,
    priceFrom: 320,
    category: 'DJ',
    location: 'Koramangala',
    email: 'book@pulse-dj.mock.app',
    bio: 'Crowd-reading sets with pro sound — weddings, clubs, and festivals.',
    verified: true,
    availability: 'Available this weekend',
    experienceYears: 9,
    services: ['DJ', 'Karaoke Host'],
    popularity: 98,
    createdAt: '2026-04-28',
    completedBookings: 312,
    responseTime: 'Within 2 hours',
    portfolio: [
      { id: 'dj-1', type: 'video', thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=85' },
      { id: 'dj-2', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=900&q=85' },
      { id: 'dj-3', type: 'video', thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=85' },
      { id: 'dj-4', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=85' },
      { id: 'dj-5', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=900&q=85' },
    ],
  },
  {
    id: 'pr7',
    name: 'Artisan Bites Co.',
    imageColor: '#FBCFE8',
    coverImageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=85',
    rating: 4.7,
    reviewCount: 98,
    priceFrom: 48,
    category: 'Catering',
    location: 'HSR Layout',
    email: 'chef@artisanbites.mock.app',
    bio: 'Fresh, seasonal bites with boutique presentation.',
    verified: false,
    availability: 'Limited slots',
    experienceYears: 4,
    services: ['Catering Service', 'Food Truck'],
    popularity: 58,
    createdAt: '2026-05-01',
  },
  {
    id: 'pr8',
    name: 'Metro Vinyl DJs',
    imageColor: '#5EEAD4',
    coverImageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&q=85',
    rating: 4.9,
    reviewCount: 141,
    priceFrom: 280,
    category: 'DJ',
    location: 'Indiranagar',
    email: 'booking@metrovinyl.mock.app',
    bio: 'Vinyl-forward sets with classy transitions and warm grooves.',
    verified: true,
    availability: 'Available this week',
    experienceYears: 11,
    services: ['DJ'],
    popularity: 84,
    createdAt: '2026-03-02',
  },
  {
    id: 'pr9',
    name: 'Snap Studio Booth',
    imageColor: '#CBD5E1',
    coverImageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&q=85',
    rating: 4.6,
    reviewCount: 76,
    priceFrom: 175,
    category: 'Photo',
    location: 'Whitefield',
    email: 'hello@snapstudio.mock.app',
    bio: 'Photo booth + props + instant prints — sleek setups.',
    verified: true,
    availability: 'Available this week',
    experienceYears: 3,
    services: ['Photo Booth Setup', 'Live Streaming Team'],
    popularity: 61,
    createdAt: '2026-04-20',
  },
  {
    id: 'pr10',
    name: 'Bridal Glow Studio',
    imageColor: '#FBCFE8',
    coverImageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=85',
    rating: 4.9,
    reviewCount: 187,
    priceFrom: 299,
    category: 'Beauty',
    location: 'Koramangala',
    email: 'hello@bridalglow.mock.app',
    bio: 'Soft glam and bridal looks with skin-first prep and longevity.',
    verified: true,
    availability: 'Available this week',
    experienceYears: 7,
    services: ['Makeup Artist', 'Bridal Makeover Artist'],
    popularity: 92,
    createdAt: '2026-04-14',
    completedBookings: 168,
    responseTime: 'Within 30 mins',
    portfolio: [
      { id: 'b-1', type: 'video', thumbnailUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=85' },
      { id: 'b-2', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1526045478516-99145907023c?w=900&q=85' },
      { id: 'b-3', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=85' },
      { id: 'b-4', type: 'photo', thumbnailUrl: 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?w=900&q=85' },
      { id: 'b-5', type: 'video', thumbnailUrl: 'https://images.unsplash.com/photo-1520975693411-bf55f4a10b57?w=900&q=85' },
    ],
  },
  {
    id: 'pr11',
    name: 'Mehndi by Aanya',
    imageColor: '#FDE68A',
    coverImageUrl: 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=85',
    rating: 4.8,
    reviewCount: 221,
    priceFrom: 149,
    category: 'Beauty',
    location: 'HSR Layout',
    email: 'aanya@mehndi.mock.app',
    bio: 'Fine-line bridal mehndi with custom motifs and fast, clean work.',
    verified: true,
    availability: 'Next slot: Sun',
    experienceYears: 9,
    services: ['Henna Artist'],
    popularity: 88,
    createdAt: '2026-03-30',
  },
  {
    id: 'pr12',
    name: 'CodeCraft Studio',
    imageColor: '#BFDBFE',
    coverImageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1600&q=85',
    profileImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=85',
    rating: 4.8,
    reviewCount: 104,
    priceFrom: 399,
    category: 'Tech',
    location: 'Indiranagar',
    email: 'team@codecraft.mock.app',
    bio: 'Modern websites and apps — fast, responsive, conversion-focused.',
    verified: true,
    availability: 'Available this week',
    experienceYears: 6,
    services: ['Web Developer', 'Frontend Developer', 'Full Stack Developer'],
    popularity: 79,
    createdAt: '2026-05-03',
  },
];

export const MOCK_CHAT_THREADS: ChatThread[] = [
  {
    id: 'c1',
    name: 'Northside Cleaning',
    lastMessage: 'We can arrive between 2–4pm.',
    time: '10:42',
    unread: 2,
    avatarColor: '#BFDBFE',
  },
  {
    id: 'c2',
    name: 'Lens & Light Photo',
    lastMessage: 'Sent the mood board!',
    time: 'Yesterday',
    unread: 0,
    avatarColor: '#FECACA',
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  c1: [
    { id: 'm1', text: 'Hi! Need a deep clean this Friday.', isMine: true, time: '10:38' },
    { id: 'm2', text: 'Absolutely — what size is the place?', isMine: false, time: '10:39' },
    { id: 'm3', text: '2 bed, 900 sq ft.', isMine: true, time: '10:40' },
    { id: 'm4', text: 'We can arrive between 2–4pm.', isMine: false, time: '10:42' },
  ],
  c2: [
    { id: 'm1', text: 'Can we do golden hour?', isMine: true, time: 'Yesterday' },
    { id: 'm2', text: 'Sent the mood board!', isMine: false, time: 'Yesterday' },
  ],
};

export const MOCK_REVIEWS = [
  { id: 'r1', author: 'Jamie L.', rating: 5, text: 'Punctual, spotless work. Would rebook.' },
  { id: 'r2', author: 'Morgan P.', rating: 4, text: 'Great communication and fair pricing.' },
];

export const MOCK_PRICING = [
  { id: 't1', label: 'Standard visit', price: 120, detail: 'Up to 2 hours' },
  { id: 't2', label: 'Deep clean', price: 220, detail: 'Whole home' },
  { id: 't3', label: 'Move-out', price: 280, detail: 'Add-on windows' },
];

export const MOCK_BOOKING_REQUESTS = [
  { id: 'br1', client: 'Alex M.', service: 'Deep clean', date: 'May 6', time: '2:00 PM' },
  { id: 'br2', client: 'Sam K.', service: 'Standard visit', date: 'May 8', time: '10:00 AM' },
];

export type ProviderDashboardBookingStatus = 'pending' | 'confirmed';

export type ProviderDashboardBooking = {
  id: string;
  client: string;
  service: string;
  date: string;
  time: string;
  status: ProviderDashboardBookingStatus;
};

export const MOCK_PROVIDER_STATS = {
  /** Bookings completed or scheduled this month. */
  bookingsThisMonth: 28,
  /** Gross earnings this month (USD). */
  earningsUsd: 4280,
} as const;

export const MOCK_PROVIDER_DASHBOARD_BOOKINGS: ProviderDashboardBooking[] = [
  {
    id: 'db1',
    client: 'Alex M.',
    service: 'Deep clean',
    date: 'May 6',
    time: '2:00 PM',
    status: 'pending',
  },
  {
    id: 'db2',
    client: 'Jordan P.',
    service: 'Move-out',
    date: 'May 12',
    time: '9:00 AM',
    status: 'pending',
  },
  {
    id: 'db3',
    client: 'Sam K.',
    service: 'Standard visit',
    date: 'May 8',
    time: '10:00 AM',
    status: 'confirmed',
  },
  {
    id: 'db4',
    client: 'Riley T.',
    service: 'Deep clean',
    date: 'May 3',
    time: '1:00 PM',
    status: 'confirmed',
  },
  {
    id: 'db5',
    client: 'Morgan L.',
    service: 'Windows add-on',
    date: 'May 15',
    time: '11:30 AM',
    status: 'confirmed',
  },
];
