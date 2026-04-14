import React, { useState } from 'react';
import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import { createPayable } from '../../src/services/payableService';
import { palette, spacing } from '../../src/theme';

export default function CreatePayableScreen() {
  const [acreedor, setAcreedor] = useState('');
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      await createPayable({
        acreedor: acreedor.trim(),
        concepto: concepto.trim(),
        monto: valor,
      });

      Alert.alert('Éxito', 'Cuenta por pagar creada correctamente');
      router.replace('/payables');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo crear la cuenta por pagar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.shell}>
        <SectionHeader title="Nueva cuenta por pagar" />

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

          <Pressable style={styles.button} onPress={handleSave} disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Guardando...' : 'Guardar cuenta por pagar'}
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