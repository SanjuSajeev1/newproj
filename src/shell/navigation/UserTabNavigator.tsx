import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackNavigator } from './stacks/HomeStackNavigator';
import { SearchStackNavigator } from './stacks/SearchStackNavigator';
import { UserBookingsStackNavigator } from './stacks/UserBookingsStackNavigator';
import { ChatStackNavigator } from './stacks/ChatStackNavigator';
import { UserProfileStackNavigator } from './stacks/UserProfileStackNavigator';
import { colors, spacing } from '../../constants/theme';
import { UserTabParamList } from './types';

const Tab = createBottomTabNavigator<UserTabParamList>();

export function UserTabNavigator() {
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
          const map: Record<keyof UserTabParamList, keyof typeof Ionicons.glyphMap> = {
            HomeTab: 'home-outline',
            SearchTab: 'search-outline',
            BookingsTab: 'calendar-outline',
            ChatTab: 'chatbubbles-outline',
            ProfileTab: 'person-outline',
          };
          return <Ionicons name={map[route.name as keyof UserTabParamList]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="SearchTab" component={SearchStackNavigator} options={{ title: 'Search' }} />
      <Tab.Screen name="BookingsTab" component={UserBookingsStackNavigator} options={{ title: 'Bookings' }} />
      <Tab.Screen name="ChatTab" component={ChatStackNavigator} options={{ title: 'Chat' }} />
      <Tab.Screen name="ProfileTab" component={UserProfileStackNavigator} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
