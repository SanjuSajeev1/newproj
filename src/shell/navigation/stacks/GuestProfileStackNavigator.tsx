import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GuestProfileScreen } from '../../../features/profile/screens/GuestProfileScreen';
import { colors } from '../../../constants/theme';
import { GuestProfileStackParamList } from '../types';

const Stack = createNativeStackNavigator<GuestProfileStackParamList>();

export function GuestProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="ProfileMain" component={GuestProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}
