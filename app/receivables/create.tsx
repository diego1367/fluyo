import React, { useState } from 'react';
import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import { createReceivable } from '../../src/services/receivableService';
import { palette, spacing } from '../../src/theme';

export default function CreateReceivableScreen() {
  const [nombreDeudor, setNombreDeudor] = useState('');
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      await createReceivable({
        nombreDeudor: nombreDeudor.trim(),
        concepto: concepto.trim(),
        monto: valor,
      });

      Alert.alert('Éxito', 'Cuenta por cobrar creada correctamente');
      router.replace('/receivables');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo crear la cuenta por cobrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.shell}>
        <SectionHeader title="Nueva cuenta por cobrar" />

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

          <Pressable style={styles.button} onPress={handleSave} disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Guardando...' : 'Guardar cuenta por cobrar'}
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