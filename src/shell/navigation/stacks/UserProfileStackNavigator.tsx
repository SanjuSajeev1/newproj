import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProfileScreen } from '../../../features/profile/screens/UserProfileScreen';
import { SavedItemsScreen } from '../../../features/profile/screens/SavedItemsScreen';
import { BookingHistoryScreen } from '../../../features/profile/screens/BookingHistoryScreen';
import { colors } from '../../../constants/theme';
import { ProfileStackParamList } from '../types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function UserProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="ProfileMain" component={UserProfileScreen} options={{ title: 'Profile' }} />
      <Stack.Screen name="SavedItems" component={SavedItemsScreen} options={{ title: 'Saved' }} />
      <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} options={{ title: 'History' }} />
    </Stack.Navigator>
  );
}
