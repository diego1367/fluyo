import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { AppButton, HeaderBlock, Screen, SurfaceCard } from '../components/Ui';
import { palette, spacing } from '../theme';
import { login, register } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthProps = {
  onSubmit: () => void;
  onBack: () => void;
};

export function SignInScreen({ onSubmit, onBack }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      const token = result.accessToken;
      if (!token) throw new Error("No se recibió accessToken");
      await AsyncStorage.setItem("token", token);
      onSubmit();
    } catch (err) {
      console.error("Error en login:", err);
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
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <AppButton label="Ingresar" onPress={handleLogin} />
          <AppButton label="Volver" onPress={onBack} variant="secondary" />
        </SurfaceCard>
      </View>
    </Screen>
  );
}

export function SignUpScreen({ onSubmit, onBack }: AuthProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const result = await register(nombre, "ApellidoDemo", email, "3000000000", password);
      console.log("Usuario registrado:", result);
      onSubmit();
    } catch (err) {
      console.error("Error en registro:", err);
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
          <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput placeholder="Presupuesto mensual" value={presupuesto} onChangeText={setPresupuesto} style={styles.input} />
          <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
          <AppButton label="Continuar" onPress={handleRegister} />
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