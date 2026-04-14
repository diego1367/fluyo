import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppButton, HeaderBlock, InputField, Screen, SurfaceCard } from '../components/Ui';
import { loginService } from '../services/authService';
import { palette, spacing } from '../theme';
import { login, register } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SignInProps = {
  onSubmit: (token: string) => void;
  onBack: () => void;
};

type SignUpProps = {
  onSubmit: () => void;
  onBack: () => void;
};

export function SignInScreen({ onSubmit, onBack }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validación', 'Debes ingresar email y contraseña');
      return;
    }

    try {
      setLoading(true);

      const result = await loginService({
        email: email.trim(),
        password: password.trim(),
      });

      console.log('Login OK:', result);

      if (!result.accessToken) {
        throw new Error('La API no devolvió token');
      }

      onSubmit(result.accessToken);
    } catch (error: any) {
      console.error('Error login:', error);
      Alert.alert('Error', error.message || 'No fue posible iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Welcome back"
          title="Entrá a tu centro financiero"
          body="Accedé a tus movimientos, presupuestos y metas desde una sola vista móvil."
        />

        <SurfaceCard>
          <InputField
            label="Email"
            placeholder="hola@fluyo.app"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />

          <InputField
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <AppButton
            label={loading ? 'Ingresando...' : 'Ingresar'}
            onPress={handleLogin}
          />

          <AppButton label="Volver" onPress={onBack} variant="secondary" />
        </SurfaceCard>
      </View>
    </Screen>
  );
}

export function SignUpScreen({ onSubmit, onBack }: SignUpProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [presupuesto, setPresupuesto] = useState('');

  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Create account"
          title="Armá tu setup en menos de un minuto"
          body="Definí una cuenta principal, activá tus metas y arrancá con una estructura de control mensual."
        />
        <SurfaceCard>
          <InputField
            label="Nombre"
            placeholder="Diego"
            value={nombre}
            onChangeText={setNombre}
          />

          <InputField
            label="Email"
            placeholder="hola@fluyo.app"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />

          <InputField
            label="Presupuesto mensual"
            placeholder="$2,500"
            value={presupuesto}
            onChangeText={setPresupuesto}
            keyboardType="numeric"
          />

          <AppButton label="Continuar" onPress={onSubmit} />
          <AppButton label="Volver" onPress={onBack} variant="secondary" />
        </SurfaceCard>

        <Text style={styles.note}>
          Incluye onboarding simple, foco en ahorro y resumen diario automático.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: { gap: spacing.xl },
  input: {
    borderWidth: 1,
    borderColor: palette.inkSoft,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderRadius: 6,
  },
  note: {
    color: palette.inkSoft,
    textAlign: 'center',
    lineHeight: 21,
  },
});