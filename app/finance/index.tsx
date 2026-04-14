import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import { getInitialSummary } from '../../src/services/financeService';
import { InitialSummary } from '../../src/types/finance';
import { palette, spacing } from '../../src/theme';

export default function FinanceScreen() {
  const [summary, setSummary] = useState<InitialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSummary = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getInitialSummary();
      setSummary(data);
    } catch (err: any) {
      setError(err.message || 'No se pudo cargar el resumen financiero');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <Screen>
      <View style={styles.shell}>
        <SectionHeader title="Finanzas" />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <SurfaceCard>
            <Text style={styles.error}>{error}</Text>
          </SurfaceCard>
        ) : (
          <>
            <SurfaceCard>
              <Text style={styles.label}>Tengo</Text>
              <Text style={styles.value}>${summary?.tengo ?? 0}</Text>
            </SurfaceCard>

            <SurfaceCard>
              <Text style={styles.label}>Debo</Text>
              <Text style={styles.value}>${summary?.debo ?? 0}</Text>
            </SurfaceCard>

            <SurfaceCard>
              <Text style={styles.label}>Lo mío es</Text>
              <Text style={styles.value}>${summary?.loMioEs ?? 0}</Text>
            </SurfaceCard>

            <SurfaceCard>
              <Text style={styles.label}>Recomendación</Text>
              <Text style={styles.message}>{summary?.mensaje}</Text>
            </SurfaceCard>

            <Pressable
  style={styles.button}
  onPress={() => router.push('/finance/sources')}
>
  <Text style={styles.buttonText}>Ver fuentes financieras</Text>
</Pressable>

<Pressable
  style={styles.button}
  onPress={() => router.push('/assets')}
>
  <Text style={styles.buttonText}>Ver activos</Text>
</Pressable>

<Pressable
  style={styles.button}
  onPress={() => router.push('/payables')}
>
  <Text style={styles.buttonText}>Ver cuentas por pagar</Text>
</Pressable>

<Pressable
  style={styles.button}
  onPress={() => router.push('/receivables')}
>
  <Text style={styles.buttonText}>Ver cuentas por cobrar</Text>
</Pressable>

          </>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
  },
  label: {
    color: palette.inkSoft,
    fontSize: 14,
    fontWeight: '700',
  },
  value: {
    color: palette.ink,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 8,
  },
  message: {
    color: palette.ink,
    fontSize: 16,
    lineHeight: 24,
  },
  error: {
    color: palette.danger,
    fontWeight: '700',
  },
  button: {
    backgroundColor: palette.accent,
    padding: spacing.lg,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: palette.white,
    fontWeight: '800',
    fontSize: 16,
  },
});