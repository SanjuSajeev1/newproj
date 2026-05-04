import { StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { colors, spacing, typography } from '../../../constants/theme';
import { useAuthStore } from '../../../store/authStore';
import { ProfileStackParamList } from '../../../shell/navigation/types';

type Nav = NativeStackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

export function UserProfileScreen() {
  const navigation = useNavigation<Nav>();
  const user = useAuthStore((s) => s.user);
  const role = useAuthStore((s) => s.currentRole);
  const logout = useAuthStore((s) => s.logout);

  const name = user?.name ?? 'Guest';
  const color = user?.avatarColor ?? colors.primaryLight;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Avatar name={name} size={88} backgroundColor={color} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role === 'provider' ? 'Provider account' : 'Customer account'}</Text>
      </View>
      <Card style={styles.card} padded>
        <Button title="Edit profile" variant="secondary" onPress={() => {}} />
        <Button
          title="Saved items"
          variant="secondary"
          onPress={() => navigation.navigate('SavedItems')}
          style={styles.gap}
        />
        <Button
          title="Booking history"
          variant="secondary"
          onPress={() => navigation.navigate('BookingHistory')}
          style={styles.gap}
        />
      </Card>
      <Button title="Log out" variant="ghost" onPress={logout} style={styles.logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  name: {
    ...typography.title,
    marginTop: spacing.md,
  },
  role: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  card: {
    marginBottom: spacing.lg,
  },
  gap: {
    marginTop: spacing.sm,
  },
  logout: {
    marginTop: 'auto',
  },
});
