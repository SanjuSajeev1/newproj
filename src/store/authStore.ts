import { create } from 'zustand';

export type AppRole = 'user' | 'provider';

export type UserProfile = {
  id: string;
  name: string;
  fullName?: string;
  phone?: string;
  avatarColor: string;
};

export type AppFlow =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'otp'
  | 'name'
  | 'role_select'
  | 'main';

type AuthState = {
  appFlow: AppFlow;
  isAuthenticated: boolean;
  isGuest: boolean;
  currentRole: AppRole | null;
  user: UserProfile | null;
  pendingPhone: string | null;
  setAppFlow: (flow: AppFlow) => void;
  continueAsGuest: () => void;
  beginLogin: () => void;
  submitPhone: (phone: string) => void;
  verifyOtp: (otp: string) => void;
  submitName: (name: string, fullName?: string) => void;
  setRole: (role: AppRole) => void;
  logout: () => void;
};

function pickAvatarColor(seed: string) {
  const palette = ['#C7D2FE', '#BAE6FD', '#BBF7D0', '#FDE68A', '#FBCFE8', '#DDD6FE'];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}

export const useAuthStore = create<AuthState>((set) => ({
  appFlow: 'splash',
  isAuthenticated: false,
  isGuest: false,
  currentRole: null,
  user: null,
  pendingPhone: null,

  setAppFlow: (flow) => set({ appFlow: flow }),

  continueAsGuest: () =>
    set({
      isGuest: true,
      isAuthenticated: false,
      currentRole: null,
      user: null,
      pendingPhone: null,
      appFlow: 'main',
    }),

  beginLogin: () => set({ appFlow: 'login' }),

  submitPhone: (phone) =>
    set({
      pendingPhone: phone,
      appFlow: 'otp',
    }),

  verifyOtp: () =>
    set({
      appFlow: 'name',
    }),

  submitName: (name, fullName) =>
    set((s) => {
      const phone = s.pendingPhone ?? undefined;
      return {
        isAuthenticated: true,
        isGuest: false,
        currentRole: null,
        pendingPhone: null,
        user: {
          id: 'u1',
          name: name.trim(),
          fullName: fullName?.trim() || undefined,
          phone,
          avatarColor: pickAvatarColor(name),
        },
        appFlow: 'role_select',
      };
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
      pendingPhone: null,
      appFlow: 'onboarding',
    }),
}));
