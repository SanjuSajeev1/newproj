import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchScreen } from '../../../features/search/screens/SearchScreen';
import { ProviderListingScreen } from '../../../features/search/screens/ProviderListingScreen';
import { ProviderProfileScreen } from '../../../features/profile/screens/ProviderProfileScreen';
import { colors } from '../../../constants/theme';
import { SearchStackParamList } from '../types';

const Stack = createNativeStackNavigator<SearchStackParamList>();

export function SearchStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="SearchMain" component={SearchScreen} options={{ title: 'Search' }} />
      <Stack.Screen
        name="ProviderListing"
        component={ProviderListingScreen}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen name="ProviderProfile" component={ProviderProfileScreen} options={{ title: 'Provider' }} />
    </Stack.Navigator>
  );
}
