import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../../features/home/screens/HomeScreen';
import { StoryViewerScreen } from '../../../features/story/screens/StoryViewerScreen';
import { EventsScreen } from '../../../features/events/screens/EventsScreen';
import { BeautyStylingScreen } from '../../../features/beautyStyling/screens/BeautyStylingScreen';
import { ArtsCreativeScreen } from '../../../features/artsCreative/screens/ArtsCreativeScreen';
import { DigitalServicesScreen } from '../../../features/digitalServices/screens/DigitalServicesScreen';
import { SubCategoryFullScreen } from '../../../features/services/screens/SubCategoryFullScreen';
import { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        options={{
          title: 'Events',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="ArtsCreative"
        component={ArtsCreativeScreen}
        options={{
          title: 'Arts & Creative',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="DigitalServices"
        component={DigitalServicesScreen}
        options={{
          title: 'Digital Services',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="BeautyStyling"
        component={BeautyStylingScreen}
        options={{
          title: 'Beauty & Styling',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="SubCategoryFull"
        component={SubCategoryFullScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
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
