import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import { getPayables, deletePayable } from '../../src/services/payableService';
import { Payable } from '../../src/types/payables';
import { palette, spacing } from '../../src/theme';

export default function PayablesScreen() {
  const [items, setItems] = useState<Payable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getPayables();
      setItems(data);
    } catch (err: any) {
      setError(err.message || 'No se pudieron cargar las cuentas por pagar');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmado = window.confirm('¿Eliminar esta cuenta por pagar?');

    if (!confirmado) return;

    try {
      await deletePayable(id);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Error eliminando');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Screen>
      <View style={styles.shell}>
        <SectionHeader title="Cuentas por pagar" />

        <Pressable
          style={styles.button}
          onPress={() => router.push('/payables/create')}
        >
          <Text style={styles.buttonText}>Agregar cuenta</Text>
        </Pressable>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <SurfaceCard>
            <Text style={styles.error}>{error}</Text>
          </SurfaceCard>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: spacing.md }}
            renderItem={({ item }) => (
              <SurfaceCard>
                <Text style={styles.title}>{item.concepto}</Text>
                <Text style={styles.subtitle}>
                  Concepto: {item.concepto}
                </Text>
                <Text style={styles.amount}>
                  ${Number(item.monto ?? 0).toLocaleString('es-CO')}
                </Text>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </Pressable>
              </SurfaceCard>
            )}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
    flex: 1,
  },
  button: {
    backgroundColor: palette.accent,
    padding: spacing.md,
    borderRadius: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: palette.white,
    fontWeight: '800',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 5,
    color: palette.inkSoft,
  },
  amount: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '900',
    color: palette.accent,
  },
  deleteButton: {
    marginTop: 12,
    backgroundColor: palette.danger,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: palette.white,
    fontWeight: '800',
  },
  error: {
    color: palette.danger,
    fontWeight: '700',
  },
});