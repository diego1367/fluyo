import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, SectionHeader, SurfaceCard } from '../../src/components/Ui';
import { getAssets, updateAsset } from '../../src/services/assetService';
import { Asset } from '../../src/types/assets';
import { palette, spacing } from '../../src/theme';

export default function EditAssetScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [asset, setAsset] = useState<Asset | null>(null);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valorEstimado, setValorEstimado] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadAsset = async () => {
    try {
      setLoading(true);

      const assets = await getAssets();
      const found = assets.find((x) => x.id === id);

      if (!found) {
        Alert.alert('Error', 'Activo no encontrado');
        router.replace('/assets');
        return;
      }

      setAsset(found);
      setNombre(found.nombre);
      setCategoria(found.categoria);
      setValorEstimado(String(found.valorEstimado));
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo cargar el activo');
      router.replace('/assets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadAsset();
    }
  }, [id]);

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
      setSaving(true);

      await updateAsset(String(id), {
        nombre: nombre.trim(),
        categoria: categoria.trim(),
        valorEstimado: valor,
      });

      Alert.alert('Éxito', 'Activo actualizado correctamente');
      router.replace('/assets');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo actualizar el activo');
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
        <SectionHeader title="Editar activo" />

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

          <Pressable style={styles.button} onPress={handleSave} disabled={saving}>
            <Text style={styles.buttonText}>
              {saving ? 'Guardando...' : 'Actualizar activo'}
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