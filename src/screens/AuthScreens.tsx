import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton, HeaderBlock, InputField, Screen, SurfaceCard } from '../components/Ui';
import { palette, spacing } from '../theme';

type AuthProps = {
  onSubmit: () => void;
  onBack: () => void;
};

export function SignInScreen({ onSubmit, onBack }: AuthProps) {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Welcome back"
          title="Entrá a tu centro financiero"
          body="Accedé a tus movimientos, presupuestos y metas desde una sola vista móvil."
        />

        <SurfaceCard>
          <InputField label="Email" placeholder="hola@fluyo.app" />
          <InputField label="Contraseña" placeholder="••••••••" />
          <AppButton label="Ingresar" onPress={onSubmit} />
          <AppButton label="Volver" onPress={onBack} variant="secondary" />
        </SurfaceCard>
      </View>
    </Screen>
  );
}

export function SignUpScreen({ onSubmit, onBack }: AuthProps) {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Create account"
          title="Armá tu setup en menos de un minuto"
          body="Definí una cuenta principal, activá tus metas y arrancá con una estructura de control mensual."
        />

        <SurfaceCard>
          <InputField label="Nombre" placeholder="Diego" />
          <InputField label="Email" placeholder="hola@fluyo.app" />
          <InputField label="Presupuesto mensual" placeholder="$2,500" />
          <AppButton label="Continuar" onPress={onSubmit} />
          <AppButton label="Volver" onPress={onBack} variant="secondary" />
        </SurfaceCard>

        <Text style={styles.note}>Incluye onboarding simple, foco en ahorro y resumen diario automático.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
  },
  note: {
    color: palette.inkSoft,
    textAlign: 'center',
    lineHeight: 21,
  },
});