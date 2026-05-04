import { create } from 'zustand';

export type AppRole = 'user' | 'provider';

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
};

export type AppFlow = 'splash' | 'welcome' | 'login' | 'role_select' | 'main';

type AuthState = {
  appFlow: AppFlow;
  isAuthenticated: boolean;
  isGuest: boolean;
  currentRole: AppRole | null;
  user: UserProfile | null;
  setAppFlow: (flow: AppFlow) => void;
  continueAsGuest: () => void;
  beginLogin: () => void;
  completeMockLogin: () => void;
  setRole: (role: AppRole) => void;
  logout: () => void;
};

const initialUser: UserProfile = {
  id: 'u1',
  name: 'Alex Rivers',
  email: 'alex@example.com',
  avatarColor: '#93C5FD',
};

export const useAuthStore = create<AuthState>((set) => ({
  appFlow: 'splash',
  isAuthenticated: false,
  isGuest: false,
  currentRole: null,
  user: null,

  setAppFlow: (flow) => set({ appFlow: flow }),

  continueAsGuest: () =>
    set({
      isGuest: true,
      isAuthenticated: false,
      currentRole: null,
      user: null,
      appFlow: 'main',
    }),

  beginLogin: () => set({ appFlow: 'login' }),

  completeMockLogin: () =>
    set({
      isAuthenticated: true,
      isGuest: false,
      currentRole: null,
      user: initialUser,
      appFlow: 'role_select',
    }),

  setRole: (role) =>
    set({
      currentRole: role,
      appFlow: 'main',
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      isGuest: false,
      currentRole: null,
      user: null,
      appFlow: 'welcome',
    }),
}));
