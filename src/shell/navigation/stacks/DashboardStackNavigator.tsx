import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProviderDashboardScreen } from '../../../features/dashboard/screens/ProviderDashboardScreen';
import { StoryUploadScreen } from '../../../features/story/screens/StoryUploadScreen';
import { StoryUploadPreviewScreen } from '../../../features/story/screens/StoryUploadPreviewScreen';
import { colors } from '../../../constants/theme';
import { DashboardStackParamList } from '../types';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export function DashboardStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="DashboardMain"
        component={ProviderDashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Stack.Screen name="StoryUpload" component={StoryUploadScreen} options={{ title: 'New story' }} />
      <Stack.Screen name="StoryUploadPreview" component={StoryUploadPreviewScreen} options={{ title: 'Preview' }} />
    </Stack.Navigator>
  );
}
