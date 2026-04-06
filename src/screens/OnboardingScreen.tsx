import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton, HeaderBlock, HeroCard, Pill, Screen, uiStyles } from '../components/Ui';
import { palette, spacing } from '../theme';

type Props = {
  onStart: () => void;
  onSignIn: () => void;
};

export function OnboardingScreen({ onStart, onSignIn }: Props) {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Fluyo Money"
          title="Tus finanzas con una interfaz más clara y viva"
          body="Un dashboard móvil para presupuesto, hábitos y metas con foco en decisiones rápidas, no en planillas eternas."
        />

        <HeroCard>
          <Text style={styles.heroEyebrow}>Smart Snapshot</Text>
          <Text style={styles.heroBalance}>$28,420.45</Text>
          <Text style={styles.heroBody}>Balance total distribuido entre cash, ahorro, inversión y tarjetas.</Text>
          <View style={[uiStyles.wrap, styles.pillRow]}>
            <Pill label="Savings +18%" active />
            <Pill label="Bills organized" />
            <Pill label="2 goals active" />
          </View>
        </HeroCard>

        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>Presupuestos</Text>
            <Text style={styles.featureText}>Categorías visibles, topes claros y alertas antes de pasarte.</Text>
          </View>
          <View style={[styles.featureCard, styles.featureCardAccent]}>
            <Text style={styles.featureTitleLight}>Metas</Text>
            <Text style={styles.featureTextLight}>Ahorro por objetivos con seguimiento mensual.</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <AppButton label="Crear cuenta" onPress={onStart} />
          <AppButton label="Ya tengo cuenta" onPress={onSignIn} variant="secondary" />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
  },
  heroEyebrow: {
    color: '#9ec4bd',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroBalance: {
    color: palette.white,
    fontSize: 44,
    fontWeight: '900',
  },
  heroBody: {
    color: '#d8ebe6',
    fontSize: 15,
    lineHeight: 22,
  },
  pillRow: {
    marginTop: spacing.sm,
  },
  featureGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  featureCard: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: palette.surface,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: palette.line,
    gap: 8,
  },
  featureCardAccent: {
    backgroundColor: palette.coral,
    borderColor: palette.coral,
  },
  featureTitle: {
    color: palette.ink,
    fontWeight: '800',
    fontSize: 18,
  },
  featureTitleLight: {
    color: palette.white,
    fontWeight: '800',
    fontSize: 18,
  },
  featureText: {
    color: palette.inkSoft,
    lineHeight: 22,
  },
  featureTextLight: {
    color: '#fff0ea',
    lineHeight: 22,
  },
  actions: {
    gap: spacing.sm,
  },
});