import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { transactions } from '../data/mockData';
import { HeaderBlock, Pill, ProgressBar, Screen, SurfaceCard, uiStyles } from '../components/Ui';
import { TransactionItem } from '../types/navigation';
import { palette, spacing } from '../theme';

type ListProps = {
  onOpenTransaction: (item: TransactionItem) => void;
};

type DetailProps = {
  item: TransactionItem;
};

export function TransactionsScreen({ onOpenTransaction }: ListProps) {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Activity"
          title="Todos tus movimientos, ordenados para revisar rápido"
          body="Filtros visuales, montos claros y desglose listo para convertir esto en una fuente real después."
        />

        <View style={uiStyles.wrap}>
          <Pill label="All" active />
          <Pill label="Income" />
          <Pill label="Expenses" />
          <Pill label="Subscriptions" />
        </View>

        <View style={styles.listWrap}>
          {transactions.map((item) => (
            <Pressable key={item.id} style={styles.listItem} onPress={() => onOpenTransaction(item)}>
              <View style={[styles.iconChip, { backgroundColor: item.tint }]} />
              <View style={styles.itemBody}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemMeta}>{item.category} · {item.subtitle}</Text>
              </View>
              <Text style={[styles.itemAmount, item.type === 'income' && styles.itemAmountIncome]}>{item.amount}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}

export function TransactionDetailScreen({ item }: DetailProps) {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Transaction detail"
          title={item.title}
          body="Diseño de detalle para ticket, categoría, cuenta asociada y seguimiento de este gasto frente a su presupuesto."
        />

        <SurfaceCard>
          <Text style={styles.detailAmount}>{item.amount}</Text>
          <Text style={styles.detailMeta}>{item.category}</Text>
          <Text style={styles.detailSubtle}>{item.subtitle}</Text>
        </SurfaceCard>

        <SurfaceCard>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Budget impact</Text>
            <Text style={styles.metricValue}>42%</Text>
          </View>
          <ProgressBar value={0.42} color={item.tint} />
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Payment source</Text>
            <Text style={styles.metricValue}>Fluyo Black</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Notes</Text>
            <Text style={styles.metricValue}>Weekly routine expense</Text>
          </View>
        </SurfaceCard>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
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
    gap: spacing.sm,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  iconChip: {
    width: 18,
    height: 18,
    borderRadius: 999,
  },
  itemBody: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    color: palette.ink,
    fontWeight: '800',
  },
  itemMeta: {
    color: palette.inkSoft,
    fontSize: 13,
  },
  itemAmount: {
    color: palette.danger,
    fontWeight: '800',
  },
  itemAmountIncome: {
    color: palette.success,
  },
  detailAmount: {
    color: palette.ink,
    fontSize: 36,
    fontWeight: '900',
  },
  detailMeta: {
    color: palette.accent,
    fontWeight: '700',
  },
  detailSubtle: {
    color: palette.inkSoft,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    color: palette.inkSoft,
    fontWeight: '700',
  },
  metricValue: {
    color: palette.ink,
    fontWeight: '800',
  },
});