import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import { getPayables, updatePayable } from '../../src/services/payableService';
import { Payable } from '../../src/types/payables';
import { palette, spacing } from '../../src/theme';

export default function EditPayableScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [payable, setPayable] = useState<Payable | null>(null);
  const [acreedor, setAcreedor] = useState('');
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadPayable = async () => {
    try {
      setLoading(true);

      const payables = await getPayables();
      const found = payables.find((x) => x.id === id);

      if (!found) {
        Alert.alert('Error', 'Cuenta por pagar no encontrada');
        router.replace('/payables');
        return;
      }

      setPayable(found);
      setAcreedor(found.acreedor);
      setConcepto(found.concepto);
      setMonto(String(found.monto));
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo cargar la cuenta por pagar');
      router.replace('/payables');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadPayable();
    }
  }, [id]);

  const handleSave = async () => {
    if (!acreedor.trim() || !concepto.trim() || !monto.trim()) {
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

      await updatePayable(String(id), {
        acreedor: acreedor.trim(),
        concepto: concepto.trim(),
        monto: valor,
      });

      Alert.alert('Éxito', 'Cuenta por pagar actualizada correctamente');
      router.replace('/payables');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo actualizar la cuenta por pagar');
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
        <SectionHeader title="Editar cuenta por pagar" />

        <SurfaceCard>
          <Text style={styles.label}>Acreedor</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Banco"
            value={acreedor}
            onChangeText={setAcreedor}
          />

          <Text style={styles.label}>Concepto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Tarjeta de crédito"
            value={concepto}
            onChangeText={setConcepto}
          />

          <Text style={styles.label}>Monto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 1200000"
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
          />

          <Pressable style={styles.button} onPress={handleSave} disabled={saving}>
            <Text style={styles.buttonText}>
              {saving ? 'Guardando...' : 'Actualizar cuenta por pagar'}
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