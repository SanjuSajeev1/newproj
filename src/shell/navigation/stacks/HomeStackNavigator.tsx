import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../../features/home/screens/HomeScreen';
import { StoryViewerScreen } from '../../../features/story/screens/StoryViewerScreen';
import { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="StoryViewer"
        component={StoryViewerScreen}
        options={{
          headerShown: false,
          animation: 'fade',
          presentation: 'fullScreenModal',
        }}
      />
    </Stack.Navigator>
  );
}
