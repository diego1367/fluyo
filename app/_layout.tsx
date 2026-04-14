import { Stack } from 'expo-router';
import React from 'react';
import { palette } from '../src/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: palette.background },
        animation: 'slide_from_right',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: palette.background },
        headerTintColor: palette.ink,
        headerTitleStyle: { color: palette.ink, fontWeight: '800' },
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="wallet" options={{ title: 'Wallet' }} />
      <Stack.Screen name="transactions" options={{ title: 'Transactions' }} />
      <Stack.Screen name="transaction/[id]" options={{ title: 'Detail' }} />
      <Stack.Screen name="goals" options={{ title: 'Goals' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      <Stack.Screen name="add-transaction" options={{ title: 'New Transaction' }} />

      <Stack.Screen name="finance/index" options={{ title: 'Finanzas' }} />
      <Stack.Screen name="finance/sources" options={{ title: 'Fuentes' }} />
      <Stack.Screen name="finance/create-source" options={{ title: 'Nueva fuente' }} />
      <Stack.Screen name="finance/[id]" options={{ title: 'Editar fuente' }} />

      <Stack.Screen name="assets/index" options={{ title: 'Activos' }} />
      <Stack.Screen name="assets/create" options={{ title: 'Nuevo activo' }} />
      <Stack.Screen name="assets/[id]" options={{ title: 'Editar activo' }} />

      <Stack.Screen name="payables/index" options={{ title: 'Cuentas por pagar' }} />
      <Stack.Screen name="payables/create" options={{ title: 'Nueva cuenta por pagar' }} />
      <Stack.Screen name="payables/[id]" options={{ title: 'Editar cuenta por pagar' }} />

      <Stack.Screen name="receivables/index" options={{ title: 'Cuentas por cobrar' }} />
      <Stack.Screen name="receivables/create" options={{ title: 'Nueva cuenta por cobrar' }} />
      <Stack.Screen name="receivables/[id]" options={{ title: 'Editar cuenta por cobrar' }} />
    </Stack>
  );
}