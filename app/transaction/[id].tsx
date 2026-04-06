import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getTransactionById } from '../../src/data/mockData';
import { TransactionDetailScreen } from '../../src/screens/TransactionsScreens';
import { palette, radius, spacing } from '../../src/theme';

export default function TransactionDetailRoute() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const transaction = id ? getTransactionById(id) : undefined;

  if (!transaction) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyTitle}>Transaction not found</Text>
        <Pressable onPress={() => router.replace('/transactions')} style={styles.button}>
          <Text style={styles.buttonText}>Go to transactions</Text>
        </Pressable>
      </View>
    );
  }

  return <TransactionDetailScreen item={transaction} />;
}

const styles = StyleSheet.create({
  emptyWrap: {
    flex: 1,
    backgroundColor: palette.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    color: palette.ink,
    fontSize: 24,
    fontWeight: '800',
  },
  button: {
    backgroundColor: palette.accent,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    color: palette.white,
    fontWeight: '800',
  },
});