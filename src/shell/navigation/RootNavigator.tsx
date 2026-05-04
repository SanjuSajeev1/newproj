import { StyleSheet, View } from 'react-native';
import { SplashScreen } from '../../features/auth/screens/SplashScreen';
import { WelcomeScreen } from '../../features/auth/screens/WelcomeScreen';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { RoleSelectionScreen } from '../../features/auth/screens/RoleSelectionScreen';
import { useAuthStore } from '../../store/authStore';
import { colors } from '../../constants/theme';
import { GuestTabNavigator } from './GuestTabNavigator';
import { UserTabNavigator } from './UserTabNavigator';
import { ProviderTabNavigator } from './ProviderTabNavigator';

function MainNavigator() {
  const isGuest = useAuthStore((s) => s.isGuest);
  const role = useAuthStore((s) => s.currentRole);

  if (isGuest) {
    return <GuestTabNavigator />;
  }
  if (role === 'user') {
    return <UserTabNavigator />;
  }
  if (role === 'provider') {
    return <ProviderTabNavigator />;
  }
  return <View style={styles.fallback} />;
}

export function RootNavigator() {
  const appFlow = useAuthStore((s) => s.appFlow);

  switch (appFlow) {
    case 'splash':
      return <SplashScreen />;
    case 'welcome':
      return <WelcomeScreen />;
    case 'login':
      return <LoginScreen />;
    case 'role_select':
      return <RoleSelectionScreen />;
    case 'main':
      return <MainNavigator />;
    default:
      return <View style={styles.fallback} />;
  }
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
