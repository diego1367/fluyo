import React, { useState } from 'react';
import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import { createAsset } from '../../src/services/assetService';
import { palette, spacing } from '../../src/theme';

export default function CreateAssetScreen() {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valorEstimado, setValorEstimado] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!nombre.trim() || !categoria.trim() || !valorEstimado.trim()) {
      Alert.alert('Validación', 'Todos los campos son obligatorios');
      return;
    }

    const valor = Number(valorEstimado);

    if (isNaN(valor) || valor <= 0) {
      Alert.alert('Validación', 'El valor estimado debe ser mayor que 0');
      return;
    }

    try {
      setLoading(true);

      await createAsset({
        nombre: nombre.trim(),
        categoria: categoria.trim(),
        valorEstimado: valor,
      });

      Alert.alert('Éxito', 'Activo creado correctamente');
      router.replace('/assets');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo crear el activo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.shell}>
        <SectionHeader title="Nuevo activo" />

        <SurfaceCard>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Moto"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Categoría</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Vehículo"
            value={categoria}
            onChangeText={setCategoria}
          />

          <Text style={styles.label}>Valor estimado</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 18000000"
            value={valorEstimado}
            onChangeText={setValorEstimado}
            keyboardType="numeric"
          />

          <Pressable style={styles.button} onPress={handleSave} disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Guardando...' : 'Guardar activo'}
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