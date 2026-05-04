import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackNavigator } from './stacks/HomeStackNavigator';
import { SearchStackNavigator } from './stacks/SearchStackNavigator';
import { GuestProfileStackNavigator } from './stacks/GuestProfileStackNavigator';
import { colors, spacing } from '../../constants/theme';
import { GuestTabParamList } from './types';

const Tab = createBottomTabNavigator<GuestTabParamList>();

export function GuestTabNavigator() {
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
          const map: Record<keyof GuestTabParamList, keyof typeof Ionicons.glyphMap> = {
            HomeTab: 'home-outline',
            SearchTab: 'search-outline',
            ProfileTab: 'person-outline',
          };
          return <Ionicons name={map[route.name as keyof GuestTabParamList]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="SearchTab" component={SearchStackNavigator} options={{ title: 'Search' }} />
      <Tab.Screen name="ProfileTab" component={GuestProfileStackNavigator} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
