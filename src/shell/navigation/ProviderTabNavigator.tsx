import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackNavigator } from './stacks/HomeStackNavigator';
import { DashboardStackNavigator } from './stacks/DashboardStackNavigator';
import { ProviderBookingsStackNavigator } from './stacks/ProviderBookingsStackNavigator';
import { ChatStackNavigator } from './stacks/ChatStackNavigator';
import { UserProfileStackNavigator } from './stacks/UserProfileStackNavigator';
import { colors, spacing } from '../../constants/theme';
import { ProviderTabParamList } from './types';

const Tab = createBottomTabNavigator<ProviderTabParamList>();

export function ProviderTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          paddingTop: spacing.xs,
          paddingBottom: spacing.sm,
          height: 64,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ color, size }) => {
          const map: Record<keyof ProviderTabParamList, keyof typeof Ionicons.glyphMap> = {
            HomeTab: 'home-outline',
            DashboardTab: 'speedometer-outline',
            BookingsTab: 'calendar-outline',
            ChatTab: 'chatbubbles-outline',
            ProfileTab: 'person-outline',
          };
          return <Ionicons name={map[route.name as keyof ProviderTabParamList]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="DashboardTab" component={DashboardStackNavigator} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="BookingsTab" component={ProviderBookingsStackNavigator} options={{ title: 'Bookings' }} />
      <Tab.Screen name="ChatTab" component={ChatStackNavigator} options={{ title: 'Chat' }} />
      <Tab.Screen name="ProfileTab" component={UserProfileStackNavigator} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
