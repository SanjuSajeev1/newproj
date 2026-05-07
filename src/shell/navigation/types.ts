export type HomeStackParamList = {
  HomeMain: undefined;
  StoryViewer: { initialIndex: number };
  Events: undefined;
  ArtsCreative: undefined;
  DigitalServices: undefined;
  BeautyStyling: undefined;
  SubCategoryFull: {
    main: 'events' | 'arts' | 'digital' | 'beauty';
    sub: import('../../features/services/data/serviceCatalog').SubCategoryId;
  };
};

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

export type ProfileStackParamList = {
  ProfileMain: undefined;
  SavedItems: undefined;
  BookingHistory: undefined;
};

export type GuestProfileStackParamList = {
  ProfileMain: undefined;
};

export type DashboardStackParamList = {
  DashboardMain: undefined;
  StoryUpload: undefined;
  StoryUploadPreview: undefined;
};

export type GuestTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  ProfileTab: undefined;
};

export type UserTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  BookingsTab: undefined;
  ChatTab: undefined;
  ProfileTab: undefined;
};

export type ProviderTabParamList = {
  HomeTab: undefined;
  DashboardTab: undefined;
  BookingsTab: undefined;
  ChatTab: undefined;
  ProfileTab: undefined;
};
