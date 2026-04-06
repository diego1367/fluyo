import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { insights, transactions } from '../data/mockData';
import { AppButton, HeaderBlock, HeroCard, Screen, SectionHeader, StatCard, SurfaceCard, uiStyles } from '../components/Ui';
import { TransactionItem } from '../types/navigation';
import { palette, spacing } from '../theme';

type Props = {
  onNavigate: (screen: 'wallet' | 'transactions' | 'notifications' | 'goals' | 'add-transaction') => void;
  onOpenTransaction: (item: TransactionItem) => void;
};

export function HomeScreen({ onNavigate, onOpenTransaction }: Props) {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Overview"
          title="Hola Diego, abril viene bajo control"
          body="Tus gastos variables bajaron esta semana y ya cubriste 68% de tu meta de fondo de emergencia."
        />

        <HeroCard>
          <Text style={styles.balanceLabel}>Net worth</Text>
          <Text style={styles.balanceValue}>$28,420.45</Text>
          <View style={[uiStyles.row, uiStyles.gap12]}>
            <View style={styles.kpiBubble}>
              <Text style={styles.kpiBubbleLabel}>Cash</Text>
              <Text style={styles.kpiBubbleValue}>$8.4k</Text>
            </View>
            <View style={styles.kpiBubbleMuted}>
              <Text style={styles.kpiBubbleLabel}>Invested</Text>
              <Text style={styles.kpiBubbleValue}>$11.7k</Text>
            </View>
          </View>
          <AppButton label="Agregar movimiento" onPress={() => onNavigate('add-transaction')} variant="ghost" />
        </HeroCard>

        <View style={[uiStyles.row, uiStyles.gap12]}>
          {insights.map((item, index) => (
            <StatCard key={item.label} label={item.label} value={item.value} helper={item.delta} invert={index === 0} />
          ))}
        </View>

        <SectionHeader title="Quick actions" />
        <View style={styles.quickGrid}>
          <QuickAction title="Wallet" subtitle="Accounts & cash" onPress={() => onNavigate('wallet')} />
          <QuickAction title="Goals" subtitle="3 active" onPress={() => onNavigate('goals')} />
          <QuickAction title="Activity" subtitle="Latest payments" onPress={() => onNavigate('transactions')} />
          <QuickAction title="Alerts" subtitle="4 new" onPress={() => onNavigate('notifications')} />
        </View>

        <SectionHeader title="Recent activity" action="View all" />
        <View style={styles.listWrap}>
          {transactions.slice(0, 4).map((item) => (
            <Pressable key={item.id} style={styles.listItem} onPress={() => onOpenTransaction(item)}>
              <View style={[styles.dot, { backgroundColor: item.tint }]} />
              <View style={styles.listBody}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={[styles.amount, item.type === 'income' && styles.amountIncome]}>{item.amount}</Text>
            </Pressable>
          ))}
        </View>

        <SurfaceCard>
          <Text style={styles.billTitle}>Upcoming</Text>
          <Text style={styles.billValue}>Electricity bill · $84.20</Text>
          <Text style={styles.billDate}>Due tomorrow</Text>
        </SurfaceCard>
      </View>
    </Screen>
  );
}

function QuickAction({ title, subtitle, onPress }: { title: string; subtitle: string; onPress: () => void }) {
  return (
    <Pressable style={styles.quickAction} onPress={onPress}>
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
  },
  balanceLabel: {
    color: '#9ec4bd',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  balanceValue: {
    color: palette.white,
    fontSize: 42,
    fontWeight: '900',
  },
  kpiBubble: {
    flex: 1,
    backgroundColor: '#2d5556',
    borderRadius: 18,
    padding: 14,
    gap: 6,
  },
  kpiBubbleMuted: {
    flex: 1,
    backgroundColor: '#f0e4d622',
    borderRadius: 18,
    padding: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: '#6b8984',
  },
  kpiBubbleLabel: {
    color: '#cfe3de',
    fontSize: 13,
    fontWeight: '700',
  },
  kpiBubbleValue: {
    color: palette.white,
    fontSize: 20,
    fontWeight: '800',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  quickAction: {
    width: '47%',
    backgroundColor: palette.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.line,
    padding: spacing.lg,
    gap: 6,
  },
  quickTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  quickSubtitle: {
    color: palette.inkSoft,
    lineHeight: 20,
  },
  listWrap: {
    backgroundColor: palette.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.line,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: spacing.sm,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 999,
  },
  listBody: {
    flex: 1,
    gap: 3,
  },
  listTitle: {
    color: palette.ink,
    fontWeight: '700',
    fontSize: 15,
  },
  listSubtitle: {
    color: palette.inkSoft,
    fontSize: 13,
  },
  amount: {
    color: palette.danger,
    fontWeight: '800',
  },
  amountIncome: {
    color: palette.success,
  },
  billTitle: {
    color: palette.inkSoft,
    fontWeight: '700',
  },
  billValue: {
    color: palette.ink,
    fontWeight: '800',
    fontSize: 20,
  },
  billDate: {
    color: palette.coral,
    fontWeight: '700',
  },
});