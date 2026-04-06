import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { AppScreen } from '../types/navigation';
import { palette, radius, shadow, spacing, typography } from '../theme';

type ScreenProps = {
  children: React.ReactNode;
  padded?: boolean;
};

type SectionHeaderProps = {
  title: string;
  action?: string;
};

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  invert?: boolean;
};

type ProgressProps = {
  value: number;
  color?: string;
};

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
};

type BottomNavProps = {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
};

export function Screen({ children, padded = true }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, padded && styles.scrollPadded]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function HeroCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.heroCard}>{children}</View>;
}

export function SurfaceCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.surfaceCard}>{children}</View>;
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

export function StatCard({ label, value, helper, invert = false }: StatCardProps) {
  return (
    <View style={[styles.statCard, invert && styles.statCardInvert]}>
      <Text style={[styles.statLabel, invert && styles.statLabelInvert]}>{label}</Text>
      <Text style={[styles.statValue, invert && styles.statValueInvert]}>{value}</Text>
      {helper ? <Text style={[styles.helperText, invert && styles.helperTextInvert]}>{helper}</Text> : null}
    </View>
  );
}

export function ProgressBar({ value, color = palette.accent }: ProgressProps) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${Math.min(100, value * 100)}%`, backgroundColor: color }]} />
    </View>
  );
}

export function AppButton({ label, onPress, variant = 'primary' }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'ghost' && styles.buttonGhost,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text
        style={[
          styles.buttonLabel,
          variant === 'secondary' && styles.buttonLabelSecondary,
          variant === 'ghost' && styles.buttonLabelGhost,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function Pill({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <View style={[styles.pill, active && styles.pillActive]}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </View>
  );
}

export function InputField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput placeholder={placeholder} placeholderTextColor={palette.inkSoft} style={styles.input} />
    </View>
  );
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const items: { label: string; screen: AppScreen }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Budgets', screen: 'budgets' },
    { label: 'Analytics', screen: 'analytics' },
    { label: 'Cards', screen: 'cards' },
    { label: 'Profile', screen: 'profile' },
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => {
        const active = item.screen === currentScreen;
        return (
          <Pressable key={item.screen} onPress={() => onNavigate(item.screen)} style={styles.bottomNavItem}>
            <Text style={[styles.bottomNavText, active && styles.bottomNavTextActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function HeaderBlock({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <View style={styles.headerBlock}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.bodyText}>{body}</Text>
    </View>
  );
}

export const uiStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  split: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gap12: {
    gap: 12,
  },
  gap16: {
    gap: 16,
  },
  gap20: {
    gap: 20,
  },
  mt16: {
    marginTop: 16,
  },
  mt24: {
    marginTop: 24,
  },
  mt32: {
    marginTop: 32,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  scrollPadded: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  headerBlock: {
    gap: 8,
  },
  eyebrow: {
    color: palette.accent,
    fontSize: typography.caption,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerTitle: {
    color: palette.ink,
    fontSize: typography.hero,
    fontWeight: '800',
    lineHeight: 38,
  },
  bodyText: {
    color: palette.inkSoft,
    fontSize: typography.body,
    lineHeight: 23,
  },
  heroCard: {
    backgroundColor: palette.ink,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.md,
    ...shadow,
  },
  surfaceCard: {
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: palette.line,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    color: palette.ink,
    fontSize: typography.subtitle,
    fontWeight: '800',
  },
  sectionAction: {
    color: palette.accent,
    fontWeight: '700',
  },
  statCard: {
    flex: 1,
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: 6,
    borderWidth: 1,
    borderColor: palette.line,
  },
  statCardInvert: {
    backgroundColor: palette.accentStrong,
    borderColor: palette.accentStrong,
  },
  statLabel: {
    color: palette.inkSoft,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  statLabelInvert: {
    color: '#cde5de',
  },
  statValue: {
    color: palette.ink,
    fontSize: 24,
    fontWeight: '800',
  },
  statValueInvert: {
    color: palette.white,
  },
  helperText: {
    color: palette.inkSoft,
    fontSize: typography.caption,
  },
  helperTextInvert: {
    color: '#cde5de',
  },
  progressTrack: {
    height: 10,
    borderRadius: radius.full,
    backgroundColor: palette.surfaceMuted,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.full,
  },
  button: {
    backgroundColor: palette.accent,
    minHeight: 54,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  buttonSecondary: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4b696b',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  buttonLabel: {
    color: palette.white,
    fontSize: 15,
    fontWeight: '800',
  },
  buttonLabelSecondary: {
    color: palette.ink,
  },
  buttonLabelGhost: {
    color: palette.white,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: palette.surface,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: palette.line,
  },
  pillActive: {
    backgroundColor: palette.accentStrong,
    borderColor: palette.accentStrong,
  },
  pillText: {
    color: palette.ink,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  pillTextActive: {
    color: palette.white,
  },
  inputWrap: {
    gap: 8,
  },
  inputLabel: {
    color: palette.ink,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  input: {
    minHeight: 54,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
    paddingHorizontal: spacing.md,
    color: palette.ink,
  },
  bottomNav: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: palette.ink,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    ...shadow,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  bottomNavText: {
    color: '#9ec4bd',
    fontSize: 12,
    fontWeight: '700',
  },
  bottomNavTextActive: {
    color: palette.white,
  },
});