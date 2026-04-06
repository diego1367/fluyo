import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { alerts } from '../data/mockData';
import { AppButton, HeaderBlock, Pill, Screen, SurfaceCard, uiStyles } from '../components/Ui';
import { palette, spacing } from '../theme';

type ProfileProps = {
  onOpenSettings: () => void;
};

export function NotificationsScreen() {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Alerts"
          title="Recordatorios y señales de riesgo"
          body="Este módulo concentra avisos útiles para actuar antes: vencimientos, desvíos de presupuesto y movimientos llamativos."
        />

        {alerts.map((alert) => (
          <SurfaceCard key={alert}>
            <Text style={styles.alertText}>{alert}</Text>
          </SurfaceCard>
        ))}
      </View>
    </Screen>
  );
}

export function ProfileScreen({ onOpenSettings }: ProfileProps) {
  return (
    <Screen>
      <View style={styles.shell}>
        <SurfaceCard>
          <Text style={styles.profileName}>Diego Guzman</Text>
          <Text style={styles.profileRole}>Personal finance control · Pro plan</Text>
          <View style={[uiStyles.wrap, styles.profileTags]}>
            <Pill label="3 goals" active />
            <Pill label="2 cards" />
            <Pill label="Budget synced" />
          </View>
        </SurfaceCard>

        <SurfaceCard>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Text style={styles.settingItem}>Weekly insights report</Text>
          <Text style={styles.settingItem}>Bill reminders</Text>
          <Text style={styles.settingItem}>Investment summary</Text>
        </SurfaceCard>

        <AppButton label="Open settings" onPress={onOpenSettings} />
      </View>
    </Screen>
  );
}

export function SettingsScreen() {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Settings"
          title="Preferencias, seguridad y automatizaciones"
          body="Configuración conceptual para notificaciones, seguridad biométrica, moneda principal y reportes automatizados."
        />

        <SurfaceCard>
          <Text style={styles.settingItem}>Biometric unlock · Enabled</Text>
          <Text style={styles.settingItem}>Main currency · USD</Text>
          <Text style={styles.settingItem}>Weekly digest · Monday 8:00</Text>
          <Text style={styles.settingItem}>Budget alerts · Enabled</Text>
        </SurfaceCard>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
  },
  alertText: {
    color: palette.ink,
    lineHeight: 23,
  },
  profileName: {
    color: palette.ink,
    fontSize: 28,
    fontWeight: '900',
  },
  profileRole: {
    color: palette.inkSoft,
  },
  profileTags: {
    marginTop: spacing.sm,
  },
  sectionTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  settingItem: {
    color: palette.inkSoft,
    lineHeight: 24,
  },
});