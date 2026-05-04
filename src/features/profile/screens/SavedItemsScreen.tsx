import { StyleSheet, Text, View } from 'react-native';
import { Card } from '../../../components/Card';
import { colors, spacing, typography } from '../../../constants/theme';

export function SavedItemsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Saved items</Text>
      <Card padded>
        <Text style={styles.body}>No saved providers yet (mock).</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.md,
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
