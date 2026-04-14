import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import {
  getFinanceSourceById,
  updateFinanceSource,
} from '../../src/services/financeService';
import { palette, spacing } from '../../src/theme';

export default function EditFinanceSourceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [montoEstimado, setMontoEstimado] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSource = async () => {
    try {
      setLoading(true);

      if (!id || typeof id !== 'string') {
        throw new Error('Id inválido');
      }

      const data = await getFinanceSourceById(id);

      setNombre(data.nombre);
      setTipo(data.tipo);
      setMontoEstimado(String(data.montoEstimado));
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo cargar la fuente.');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSource();
  }, [id]);

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
      if (!id || typeof id !== 'string') {
        throw new Error('Id inválido');
      }

      setSaving(true);

      await updateFinanceSource(id, {
        nombre: nombre.trim(),
        tipo: tipo.trim(),
        montoEstimado: monto,
      });

      Alert.alert('Éxito', 'Fuente financiera actualizada correctamente.', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo actualizar la fuente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Screen>
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Cargando fuente...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.shell}>
        <SectionHeader title="Editar fuente financiera" />

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
            style={[styles.button, saving && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={styles.buttonText}>
              {saving ? 'Actualizando...' : 'Actualizar fuente'}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: '600',
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