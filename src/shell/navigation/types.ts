import type { NavigatorScreenParams } from '@react-navigation/native';

/** Story modal; used from Home and Feed stacks. */
export type StoryViewerParams = { initialIndex?: number };

export type SearchStackParamList = {
  SearchMain:
    | {
        initialChip?: 'All' | 'Catering' | 'DJ' | 'Photo' | 'Events' | 'Home' | 'Tech';
        initialQuery?: string;
      }
    | undefined;
  ProviderListing: { serviceName: string; initialQuery?: string; initialChip?: 'All' | 'Catering' | 'DJ' | 'Photo' | 'Events' | 'Home' | 'Tech' };
  ProviderProfile: { providerId: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  SavedItems: undefined;
  BookingHistory: undefined;
};

export type GuestProfileStackParamList = {
  ProfileMain: undefined;
};

export type HomeMainDiscoveryTabParam =
  | 'events'
  | 'arts-creative'
  | 'digital-services'
  | 'beauty-styling';

export type HomeStackParamList = {
  HomeMain: undefined;
  StoryViewer: StoryViewerParams;
  Events: undefined;
  ArtsCreative: undefined;
  DigitalServices: undefined;
  BeautyStyling: undefined;
  SubCategoryFull: {
    main: 'events' | 'arts' | 'digital' | 'beauty';
    sub: import('../../features/services/data/serviceCatalog').SubCategoryId;
  };
  DiscoveryCategoryDetail: {
    mainTab: HomeMainDiscoveryTabParam;
    categoryId: string;
  };
  Search: NavigatorScreenParams<SearchStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type BookingsStackParamList = {
  BookingsMain: undefined;
  BookingFlow: undefined;
};

export type ProviderBookingsStackParamList = {
  ProviderBookingsMain: undefined;
};

export type ChatStackParamList = {
  ChatList: undefined;
  Conversation: { threadId: string; title: string };
};

export type FeedStackParamList = {
  FeedMain: undefined;
  StoryViewer: StoryViewerParams;
};

export type DashboardStackParamList = {
  DashboardMain: undefined;
  StoryUpload: undefined;
  StoryUploadPreview: undefined;
};

export type GuestTabParamList = {
  HomeTab: undefined;
  FeedTab: undefined;
};

export type UserTabParamList = {
  HomeTab: undefined;
  FeedTab: undefined;
  BookingsTab: undefined;
  ChatTab: undefined;
};

export type ProviderTabParamList = {
  HomeTab: undefined;
  FeedTab: undefined;
  DashboardTab: undefined;
  BookingsTab: undefined;
  ChatTab: undefined;
};
