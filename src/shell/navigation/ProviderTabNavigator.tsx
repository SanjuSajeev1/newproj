import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackNavigator } from './stacks/HomeStackNavigator';
import { FeedStackNavigator } from './stacks/FeedStackNavigator';
import { DashboardStackNavigator } from './stacks/DashboardStackNavigator';
import { ProviderBookingsStackNavigator } from './stacks/ProviderBookingsStackNavigator';
import { ChatStackNavigator } from './stacks/ChatStackNavigator';
import { colors } from '../../constants/theme';
import { ProviderTabParamList } from './types';
import { useTabBarInsetStyle } from './useTabBarInsetStyle';

const Tab = createBottomTabNavigator<ProviderTabParamList>();

export function ProviderTabNavigator() {
  const { tabBarStyle } = useTabBarInsetStyle();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle,
        tabBarIcon: ({ color, size }) => {
          const map: Record<keyof ProviderTabParamList, keyof typeof Ionicons.glyphMap> = {
            HomeTab: 'home-outline',
            FeedTab: 'newspaper-outline',
            DashboardTab: 'speedometer-outline',
            BookingsTab: 'calendar-outline',
            ChatTab: 'chatbubbles-outline',
          };
          return <Ionicons name={map[route.name as keyof ProviderTabParamList]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="FeedTab" component={FeedStackNavigator} options={{ title: 'Feed', headerShown: false }} />
      <Tab.Screen name="DashboardTab" component={DashboardStackNavigator} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="BookingsTab" component={ProviderBookingsStackNavigator} options={{ title: 'Bookings' }} />
      <Tab.Screen name="ChatTab" component={ChatStackNavigator} options={{ title: 'Chat' }} />
    </Tab.Navigator>
  );
}
