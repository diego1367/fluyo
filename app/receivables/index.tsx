import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import { deleteReceivable, getReceivables } from '../../src/services/receivableService';
import { Receivable } from '../../src/types/receivables';
import { palette, spacing } from '../../src/theme';

export default function ReceivablesScreen() {
  const [receivables, setReceivables] = useState<Receivable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReceivables = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getReceivables();
      setReceivables(data);
    } catch (err: any) {
      setError(err.message || 'No se pudieron cargar las cuentas por cobrar');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmado = window.confirm('¿Seguro que quieres eliminar esta cuenta por cobrar?');

    if (!confirmado) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await deleteReceivable(id);
      await loadReceivables();
    } catch (err: any) {
      setError(err.message || 'No se pudo eliminar la cuenta por cobrar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReceivables();
  }, []);

  return (
    <Screen>
      <View style={styles.shell}>
        <SectionHeader title="Cuentas por cobrar" />

        <Pressable
          style={styles.button}
          onPress={() => router.push('/receivables/create')}
        >
          <Text style={styles.buttonText}>Agregar cuenta por cobrar</Text>
        </Pressable>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <SurfaceCard>
            <Text style={styles.error}>{error}</Text>
          </SurfaceCard>
        ) : (
          <FlatList
            data={receivables}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: spacing.md }}
            renderItem={({ item }) => (
              <SurfaceCard>
                <Text style={styles.title}>{item.nombreDeudor}</Text>
                <Text style={styles.subtitle}>Concepto: {item.concepto}</Text>
                <Text style={styles.amount}>
                  ${Number(item.monto ?? 0).toLocaleString('es-CO')}
                </Text>

                <Pressable
                  style={styles.editButton}
                  onPress={() => router.push(`/receivables/${item.id}`)}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </Pressable>
              </SurfaceCard>
            )}
            ListEmptyComponent={
              <SurfaceCard>
                <Text style={styles.empty}>
                  No tienes cuentas por cobrar registradas todavía.
                </Text>
              </SurfaceCard>
            }
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
    fontSize: 15,
    fontWeight: '800',
  },
  title: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  subtitle: {
    color: palette.inkSoft,
    fontSize: 14,
    marginTop: 6,
  },
  amount: {
    color: palette.accent,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 10,
  },
  empty: {
    color: palette.inkSoft,
    fontSize: 14,
  },
  error: {
    color: palette.danger,
    fontWeight: '700',
  },
  editButton: {
    marginTop: spacing.md,
    backgroundColor: '#D9A441',
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },
  editButtonText: {
    color: palette.white,
    fontWeight: '800',
    fontSize: 14,
  },
  deleteButton: {
    marginTop: spacing.md,
    backgroundColor: palette.danger,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: palette.white,
    fontWeight: '800',
    fontSize: 14,
  },
});