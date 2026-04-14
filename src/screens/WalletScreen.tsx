import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { getAssets } from '../services/assetService';
import { Asset } from '../types/assets';
import { HeaderBlock, ProgressBar, Screen, SectionHeader, SurfaceCard, uiStyles } from '../components/Ui';
import { palette, spacing } from '../theme';

export function WalletScreen() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [assetsError, setAssetsError] = useState('');

  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    try {
      setLoadingAssets(true);
      setAssetsError('');

      const data = await getAssets();
      setAssets(data);
    } catch (error: any) {
      setAssetsError(error.message || 'No se pudieron cargar los activos');
    } finally {
      setLoadingAssets(false);
    }
  }

  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Wallet"
          title="Cuentas, efectivo y tarjetas en una sola vista"
          body="Una capa operativa para ver liquidez disponible, próximos débitos y cómo se reparte el dinero hoy."
        />

        <SectionHeader title="Mis activos" />

        <SurfaceCard>
          <View style={uiStyles.gap16}>
            {loadingAssets ? (
              <View style={styles.centerBox}>
                <ActivityIndicator size="small" color={palette.accent} />
                <Text style={styles.helperText}>Cargando activos...</Text>
              </View>
            ) : assetsError ? (
              <View style={styles.centerBox}>
                <Text style={styles.errorText}>{assetsError}</Text>
              </View>
            ) : assets.length === 0 ? (
              <View style={styles.centerBox}>
                <Text style={styles.helperText}>No tienes activos registrados.</Text>
              </View>
            ) : (
              assets.map((item) => (
                <View key={item.id} style={styles.assetCard}>
                  <View style={styles.assetHeader}>
                    <Text style={styles.assetName}>{item.nombre}</Text>
                    <Text style={styles.assetValue}>
                      ${Number(item.valorEstimado || 0).toLocaleString('es-CO')}
                    </Text>
                  </View>

                  <Text style={styles.assetCategory}>{item.categoria}</Text>

                  {!!item.fechaCreacion && (
                    <Text style={styles.assetDate}>
                      Creado: {new Date(item.fechaCreacion).toLocaleDateString('es-CO')}
                    </Text>
                  )}
                </View>
              ))
            )}
          </View>
        </SurfaceCard>

        <SectionHeader title="Liquidity split" />
        <SurfaceCard>
          <View style={uiStyles.gap16}>
            <Row label="Checking" value="42%" />
            <ProgressBar value={0.42} color={palette.accent} />
            <Row label="Emergency fund" value="33%" />
            <ProgressBar value={0.33} color={palette.gold} />
            <Row label="Brokerage" value="25%" />
            <ProgressBar value={0.25} color={palette.coral} />
          </View>
        </SurfaceCard>
      </View>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
  },
  centerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    gap: 10,
  },
  helperText: {
    color: palette.inkSoft,
    fontWeight: '600',
  },
  errorText: {
    color: '#d9534f',
    fontWeight: '700',
    textAlign: 'center',
  },
  assetCard: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 18,
    padding: spacing.lg,
    gap: 8,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  assetName: {
    color: palette.ink,
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  assetValue: {
    color: palette.accent,
    fontSize: 16,
    fontWeight: '900',
  },
  assetCategory: {
    color: palette.inkSoft,
    fontWeight: '700',
  },
  assetDate: {
    color: palette.inkSoft,
    fontSize: 12,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowLabel: {
    color: palette.ink,
    fontWeight: '700',
  },
  rowValue: {
    color: palette.inkSoft,
    fontWeight: '700',
  },
});