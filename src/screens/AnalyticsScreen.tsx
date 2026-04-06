import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { weeklySpending } from '../data/mockData';
import { HeaderBlock, Screen, SectionHeader, SurfaceCard } from '../components/Ui';
import { palette, spacing } from '../theme';

export function AnalyticsScreen() {
  const max = Math.max(...weeklySpending);

  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Analytics"
          title="Tendencias semanales y categorías fuertes"
          body="Visuales simples para transformar transacciones en patrones: cuándo gastás, qué crece y dónde conviene ajustar."
        />

        <SurfaceCard>
          <SectionHeader title="Weekly spending" />
          <View style={styles.chartRow}>
            {weeklySpending.map((value, index) => (
              <View key={`${value}-${index}`} style={styles.barWrap}>
                <View style={[styles.bar, { height: 28 + (value / max) * 120 }]} />
                <Text style={styles.barLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</Text>
              </View>
            ))}
          </View>
        </SurfaceCard>

        <SurfaceCard>
          <Text style={styles.insightTitle}>Top insight</Text>
          <Text style={styles.insightBody}>Food & Drink increased 11% this week, but transport dropped 18%. Net effect: you are still below your monthly burn target.</Text>
        </SurfaceCard>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 180,
    marginTop: spacing.sm,
  },
  barWrap: {
    alignItems: 'center',
    gap: 8,
  },
  bar: {
    width: 26,
    borderRadius: 999,
    backgroundColor: palette.accent,
  },
  barLabel: {
    color: palette.inkSoft,
    fontSize: 12,
    fontWeight: '700',
  },
  insightTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  insightBody: {
    color: palette.inkSoft,
    lineHeight: 22,
  },
});