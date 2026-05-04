import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProviderBookingsScreen } from '../../../features/booking/screens/ProviderBookingsScreen';
import { colors } from '../../../constants/theme';
import { ProviderBookingsStackParamList } from '../types';

const Stack = createNativeStackNavigator<ProviderBookingsStackParamList>();

export function ProviderBookingsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="ProviderBookingsMain"
        component={ProviderBookingsScreen}
        options={{ title: 'Bookings' }}
      />
    </Stack.Navigator>
  );
}
