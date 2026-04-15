import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { AppButton, HeaderBlock, InputField, Screen, SurfaceCard } from '../components/Ui';
import { loginService } from '../services/authService';
import { register } from "../services/api"; // 👈 Import arriba
import AsyncStorage from "@react-native-async-storage/async-storage";
import { palette, spacing } from '../theme';

// ---------------------- TYPES ----------------------
type SignInProps = {
  onSubmit: (token: string) => void;
  onBack: () => void;
  onRegister: () => void;
};

type SignUpProps = {
  onSubmit: () => void;
  onBack: () => void;
};

// ---------------------- SIGN IN ----------------------
export function SignInScreen({ onSubmit, onBack, onRegister }: SignInProps) {
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
      const result = await loginService({ email: email.trim(), password: password.trim() });

      if (!result.accessToken) throw new Error('La API no devolvió token');

      await AsyncStorage.setItem("token", result.accessToken);
      onSubmit(result.accessToken);
    } catch (error: any) {
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
          <InputField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <InputField label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
          <AppButton label={loading ? 'Ingresando...' : 'Ingresar'} onPress={handleLogin} />
          <AppButton label="Volver" onPress={onBack} variant="secondary" />
          <AppButton label="Crear cuenta" onPress={onRegister} variant="secondary" />
        </SurfaceCard>
      </View>
    </Screen>
  );
}

// ---------------------- SIGN UP ----------------------
export function SignUpScreen({ onSubmit, onBack }: SignUpProps) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Validación", "Las contraseñas no coinciden");
      return;
    }

    try {
      const result = await register(nombre, apellido, email, celular, password);
      console.log("Usuario creado:", result);
      onSubmit();
    } catch (error: any) {
      Alert.alert("Error", error.message || "No fue posible crear la cuenta");
    }
  };

  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Create account"
          title="Armá tu setup en menos de un minuto"
          body="Definí una cuenta principal, activá tus metas y arrancá con una estructura de control mensual."
        />
        <SurfaceCard>
          <InputField label="Nombre" value={nombre} onChangeText={setNombre} />
          <InputField label="Apellido" value={apellido} onChangeText={setApellido} />
          <InputField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <InputField label="Celular" value={celular} onChangeText={setCelular} keyboardType="phone-pad" />
          <InputField label="Presupuesto mensual" value={presupuesto} onChangeText={setPresupuesto} keyboardType="numeric" />
          <InputField label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
          <InputField label="Confirmar contraseña" placeholder="••••••••" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry
/>
          <AppButton label="Continuar" onPress={handleRegister} />
          <AppButton label="Volver" onPress={onBack} variant="secondary" />
          
        </SurfaceCard>
        <Text style={styles.note}>Incluye onboarding simple, foco en ahorro y resumen diario automático.</Text>
      </View>
    </Screen>
  );
}

// ---------------------- STYLES ----------------------
const styles = StyleSheet.create({
  shell: { flex: 1, padding: spacing.md, justifyContent: "center", gap: spacing.xl },
  note: { color: palette.inkSoft, textAlign: 'center', lineHeight: 21 },
});
