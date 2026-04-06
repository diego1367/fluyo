import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton, HeaderBlock, InputField, Pill, Screen, SurfaceCard, uiStyles } from '../components/Ui';
import { palette, spacing } from '../theme';

type Props = {
  onSave: () => void;
};

export function AddTransactionScreen({ onSave }: Props) {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="New entry"
          title="Cargar un movimiento sin fricción"
          body="Pantalla pensada para capturar gasto o ingreso con categoría, cuenta, monto y notas en un formato compacto."
        />

        <SurfaceCard>
          <View style={uiStyles.wrap}>
            <Pill label="Expense" active />
            <Pill label="Income" />
            <Pill label="Transfer" />
          </View>
          <InputField label="Amount" placeholder="$0.00" />
          <InputField label="Category" placeholder="Food & Drink" />
          <InputField label="Account" placeholder="Fluyo Black" />
          <InputField label="Notes" placeholder="Weekly coffee run" />
          <AppButton label="Save transaction" onPress={onSave} />
        </SurfaceCard>

        <Text style={styles.footer}>Queda lista la estructura visual; la persistencia puede conectarse después a Supabase, Firebase o tu API.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
  },
  footer: {
    color: palette.inkSoft,
    lineHeight: 22,
  },
});