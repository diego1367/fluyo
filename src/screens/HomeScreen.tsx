import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { transactions } from '../data/mockData';
import { AppButton, HeaderBlock, HeroCard, Screen, SectionHeader, StatCard, SurfaceCard, uiStyles } from '../components/Ui';
import { TransactionItem } from '../types/navigation';
import { palette, spacing } from '../theme';
import { getAssets } from '../services/assetService';
import { Asset } from '../types/assets';
import { getInitialSummary } from '../services/financeService';
import { getReceivables } from '../services/receivableService';
import { getPayables } from '../services/payableService';
import { InitialSummary } from '../types/finance';
import { Receivable } from '../types/receivables';
import { Payable } from '../types/payables';
import { formatCurrency } from '../utils/formatters';

type Props = {
  onNavigate: (
    screen:
      | 'wallet'
      | 'transactions'
      | 'notifications'
      | 'goals'
      | 'add-transaction'
      | 'finance'
      | 'assets'
      | 'payables'
      | 'receivables'
  ) => void;
  onOpenTransaction: (item: TransactionItem) => void;
};

export function HomeScreen({ onNavigate, onOpenTransaction }: Props) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(true);
  const [assetsError, setAssetsError] = useState('');

  const [summary, setSummary] = useState<InitialSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  const [receivables, setReceivables] = useState<Receivable[]>([]);
  const [payables, setPayables] = useState<Payable[]>([]);

  const loadAssets = async () => {
    try {
      setAssetsLoading(true);
      setAssetsError('');

      const data = await getAssets();
      setAssets(data);
    } catch (error: any) {
      setAssetsError(error.message || 'No fue posible cargar los activos');
    } finally {
      setAssetsLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      setSummaryLoading(true);

      const [summaryData, receivablesData, payablesData] = await Promise.all([
        getInitialSummary(),
        getReceivables(),
        getPayables(),
      ]);

      setSummary(summaryData);
      setReceivables(receivablesData);
      setPayables(payablesData);
    } catch (error) {
      console.error('Error dashboard:', error);
    } finally {
      setSummaryLoading(false);
    }
  };

 useFocusEffect(
  useCallback(() => {
    loadAssets();
    loadDashboardData();
  }, [])
);

  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
  eyebrow="Resumen"
  title={`Tu dinero ${summary?.loMioEs && summary.loMioEs > 0 ? 'va bien' : 'necesita atención'}`}
  body={
    summaryLoading
      ? 'Analizando tus finanzas...'
      : summary?.mensaje || 'Aquí verás recomendaciones sobre tu dinero.'
  }
/>

       <HeroCard>
  <Text style={styles.balanceLabel}>Patrimonio neto</Text>
  <Text style={styles.balanceValue}>
    {summaryLoading ? 'Cargando...' : formatCurrency(summary?.loMioEs)}
  </Text>

  <View style={[uiStyles.row, uiStyles.gap12]}>
    <View style={styles.kpiBubble}>
      <Text style={styles.kpiBubbleLabel}>Tengo</Text>
      <Text style={styles.kpiBubbleValue}>
        {formatCurrency(summary?.tengo)}
      </Text>
    </View>

    <View style={styles.kpiBubbleMuted}>
      <Text style={styles.kpiBubbleLabel}>Debo</Text>
      <Text style={styles.kpiBubbleValue}>
        {formatCurrency(summary?.debo)}
      </Text>
    </View>
  </View>

  <AppButton
    label="Agregar movimiento"
    onPress={() => onNavigate('add-transaction')}
    variant="ghost"
  />
</HeroCard>

<View style={[uiStyles.row, uiStyles.gap12]}>
  <StatCard
    label="Activos"
    value={formatCurrency(
      assets.reduce((acc, item) => acc + Number(item.valorEstimado || 0), 0)
    )}
    helper={`${assets.length} registrados`}
    invert
  />
  <StatCard
    label="Por cobrar"
    value={formatCurrency(
      receivables.reduce((acc, item) => acc + Number(item.monto || 0), 0)
    )}
    helper={`${receivables.length} cuentas`}
  />
  <StatCard
    label="Por pagar"
    value={formatCurrency(
      payables.reduce((acc, item) => acc + Number(item.monto || 0), 0)
    )}
    helper={`${payables.length} cuentas`}
  />
</View>

<SectionHeader title="Mis activos" />

<SurfaceCard>
  {assetsLoading ? (
    <Text style={styles.assetMessage}>Cargando activos...</Text>
  ) : assetsError ? (
    <Text style={styles.assetError}>{assetsError}</Text>
  ) : assets.length === 0 ? (
    <Text style={styles.assetMessage}>No tienes activos registrados</Text>
  ) : (
    assets.map((asset) => (
      <View key={asset.id} style={styles.assetItem}>
        <View style={styles.assetBody}>
          <Text style={styles.assetTitle}>{asset.nombre}</Text>
          <Text style={styles.assetSubtitle}>{asset.categoria}</Text>
        </View>
        <Text style={styles.assetValue}>
          {formatCurrency(asset.valorEstimado)}
        </Text>
      </View>
    ))
  )}
</SurfaceCard>

        <SectionHeader title="Quick actions" />
        <View style={styles.quickGrid}>
          <QuickAction title="Finanzas" subtitle="Resumen y fuentes" onPress={() => onNavigate('finance')} />
          <QuickAction title="Activos" subtitle={`${assets.length} registrados`} onPress={() => onNavigate('assets')} />
          <QuickAction title="Por cobrar" subtitle={`${receivables.length} cuentas`} onPress={() => onNavigate('receivables')} />
          <QuickAction title="Por pagar" subtitle={`${payables.length} cuentas`} onPress={() => onNavigate('payables')} />
          <QuickAction title="Movimientos" subtitle="Historial y detalle" onPress={() => onNavigate('transactions')} />
          <QuickAction title="Objetivos" subtitle="Metas financieras" onPress={() => onNavigate('goals')} />
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
              <Text style={[styles.amount, item.type === 'income' && styles.amountIncome]}>
                {item.amount}
              </Text>
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
    width: '48%',
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
  assetMessage: {
    color: palette.inkSoft,
    fontSize: 14,
  },
  assetError: {
    color: palette.danger,
    fontSize: 14,
    fontWeight: '700',
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  assetBody: {
    flex: 1,
    gap: 4,
  },
  assetTitle: {
    color: palette.ink,
    fontSize: 16,
    fontWeight: '800',
  },
  assetSubtitle: {
    color: palette.inkSoft,
    fontSize: 13,
  },
  assetValue: {
    color: palette.accent,
    fontSize: 15,
    fontWeight: '800',
  },
});