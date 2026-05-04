import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatListScreen } from '../../../features/chat/screens/ChatListScreen';
import { ConversationScreen } from '../../../features/chat/screens/ConversationScreen';
import { colors } from '../../../constants/theme';
import { ChatStackParamList } from '../types';

const Stack = createNativeStackNavigator<ChatStackParamList>();

export function ChatStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Chat' }} />
      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}
