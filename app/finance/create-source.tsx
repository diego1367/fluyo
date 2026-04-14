import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import { createFinanceSource } from '../../src/services/financeService';
import { palette, spacing } from '../../src/theme';

export default function CreateFinanceSourceScreen() {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [montoEstimado, setMontoEstimado] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!nombre.trim()) {
      Alert.alert('Validación', 'Debes ingresar el nombre.');
      return;
    }

    if (!tipo.trim()) {
      Alert.alert('Validación', 'Debes ingresar el tipo.');
      return;
    }

    const monto = Number(montoEstimado);

    if (!montoEstimado.trim() || Number.isNaN(monto) || monto <= 0) {
      Alert.alert('Validación', 'Debes ingresar un monto estimado válido.');
      return;
    }

    try {
      setLoading(true);

      await createFinanceSource({
        nombre: nombre.trim(),
        tipo: tipo.trim(),
        montoEstimado: monto,
      });

      Alert.alert('Éxito', 'Fuente financiera creada correctamente.', [
        {
          text: 'OK',
          onPress: () => router.back()
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo crear la fuente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.shell}>
        <SectionHeader title="Nueva fuente financiera" />

        <SurfaceCard>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej. Salario"
            placeholderTextColor={palette.inkSoft}
            style={styles.input}
          />

          <Text style={styles.label}>Tipo</Text>
          <TextInput
            value={tipo}
            onChangeText={setTipo}
            placeholder="Ej. Ingreso fijo"
            placeholderTextColor={palette.inkSoft}
            style={styles.input}
          />

          <Text style={styles.label}>Monto estimado</Text>
          <TextInput
            value={montoEstimado}
            onChangeText={setMontoEstimado}
            placeholder="Ej. 2500000"
            placeholderTextColor={palette.inkSoft}
            keyboardType="numeric"
            style={styles.input}
          />

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Guardando...' : 'Guardar fuente'}
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
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: palette.ink,
    backgroundColor: palette.background,
  },
  button: {
    backgroundColor: palette.accent,
    padding: spacing.lg,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '800',
  },
});