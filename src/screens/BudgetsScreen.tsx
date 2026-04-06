import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { budgets } from '../data/mockData';
import { HeaderBlock, ProgressBar, Screen, SurfaceCard } from '../components/Ui';
import { palette, spacing } from '../theme';

export function BudgetsScreen() {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Budgets"
          title="Límites claros por categoría"
          body="Esta pantalla te deja revisar velocidad de gasto, categorías en riesgo y cuánto margen queda antes de cerrar el mes."
        />

        {budgets.map((item) => (
          <SurfaceCard key={item.name}>
            <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.values}>{item.spent} / {item.total}</Text>
            </View>
            <ProgressBar value={item.progress} color={item.color} />
            <Text style={styles.helper}>{Math.round(item.progress * 100)}% used this month</Text>
          </SurfaceCard>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: palette.ink,
    fontWeight: '800',
    fontSize: 17,
  },
  values: {
    color: palette.inkSoft,
    fontWeight: '700',
  },
  helper: {
    color: palette.inkSoft,
  },
});