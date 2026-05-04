import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookingsListScreen } from '../../../features/booking/screens/BookingsListScreen';
import { BookingFlowScreen } from '../../../features/booking/screens/BookingFlowScreen';
import { colors } from '../../../constants/theme';
import { BookingsStackParamList } from '../types';

const Stack = createNativeStackNavigator<BookingsStackParamList>();

export function UserBookingsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="BookingsMain" component={BookingsListScreen} options={{ title: 'Bookings' }} />
      <Stack.Screen name="BookingFlow" component={BookingFlowScreen} options={{ title: 'Book' }} />
    </Stack.Navigator>
  );
}
