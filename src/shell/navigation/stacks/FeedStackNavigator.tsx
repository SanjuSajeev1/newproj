import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeedScreen } from "../../../features/feed/screens/FeedScreen";
import { StoryViewerScreen } from "../../../features/story/screens/StoryViewerScreen";
import { colors } from "../../../constants/theme";
import type { FeedStackParamList } from "../types";

const Stack = createNativeStackNavigator<FeedStackParamList>();

export function FeedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="FeedMain" component={FeedScreen} options={{ title: "Feed" }} />
      <Stack.Screen
        name="StoryViewer"
        component={StoryViewerScreen}
        options={{
          headerShown: false,
          animation: "fade",
          presentation: "fullScreenModal",
        }}
      />
    </Stack.Navigator>
  );
}
