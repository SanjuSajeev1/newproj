import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackNavigator } from './stacks/HomeStackNavigator';
import { FeedStackNavigator } from './stacks/FeedStackNavigator';
import { colors } from '../../constants/theme';
import { GuestTabParamList } from './types';
import { useTabBarInsetStyle } from './useTabBarInsetStyle';

const Tab = createBottomTabNavigator<GuestTabParamList>();

export function GuestTabNavigator() {
  const { tabBarStyle } = useTabBarInsetStyle();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle,
        tabBarIcon: ({ color, size }) => {
          const map: Record<keyof GuestTabParamList, keyof typeof Ionicons.glyphMap> = {
            HomeTab: 'home-outline',
            FeedTab: 'newspaper-outline',
          };
          return <Ionicons name={map[route.name as keyof GuestTabParamList]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="FeedTab" component={FeedStackNavigator} options={{ title: 'Feed', headerShown: false }} />
    </Tab.Navigator>
  );
}
