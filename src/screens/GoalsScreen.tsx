import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { goals } from '../data/mockData';
import { HeaderBlock, ProgressBar, Screen, SurfaceCard } from '../components/Ui';
import { palette, spacing } from '../theme';

export function GoalsScreen() {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Savings goals"
          title="Metas activas con avance visible"
          body="Un espacio para separar ahorro operativo del ahorro con destino, usando tarjetas claras y progreso directo."
        />

        {goals.map((goal, index) => (
          <SurfaceCard key={goal.name}>
            <Text style={styles.name}>{goal.name}</Text>
            <Text style={styles.saved}>{goal.saved}</Text>
            <Text style={styles.target}>Target {goal.target}</Text>
            <ProgressBar
              value={goal.progress}
              color={index === 0 ? palette.accent : index === 1 ? palette.coral : palette.gold}
            />
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
  name: {
    color: palette.ink,
    fontWeight: '800',
    fontSize: 18,
  },
  saved: {
    color: palette.accent,
    fontWeight: '900',
    fontSize: 28,
  },
  target: {
    color: palette.inkSoft,
  },
});