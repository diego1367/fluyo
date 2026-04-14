import React, { useCallback, useState } from 'react';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import {
  deleteFinanceSource,
  getFinanceSources,
} from '../../src/services/financeService';
import { FinanceSource } from '../../src/types/finance';
import { palette, spacing } from '../../src/theme';

export default function FinanceSourcesScreen() {
  const [sources, setSources] = useState<FinanceSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadSources = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getFinanceSources();
      setSources(data);
    } catch (err: any) {
      setError(err.message || 'No se pudieron cargar las fuentes');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSources();
    }, [])
  );

const handleDelete = (id: string) => {
  console.log('handleDelete id:', id);

  Alert.alert(
    'Eliminar fuente',
    '¿Seguro que deseas eliminar esta fuente financiera?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            console.log('Ejecutando deleteFinanceSource con id:', id);
            setDeletingId(id);

            const response = await deleteFinanceSource(id);
            console.log('DELETE RESPONSE:', response);

            setSources((prev) => prev.filter((item) => item.id !== id));

            Alert.alert('Éxito', 'Fuente financiera eliminada correctamente.');
          } catch (error: any) {
            console.log('DELETE ERROR:', error);
            Alert.alert('Error', error.message || 'No se pudo eliminar la fuente.');
          } finally {
            setDeletingId(null);
          }
        },
      },
    ]
  );
};
  return (
    <Screen>
      <View style={styles.shell}>
        <SectionHeader title="Fuentes financieras" />

        <Pressable
          style={styles.button}
          onPress={() => router.push('/finance/create-source')}
        >
          <Text style={styles.buttonText}>Agregar fuente</Text>
        </Pressable>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <SurfaceCard>
            <Text style={styles.error}>{error}</Text>
          </SurfaceCard>
        ) : (
          <FlatList
            data={sources}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <SurfaceCard>
                <Text style={styles.title}>{item.nombre}</Text>
                <Text style={styles.subtitle}>Tipo: {item.tipo}</Text>
                <Text style={styles.amount}>
                  ${Number(item.montoEstimado ?? 0).toLocaleString()}
                </Text>

                <View style={styles.actions}>
                  <Pressable
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => router.push(`/finance/${item.id}`)}
                  >
                    <Text style={styles.actionButtonText}>Editar</Text>
                  </Pressable>

                  <Pressable
  style={[styles.actionButton, styles.deleteButton]}
  onPress={() => handleDelete(item.id)}
  disabled={deletingId === item.id}
>
  <Text style={styles.actionButtonText}>
    {deletingId === item.id ? 'Eliminando...' : 'Eliminar'}
  </Text>
</Pressable>
                </View>
              </SurfaceCard>
            )}
            ListEmptyComponent={
              <SurfaceCard>
                <Text style={styles.empty}>No tienes fuentes registradas todavía.</Text>
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
  listContent: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
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
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: palette.accent,
  },
  deleteButton: {
    backgroundColor: palette.danger,
  },
  actionButtonText: {
    color: palette.white,
    fontWeight: '800',
    fontSize: 14,
  },
  empty: {
    color: palette.inkSoft,
    fontSize: 14,
  },
  error: {
    color: palette.danger,
    fontWeight: '700',
  },
});