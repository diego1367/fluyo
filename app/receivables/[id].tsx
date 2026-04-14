import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import { getReceivables, updateReceivable } from '../../src/services/receivableService';
import { Receivable } from '../../src/types/receivables';
import { palette, spacing } from '../../src/theme';

export default function EditReceivableScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [receivable, setReceivable] = useState<Receivable | null>(null);
  const [nombreDeudor, setNombreDeudor] = useState('');
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadReceivable = async () => {
    try {
      setLoading(true);

      const receivables = await getReceivables();
      const found = receivables.find((x) => x.id === id);

      if (!found) {
        Alert.alert('Error', 'Cuenta por cobrar no encontrada');
        router.replace('/receivables');
        return;
      }

      setReceivable(found);
      setNombreDeudor(found.nombreDeudor);
      setConcepto(found.concepto);
      setMonto(String(found.monto));
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo cargar la cuenta por cobrar');
      router.replace('/receivables');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadReceivable();
    }
  }, [id]);

  const handleSave = async () => {
    if (!nombreDeudor.trim() || !concepto.trim() || !monto.trim()) {
      Alert.alert('Validación', 'Todos los campos son obligatorios');
      return;
    }

    const valor = Number(monto);

    if (isNaN(valor) || valor <= 0) {
      Alert.alert('Validación', 'El monto debe ser mayor que 0');
      return;
    }

    try {
      setSaving(true);

      await updateReceivable(String(id), {
        nombreDeudor: nombreDeudor.trim(),
        concepto: concepto.trim(),
        monto: valor,
      });

      Alert.alert('Éxito', 'Cuenta por cobrar actualizada correctamente');
      router.replace('/receivables');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo actualizar la cuenta por cobrar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Screen>
        <ActivityIndicator size="large" />
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.shell}>
        <SectionHeader title="Editar cuenta por cobrar" />

        <SurfaceCard>
          <Text style={styles.label}>Nombre del deudor</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Juan Pérez"
            value={nombreDeudor}
            onChangeText={setNombreDeudor}
          />

          <Text style={styles.label}>Concepto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Préstamo personal"
            value={concepto}
            onChangeText={setConcepto}
          />

          <Text style={styles.label}>Monto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 500000"
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
          />

          <Pressable style={styles.button} onPress={handleSave} disabled={saving}>
            <Text style={styles.buttonText}>
              {saving ? 'Guardando...' : 'Actualizar cuenta por cobrar'}
            </Text>
          </Pressable>
        </SurfaceCard>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
  },
  label: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D8CFC2',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    backgroundColor: palette.white,
  },
  button: {
    backgroundColor: palette.accent,
    padding: spacing.lg,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: palette.white,
    fontWeight: '800',
    fontSize: 16,
  },
});