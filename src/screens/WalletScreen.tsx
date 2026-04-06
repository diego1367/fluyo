import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cards } from '../data/mockData';
import { HeaderBlock, ProgressBar, Screen, SectionHeader, SurfaceCard, uiStyles } from '../components/Ui';
import { palette, spacing } from '../theme';

export function WalletScreen() {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Wallet"
          title="Cuentas, efectivo y tarjetas en una sola vista"
          body="Una capa operativa para ver liquidez disponible, próximos débitos y cómo se reparte el dinero hoy."
        />

        {cards.map((item) => (
          <View key={item.number} style={[styles.card, { backgroundColor: item.accent }]}> 
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardNumber}>{item.number}</Text>
            <Text style={styles.cardBalance}>{item.balance}</Text>
          </View>
        ))}

        <SectionHeader title="Liquidity split" />
        <SurfaceCard>
          <View style={uiStyles.gap16}>
            <Row label="Checking" value="42%" />
            <ProgressBar value={0.42} color={palette.accent} />
            <Row label="Emergency fund" value="33%" />
            <ProgressBar value={0.33} color={palette.gold} />
            <Row label="Brokerage" value="25%" />
            <ProgressBar value={0.25} color={palette.coral} />
          </View>
        </SurfaceCard>
      </View>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
  },
  card: {
    borderRadius: 28,
    padding: spacing.xl,
    gap: 10,
  },
  cardName: {
    color: '#b9d8d2',
    fontWeight: '700',
  },
  cardNumber: {
    color: palette.white,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  cardBalance: {
    color: palette.white,
    fontSize: 34,
    fontWeight: '900',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    color: palette.ink,
    fontWeight: '700',
  },
  rowValue: {
    color: palette.inkSoft,
    fontWeight: '700',
  },
});