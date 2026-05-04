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
  rating: number;
  reviewCount: number;
  priceFrom: number;
  category: string;
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
    rating: 4.9,
    reviewCount: 210,
    priceFrom: 85,
    category: 'Home',
  },
  {
    id: 'pr2',
    name: 'Lens & Light Photo',
    imageColor: '#FECACA',
    rating: 4.8,
    reviewCount: 132,
    priceFrom: 200,
    category: 'Photo',
  },
  {
    id: 'pr3',
    name: 'TechTune IT',
    imageColor: '#BBF7D0',
    rating: 4.7,
    reviewCount: 88,
    priceFrom: 120,
    category: 'Tech',
  },
  {
    id: 'pr4',
    name: 'Velvet Events',
    imageColor: '#E9D5FF',
    rating: 5.0,
    reviewCount: 54,
    priceFrom: 450,
    category: 'Events',
  },
  {
    id: 'pr5',
    name: 'Summit Catering',
    imageColor: '#FED7AA',
    rating: 4.9,
    reviewCount: 164,
    priceFrom: 65,
    category: 'Catering',
  },
  {
    id: 'pr6',
    name: 'Pulse DJ Collective',
    imageColor: '#A5B4FC',
    rating: 4.8,
    reviewCount: 203,
    priceFrom: 320,
    category: 'DJ',
  },
  {
    id: 'pr7',
    name: 'Artisan Bites Co.',
    imageColor: '#FBCFE8',
    rating: 4.7,
    reviewCount: 98,
    priceFrom: 48,
    category: 'Catering',
  },
  {
    id: 'pr8',
    name: 'Metro Vinyl DJs',
    imageColor: '#5EEAD4',
    rating: 4.9,
    reviewCount: 141,
    priceFrom: 280,
    category: 'DJ',
  },
  {
    id: 'pr9',
    name: 'Snap Studio Booth',
    imageColor: '#CBD5E1',
    rating: 4.6,
    reviewCount: 76,
    priceFrom: 175,
    category: 'Photo',
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
