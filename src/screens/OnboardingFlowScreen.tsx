import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { palette, radius, shadow, spacing } from '../theme';

type Props = {
  onFinish: () => void;
};

const colors = {
  bg: '#f7f8fb',
  surface: '#ffffff',
  surfaceAlt: '#f2f5fb',
  ink: '#22345b',
  inkSoft: '#667796',
  navy: '#24365d',
  navySoft: '#3c4968',
  yellow: '#ffbe1b',
  green: '#36d39a',
  red: '#ff4058',
  line: '#d8e0ee',
  shadow: 'rgba(34, 52, 91, 0.12)',
};

const logo = require('../../assets/icon.png');

const moneyOptions = [
  { key: 'cash', label: 'Efectivo', icon: 'wallet' },
  { key: 'bank', label: 'Cuenta bancaria', icon: 'bank' },
  { key: 'digital', label: 'Billetera digital', icon: 'phone' },
  { key: 'other', label: 'Otro', icon: 'dots' },
];

const introTexts = [
  {
    title: '"Tu dinero puede ser simple. Vamos paso a paso."',
    body: '',
    action: 'Empezar',
    secondary: 'Saltar bienvenida',
  },
  {
    title: 'A veces ganar dinero sí es difícil',
    body: 'Y cuando llega, no siempre alcanza, no siempre se entiende y casi nunca se siente bajo control.',
    action: 'Tiene sentido',
  },
  {
    title: 'Fluyo te ayuda a ver,\nordenar y decidir mejor',
    bullets: [
      'Controla lo que entra y sale',
      'Obtén reportes fáciles de entender',
      'Decide con calma',
    ],
    action: 'Quiero eso',
  },
  {
    title: 'El control vuelve a ser\nYO',
    body: 'No más estrés. No más adivinanzas.',
    action: 'Vamos',
    accentWord: 'YO',
  },
];

export function OnboardingFlowScreen({ onFinish }: Props) {
  const [step, setStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['cash', 'bank']);
  const [incomeTab, setIncomeTab] = useState<'income' | 'expense'>('income');
  const [showGoalForm, setShowGoalForm] = useState(false);

  const currentIntro = useMemo(() => introTexts[step], [step]);

  const nextStep = () => setStep((current) => Math.min(current + 1, 9));

  const toggleOption = (key: string) => {
    setSelectedOptions((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {step <= 3 ? (
          <IntroStage
            step={step}
            title={currentIntro.title}
            body={currentIntro.body}
            bullets={currentIntro.bullets}
            action={currentIntro.action}
            secondary={currentIntro.secondary}
            accentWord={currentIntro.accentWord}
            onPrimaryPress={step === 3 ? () => setStep(4) : nextStep}
            onSecondaryPress={() => setStep(4)}
          />
        ) : null}

        {step === 4 ? <StartStage onPrimaryPress={() => setStep(5)} onSecondaryPress={() => setStep(5)} /> : null}

        {step === 5 ? (
          <MoneySourcesStage
            selectedOptions={selectedOptions}
            onToggleOption={toggleOption}
            onContinue={() => setStep(6)}
          />
        ) : null}

        {step === 6 ? <AssetsStage onContinue={() => setStep(7)} /> : null}

        {step === 7 ? (
          <IncomeExpensesStage
            incomeTab={incomeTab}
            onChangeTab={setIncomeTab}
            onContinue={() => setStep(8)}
          />
        ) : null}

        {step === 8 ? (
          <GoalsStage
            showGoalForm={showGoalForm}
            onToggleGoalForm={() => setShowGoalForm((current) => !current)}
            onContinue={() => setStep(9)}
          />
        ) : null}

        {step === 9 ? (
          <ResultsStage
            onContinue={onFinish}
            onOpenIncomeExpenses={() => setStep(7)}
            onOpenAssetsDebts={() => setStep(6)}
            onOpenGoals={() => setStep(8)}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function IntroStage({
  step,
  title,
  body,
  bullets,
  action,
  secondary,
  accentWord,
  onPrimaryPress,
  onSecondaryPress,
}: {
  step: number;
  title: string;
  body?: string;
  bullets?: string[];
  action: string;
  secondary?: string;
  accentWord?: string;
  onPrimaryPress: () => void;
  onSecondaryPress?: () => void;
}) {
  return (
    <View style={styles.stage}>
      <View style={styles.introTopSpacer} />
      {step === 0 ? <LogoCard compact={false} /> : <CollageArtwork />}

      <View style={styles.textBlock}>
        {accentWord ? (
          <Text style={styles.heroTitle}>
            El control vuelve a ser{'\n'}
            <Text style={styles.accentWord}>{accentWord}</Text>
          </Text>
        ) : (
          <Text style={step === 0 ? styles.quoteText : styles.heroTitle}>{title}</Text>
        )}

        {body ? <Text style={styles.heroBody}>{body}</Text> : null}

        {bullets ? (
          <View style={styles.bulletList}>
            {bullets.map((item) => (
              <View key={item} style={styles.bulletRow}>
                <View style={styles.bulletCheck}>
                  <Text style={styles.bulletCheckText}>✓</Text>
                </View>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      <View style={styles.bottomActions}>
        <PrimaryButton label={action} onPress={onPrimaryPress} highlighted={step === 3} />
        {secondary ? <TextButton label={secondary} onPress={onSecondaryPress ?? onPrimaryPress} /> : null}
      </View>
    </View>
  );
}

function StartStage({ onPrimaryPress, onSecondaryPress }: { onPrimaryPress: () => void; onSecondaryPress: () => void }) {
  return (
    <View style={styles.stage}>
      <LogoCard compact />
      <View style={styles.textBlock}>
        <Text style={styles.heroTitle}>Listos para empezar</Text>
        <Text style={styles.heroBody}>¿Quieres llenar primero tus datos a hoy o empezar de una vez?</Text>
      </View>

      <View style={styles.optionStack}>
        <ChoiceCard
          leadingStyle={styles.choiceLeadingNavy}
          symbol="✎"
          title="Ingresar mis datos a la fecha"
          subtitle="Recomendado para mejores reportes"
          onPress={onPrimaryPress}
        />
        <ChoiceCard
          leadingStyle={styles.choiceLeadingYellow}
          symbol="▶"
          title="Empezar sin llenar datos"
          subtitle="Puedes hacerlo después"
          onPress={onSecondaryPress}
        />
      </View>
    </View>
  );
}

function MoneySourcesStage({
  selectedOptions,
  onToggleOption,
  onContinue,
}: {
  selectedOptions: string[];
  onToggleOption: (key: string) => void;
  onContinue: () => void;
}) {
  return (
    <View style={styles.stage}>
      <LogoCard compact />
      <View style={styles.textBlockLarge}>
        <Text style={styles.sectionTitle}>¿Cómo mueves tu dinero?</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total disponible hoy</Text>
        <Text style={styles.totalValue}>$1,000</Text>
      </View>

      <View style={styles.optionStack}>
        {moneyOptions.map((option) => {
          const active = selectedOptions.includes(option.key);
          return (
            <View key={option.key}>
              <MoneyRow
                label={option.label}
                icon={option.icon}
                active={active}
                onPress={() => onToggleOption(option.key)}
              />
              {option.key === 'bank' && active ? <InlineAccountForm /> : null}
            </View>
          );
        })}
      </View>

      <PrimaryButton label="Continuar" onPress={onContinue} />
    </View>
  );
}

function AssetsStage({ onContinue }: { onContinue: () => void }) {
  return (
    <View style={styles.stage}>
      <LogoCard compact />
      <Text style={styles.sectionTitle}>Mis Activos y Deudas</Text>

      <SectionLabel text="Lo que tengo hoy" />
      <InfoPanel title="Dinero disponible" tone="default" rows={[['Efectivo', '$500,000']]} />
      <InfoPanel title="Dinero que me deben" tone="default" rows={[['Préstamo a Juan', '$300,000']]} />
      <InfoPanel title="Cosas que poseo" tone="default" rows={[['Laptop', '$700,000']]} />

      <SectionLabel text="Lo que debo hoy" />
      <InfoPanel title="Lista de deudas" tone="danger" rows={[['Crédito tarjeta', '$1,000,000']]} />

      <SummaryCard />

      <View style={styles.inlineActions}>
        <PrimaryButton label="Guardar y continuar" onPress={onContinue} compact />
        <SecondaryButton label="Saltar por ahora" onPress={onContinue} compact />
      </View>
    </View>
  );
}

function IncomeExpensesStage({
  incomeTab,
  onChangeTab,
  onContinue,
}: {
  incomeTab: 'income' | 'expense';
  onChangeTab: (tab: 'income' | 'expense') => void;
  onContinue: () => void;
}) {
  return (
    <View style={styles.stage}>
      <LogoCard compact />
      <Text style={styles.sectionTitle}>Ingresos y Gastos</Text>

      <View style={styles.segmentedControl}>
        <Segment label="Ingresos" active={incomeTab === 'income'} onPress={() => onChangeTab('income')} />
        <Segment label="Gastos" active={incomeTab === 'expense'} onPress={() => onChangeTab('expense')} />
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>{incomeTab === 'income' ? 'Nuevo ingreso' : 'Nuevo gasto'}</Text>
        <GhostInput placeholder="Valor" />
        <GhostInput placeholder="Descripción" />
        <GhostInput placeholder="Tercero" />
        <GhostInput placeholder="dd/mm/yyyy" hasIcon />
        <Pressable style={styles.addRowButton}>
          <Text style={styles.addRowPlus}>＋</Text>
          <Text style={styles.addRowText}>Agregar</Text>
        </Pressable>
      </View>

      <Text style={styles.smallSectionTitle}>{incomeTab === 'income' ? 'Ingresos fijos' : 'Gastos fijos'}</Text>
      <View style={styles.fixedCard}>
        <View>
          <Text style={styles.fixedTitle}>{incomeTab === 'income' ? 'Salario' : 'Arriendo'}</Text>
          <Text style={styles.fixedSubtitle}>{incomeTab === 'income' ? 'Empresa XYZ' : 'Pago recurrente'}</Text>
          <Text style={styles.fixedDate}>2026-03-15</Text>
        </View>
        <Text style={[styles.fixedAmount, incomeTab === 'income' ? styles.fixedAmountPositive : styles.fixedAmountNegative]}>
          {incomeTab === 'income' ? '$3,000,000' : '$1,200,000'}
        </Text>
      </View>

      <View style={styles.projectedCard}>
        <MetricRow label="Ingresos fijos:" value="$3,000,000" />
        <MetricRow label="Gastos fijos:" value="$1,200,000" />
        <View style={styles.metricDivider} />
        <MetricRow label="Saldo proyectado mensual:" value="$1,800,000" large />
      </View>

      <PrimaryButton label="Continuar" onPress={onContinue} />
    </View>
  );
}

function GoalsStage({
  showGoalForm,
  onToggleGoalForm,
  onContinue,
}: {
  showGoalForm: boolean;
  onToggleGoalForm: () => void;
  onContinue: () => void;
}) {
  return (
    <View style={styles.stage}>
      <LogoCard compact />
      <Text style={styles.sectionTitle}>¿Qué metas vamos a cumplir?</Text>

      {!showGoalForm ? (
        <Pressable style={styles.addGoalBar} onPress={onToggleGoalForm}>
          <Text style={styles.addGoalPlus}>＋</Text>
          <Text style={styles.addGoalText}>Agregar nueva meta</Text>
        </Pressable>
      ) : (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Nueva meta</Text>
          <GhostInput placeholder="Nombre de la meta" />
          <GhostInput placeholder="Valor estimado" />
          <GhostInput placeholder="dd/mm/yyyy" hasIcon />
          <View style={styles.inlineActions}>
            <PrimaryButton label="Guardar" onPress={onToggleGoalForm} compact />
            <SecondaryButton label="Cancelar" onPress={onToggleGoalForm} compact />
          </View>
        </View>
      )}

      <GoalCard />
      <PrimaryButton label="Ver mi dashboard" onPress={onContinue} highlighted />
    </View>
  );
}

function ResultsStage({
  onContinue,
  onOpenIncomeExpenses,
  onOpenAssetsDebts,
  onOpenGoals,
}: {
  onContinue: () => void;
  onOpenIncomeExpenses: () => void;
  onOpenAssetsDebts: () => void;
  onOpenGoals: () => void;
}) {
  return (
    <View style={styles.stage}>
      <LogoCard compact />
      <Text style={styles.sectionTitle}>Resultados</Text>

      <View style={styles.resultsHeroCard}>
        <View style={styles.resultsHeroCopy}>
          <Text style={styles.resultsHeroLabel}>Te queda este mes</Text>
          <Text style={styles.resultsHeroValue}>$450,000</Text>
          <Text style={styles.resultsHeroDelta}>↗ +18% vs mes anterior</Text>
        </View>
        <View style={styles.resultsHeroIconWrap}>
          <Image source={logo} style={styles.resultsHeroIcon} resizeMode="contain" />
        </View>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View style={styles.chartBadge}>
            <Text style={styles.chartBadgeText}>1</Text>
          </View>
          <Text style={styles.chartTitle}>Ingresos vs Gastos</Text>
        </View>
        <View style={styles.barChart}>
          <View style={styles.axisLabels}>
            {['3200000', '2400000', '1600000', '800000', '0'].map((label) => (
              <Text key={label} style={styles.axisLabel}>{label}</Text>
            ))}
          </View>
          <View style={styles.barPlot}>
            <View style={styles.barColumn}><View style={[styles.barValue, { height: 220 }]} /><Text style={styles.barMonth}>Ene</Text></View>
            <View style={styles.barColumn}><View style={[styles.barValue, { height: 236 }]} /><Text style={styles.barMonth}>Feb</Text></View>
            <View style={styles.barColumn}><View style={[styles.barValue, { height: 220 }]} /><Text style={styles.barMonth}>Mar</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View style={styles.chartBadge}>
            <Text style={styles.chartBadgeText}>2</Text>
          </View>
          <Text style={styles.chartTitle}>Cómo se mueve tu dinero</Text>
        </View>
        <View style={styles.donutWrap}>
          <View style={styles.donutRing}>
            <View style={styles.donutCenter} />
          </View>
        </View>
        <View style={styles.resultsLegend}>
          <LegendDot label="Ingresos" color={colors.green} />
          <LegendDot label="Gastos" color="#fb6d6f" />
          <LegendDot label="Ahorro" color={colors.yellow} />
        </View>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View style={styles.chartBadge}>
            <Text style={styles.chartBadgeText}>3</Text>
          </View>
          <Text style={styles.chartTitle}>Lo que tengo / lo que debo</Text>
        </View>
        <View style={styles.balanceSplit}>
          <View style={[styles.balanceBox, styles.balanceBoxPositive]}>
            <Text style={styles.balanceBoxLabel}>Tengo</Text>
            <Text style={styles.balanceBoxValuePositive}>$1.5M</Text>
          </View>
          <View style={[styles.balanceBox, styles.balanceBoxNegative]}>
            <Text style={styles.balanceBoxLabel}>Debo</Text>
            <Text style={styles.balanceBoxValueNegative}>$1.0M</Text>
          </View>
        </View>
      </View>

      <View style={styles.resultsActionRow}>
        <MiniActionButton label="Ingresos / Gastos" symbol="↗" onPress={onOpenIncomeExpenses} />
        <MiniActionButton label="Tengo / Debo" symbol="▣" onPress={onOpenAssetsDebts} />
      </View>

      <PrimaryButton label="Metas personales" onPress={onOpenGoals} highlighted />
      <SecondaryButton label="Ir a mi dashboard" onPress={onContinue} />
    </View>
  );
}

function LegendDot({ label, color }: { label: string; color: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

function MiniActionButton({
  label,
  symbol,
  onPress,
}: {
  label: string;
  symbol: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.miniActionButton} onPress={onPress}>
      <Text style={styles.miniActionIcon}>{symbol}</Text>
      <Text style={styles.miniActionLabel}>{label}</Text>
    </Pressable>
  );
}

function LogoCard({ compact }: { compact: boolean }) {
  return (
    <View style={[styles.logoCard, compact && styles.logoCardCompact]}>
      <Image source={logo} style={compact ? styles.logoImageCompact : styles.logoImage} resizeMode="contain" />
    </View>
  );
}

function CollageArtwork() {
  return (
    <View style={styles.collage}>
      {[0, 1, 2, 3].map((item) => (
        <View key={item} style={styles.collageTile}>
          <Image source={logo} style={styles.collageImage} resizeMode="contain" />
        </View>
      ))}
    </View>
  );
}

function ChoiceCard({
  leadingStyle,
  symbol,
  title,
  subtitle,
  onPress,
}: {
  leadingStyle: object;
  symbol: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.choiceCard} onPress={onPress}>
      <View style={[styles.choiceLeading, leadingStyle]}>
        <Text style={styles.choiceSymbol}>{symbol}</Text>
      </View>
      <View style={styles.choiceCopy}>
        <Text style={styles.choiceTitle}>{title}</Text>
        <Text style={styles.choiceSubtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

function MoneyRow({ label, icon, active, onPress }: { label: string; icon: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable style={styles.moneyRow} onPress={onPress}>
      <View style={[styles.checkbox, active && styles.checkboxActive]}>
        {active ? <Text style={styles.checkboxTick}>✓</Text> : null}
      </View>
      <View style={styles.moneyIconCircle}>
        <Text style={styles.moneyIcon}>{iconGlyph(icon)}</Text>
      </View>
      <Text style={styles.moneyLabel}>{label}</Text>
    </Pressable>
  );
}

function InlineAccountForm() {
  return (
    <View style={styles.inlineForm}>
      <GhostInput placeholder="sad´" active />
      <GhostInput placeholder="Tipo de cuenta" />
      <GhostInput placeholder="Saldo hoy" />
    </View>
  );
}

function InfoPanel({
  title,
  rows,
  tone,
}: {
  title: string;
  rows: Array<[string, string]>;
  tone: 'default' | 'danger';
}) {
  return (
    <View style={styles.infoPanel}>
      <Text style={styles.infoPanelTitle}>{title}</Text>
      {rows.map(([label, value]) => (
        <View key={`${label}-${value}`} style={[styles.infoRow, tone === 'danger' && styles.infoRowDanger]}>
          <Text style={styles.infoRowLabel}>{label}</Text>
          <Text style={[styles.infoRowValue, tone === 'danger' && styles.infoRowValueDanger]}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

function SummaryCard() {
  return (
    <View style={styles.summaryCard}>
      <MetricRow label="Tengo:" value="$1,500,000" />
      <MetricRow label="Debo:" value="$1,000,000" />
      <View style={styles.metricDivider} />
      <MetricRow label="Lo mío es:" value="$500,000" large />
    </View>
  );
}

function Segment({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.segment, active && styles.segmentActive]}>
      <Text style={[styles.segmentLabel, active && styles.segmentLabelActive]}>{label}</Text>
    </Pressable>
  );
}

function GoalCard() {
  return (
    <View style={styles.goalCard}>
      <View style={styles.goalHeader}>
        <Text style={styles.goalTitle}>Viaje a México</Text>
        <Text style={styles.goalPercent}>20%</Text>
      </View>
      <View style={styles.goalTrack}>
        <View style={styles.goalFill} />
      </View>

      <View style={styles.goalStats}>
        <GoalStatBox title="Meta total" value="$5.0M" />
        <GoalStatBox title="Faltante" value="$4.0M" tone="danger" />
        <GoalStatBox title="Exceso flujo" value="$1.8M" tone="success" />
      </View>

      <View style={styles.goalActions}>
        <OutlineAction label="Editar" />
        <OutlineAction label="Completar" tone="success" />
        <OutlineAction label="Eliminar" tone="danger" />
      </View>
    </View>
  );
}

function GoalStatBox({ title, value, tone = 'neutral' }: { title: string; value: string; tone?: 'neutral' | 'danger' | 'success' }) {
  return (
    <View
      style={[
        styles.goalStatBox,
        tone === 'danger' && styles.goalStatBoxDanger,
        tone === 'success' && styles.goalStatBoxSuccess,
      ]}
    >
      <Text style={styles.goalStatTitle}>{title}</Text>
      <Text
        style={[
          styles.goalStatValue,
          tone === 'danger' && styles.goalStatValueDanger,
          tone === 'success' && styles.goalStatValueSuccess,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

function OutlineAction({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'danger' | 'success' }) {
  return (
    <Pressable
      style={[
        styles.outlineAction,
        tone === 'danger' && styles.outlineActionDanger,
        tone === 'success' && styles.outlineActionSuccess,
      ]}
    >
      <Text
        style={[
          styles.outlineActionText,
          tone === 'danger' && styles.outlineActionTextDanger,
          tone === 'success' && styles.outlineActionTextSuccess,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function MetricRow({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return (
    <View style={styles.metricRow}>
      <Text style={[styles.metricLabel, large && styles.metricLabelLarge]}>{label}</Text>
      <Text style={[styles.metricValue, large && styles.metricValueLarge]}>{value}</Text>
    </View>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <Text style={styles.sectionLabel}>{text}</Text>;
}

function PrimaryButton({
  label,
  onPress,
  compact = false,
  highlighted = false,
}: {
  label: string;
  onPress: () => void;
  compact?: boolean;
  highlighted?: boolean;
}) {
  return (
    <Pressable style={[styles.primaryButton, compact && styles.primaryButtonCompact, highlighted && styles.primaryButtonYellow]} onPress={onPress}>
      <Text style={[styles.primaryButtonText, highlighted && styles.primaryButtonTextDark]}>{label}</Text>
    </Pressable>
  );
}

function SecondaryButton({ label, onPress, compact = false }: { label: string; onPress: () => void; compact?: boolean }) {
  return (
    <Pressable style={[styles.secondaryButton, compact && styles.secondaryButtonCompact]} onPress={onPress}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function TextButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.textButton}>{label}</Text>
    </Pressable>
  );
}

function GhostInput({ placeholder, hasIcon = false, active = false }: { placeholder: string; hasIcon?: boolean; active?: boolean }) {
  return (
    <View style={[styles.ghostInput, active && styles.ghostInputActive]}>
      <TextInput style={styles.ghostInputText} placeholder={placeholder} placeholderTextColor={colors.inkSoft} defaultValue={active ? placeholder : undefined} />
      {hasIcon ? <View style={styles.ghostInputIcon} /> : null}
    </View>
  );
}

function iconGlyph(icon: string) {
  switch (icon) {
    case 'wallet':
      return '▣';
    case 'bank':
      return '▤';
    case 'phone':
      return '◫';
    default:
      return '•••';
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 48,
  },
  stage: {
    gap: 22,
    minHeight: 760,
  },
  introTopSpacer: {
    height: 8,
  },
  logoCard: {
    alignSelf: 'center',
    backgroundColor: colors.navy,
    borderRadius: 28,
    padding: 18,
    ...shadow,
  },
  logoCardCompact: {
    borderRadius: 0,
    padding: 0,
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  logoImage: {
    width: 260,
    height: 260,
    borderRadius: 20,
  },
  logoImageCompact: {
    width: 190,
    height: 140,
  },
  collage: {
    alignSelf: 'center',
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.navy,
    borderRadius: 28,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...shadow,
  },
  collageTile: {
    width: '50%',
    height: '50%',
    borderWidth: 0.5,
    borderColor: '#425488',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#314a85',
  },
  collageImage: {
    width: '72%',
    height: '72%',
    opacity: 0.98,
  },
  textBlock: {
    gap: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  textBlockLarge: {
    paddingHorizontal: 8,
  },
  quoteText: {
    color: colors.inkSoft,
    fontSize: 28,
    lineHeight: 44,
    textAlign: 'center',
  },
  heroTitle: {
    color: colors.ink,
    fontSize: 34,
    lineHeight: 44,
    fontWeight: '900',
    textAlign: 'center',
  },
  accentWord: {
    color: colors.yellow,
  },
  heroBody: {
    color: colors.inkSoft,
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
  },
  bulletList: {
    width: '100%',
    gap: 18,
    marginTop: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bulletCheck: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulletCheckText: {
    color: colors.yellow,
    fontWeight: '900',
  },
  bulletText: {
    color: colors.inkSoft,
    fontSize: 18,
    flex: 1,
  },
  bottomActions: {
    marginTop: 'auto',
    gap: 14,
  },
  primaryButton: {
    minHeight: 68,
    backgroundColor: colors.navy,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  primaryButtonCompact: {
    flex: 1,
    minHeight: 54,
  },
  primaryButtonYellow: {
    backgroundColor: colors.yellow,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '800',
  },
  primaryButtonTextDark: {
    color: colors.ink,
  },
  secondaryButton: {
    minHeight: 68,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#e2e8f4',
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonCompact: {
    flex: 1,
    minHeight: 54,
  },
  secondaryButtonText: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '700',
  },
  textButton: {
    color: colors.inkSoft,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  optionStack: {
    gap: 16,
  },
  choiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    backgroundColor: colors.surface,
    borderRadius: 26,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: '#e3e8f1',
    ...shadow,
  },
  choiceLeading: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceLeadingNavy: {
    backgroundColor: colors.navy,
  },
  choiceLeadingYellow: {
    backgroundColor: colors.yellow,
  },
  choiceSymbol: {
    color: colors.surface,
    fontSize: 28,
    fontWeight: '700',
  },
  choiceCopy: {
    flex: 1,
    gap: 6,
  },
  choiceTitle: {
    color: colors.ink,
    fontSize: 24,
    lineHeight: 38,
    fontWeight: '800',
  },
  choiceSubtitle: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 34,
    lineHeight: 46,
    fontWeight: '900',
    textAlign: 'center',
  },
  totalCard: {
    backgroundColor: colors.navySoft,
    borderRadius: 24,
    paddingHorizontal: 26,
    paddingVertical: 28,
    ...shadow,
  },
  totalLabel: {
    color: '#d9deeb',
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: colors.surface,
    fontSize: 48,
    fontWeight: '300',
    marginTop: 8,
  },
  moneyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.surface,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#e3e8f1',
    ...shadow,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  checkboxTick: {
    color: colors.surface,
    fontWeight: '900',
    fontSize: 14,
  },
  moneyIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moneyIcon: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '900',
  },
  moneyLabel: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '500',
  },
  inlineForm: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 10,
    padding: 18,
    backgroundColor: colors.surface,
    borderRadius: 24,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e3e8f1',
    ...shadow,
  },
  ghostInput: {
    minHeight: 56,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ghostInputActive: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: '#c7cad0',
  },
  ghostInputText: {
    flex: 1,
    color: colors.ink,
    fontSize: 17,
  },
  ghostInputIcon: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#e5ebf5',
  },
  sectionLabel: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 4,
  },
  infoPanel: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e3e8f1',
    ...shadow,
  },
  infoPanelTitle: {
    color: colors.inkSoft,
    fontSize: 16,
    fontWeight: '700',
  },
  infoRow: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.full,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  infoRowDanger: {
    backgroundColor: '#fff3f5',
  },
  infoRowLabel: {
    color: colors.ink,
    fontSize: 16,
  },
  infoRowValue: {
    color: colors.ink,
    fontSize: 16,
  },
  infoRowValueDanger: {
    color: colors.red,
  },
  summaryCard: {
    backgroundColor: colors.navySoft,
    borderRadius: 28,
    padding: 24,
    gap: 18,
    ...shadow,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  metricLabel: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  metricLabelLarge: {
    fontSize: 18,
    fontWeight: '800',
  },
  metricValue: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: '300',
  },
  metricValueLarge: {
    fontSize: 28,
    fontWeight: '500',
  },
  metricDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  inlineActions: {
    flexDirection: 'row',
    gap: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    padding: 6,
    borderWidth: 1,
    borderColor: '#e3e8f1',
    ...shadow,
  },
  segment: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.navy,
  },
  segmentLabel: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '800',
  },
  segmentLabelActive: {
    color: colors.surface,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 26,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e3e8f1',
    ...shadow,
  },
  formTitle: {
    color: colors.inkSoft,
    fontSize: 16,
    fontWeight: '700',
  },
  addRowButton: {
    minHeight: 52,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  addRowPlus: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 28,
  },
  addRowText: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '700',
  },
  smallSectionTitle: {
    color: colors.inkSoft,
    fontSize: 16,
    fontWeight: '700',
  },
  fixedCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e3e8f1',
    ...shadow,
  },
  fixedTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '700',
  },
  fixedSubtitle: {
    color: colors.inkSoft,
    fontSize: 14,
    marginTop: 6,
  },
  fixedDate: {
    color: colors.inkSoft,
    fontSize: 14,
    marginTop: 8,
  },
  fixedAmount: {
    fontSize: 20,
    fontWeight: '400',
  },
  fixedAmountPositive: {
    color: colors.green,
  },
  fixedAmountNegative: {
    color: colors.red,
  },
  projectedCard: {
    backgroundColor: colors.navySoft,
    borderRadius: 28,
    padding: 22,
    gap: 16,
    ...shadow,
  },
  addGoalBar: {
    minHeight: 54,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
    ...shadow,
  },
  addGoalPlus: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 28,
  },
  addGoalText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  goalCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 18,
    gap: 18,
    borderWidth: 1,
    borderColor: '#e3e8f1',
    ...shadow,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalTitle: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '800',
  },
  goalPercent: {
    color: colors.inkSoft,
    fontSize: 18,
    fontWeight: '700',
  },
  goalTrack: {
    height: 18,
    borderRadius: radius.full,
    backgroundColor: '#d7dce6',
    overflow: 'hidden',
  },
  goalFill: {
    width: '20%',
    height: '100%',
    backgroundColor: colors.navy,
  },
  goalStats: {
    flexDirection: 'row',
    gap: 14,
  },
  goalStatBox: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 10,
  },
  goalStatBoxDanger: {
    backgroundColor: '#fff4f6',
  },
  goalStatBoxSuccess: {
    backgroundColor: '#eefbf5',
  },
  goalStatTitle: {
    color: colors.inkSoft,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  goalStatValue: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '500',
  },
  goalStatValueDanger: {
    color: colors.red,
  },
  goalStatValueSuccess: {
    color: colors.green,
  },
  goalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  outlineAction: {
    flex: 1,
    minHeight: 48,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#dce3ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineActionDanger: {
    borderColor: colors.red,
  },
  outlineActionSuccess: {
    borderColor: colors.green,
  },
  outlineActionText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  outlineActionTextDanger: {
    color: colors.red,
  },
  outlineActionTextSuccess: {
    color: colors.green,
  },
  resultsHeroCard: {
    backgroundColor: colors.navySoft,
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    ...shadow,
  },
  resultsHeroCopy: {
    flex: 1,
    gap: 6,
  },
  resultsHeroLabel: {
    color: '#dbe0ec',
    fontSize: 15,
    fontWeight: '700',
  },
  resultsHeroValue: {
    color: colors.surface,
    fontSize: 48,
    fontWeight: '300',
  },
  resultsHeroDelta: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '700',
  },
  resultsHeroIconWrap: {
    width: 140,
    height: 140,
    borderRadius: 28,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsHeroIcon: {
    width: 96,
    height: 96,
  },
  chartCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 18,
    gap: 18,
    borderWidth: 1,
    borderColor: '#e3e8f1',
    ...shadow,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  chartBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e7edf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartBadgeText: {
    color: colors.inkSoft,
    fontWeight: '900',
    fontSize: 20,
  },
  chartTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '800',
  },
  barChart: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
  axisLabels: {
    height: 280,
    justifyContent: 'space-between',
    paddingBottom: 34,
  },
  axisLabel: {
    color: '#606c7e',
    fontSize: 12,
  },
  barPlot: {
    flex: 1,
    height: 280,
    borderWidth: 1,
    borderColor: '#ebeff6',
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 14,
  },
  barColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  barValue: {
    width: 42,
    borderRadius: 12,
    backgroundColor: '#fb6d6f',
  },
  barMonth: {
    color: '#606c7e',
    fontSize: 14,
  },
  donutWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  donutRing: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#e7edf6',
    borderTopWidth: 28,
    borderTopColor: '#39cf99',
    borderRightWidth: 28,
    borderRightColor: '#ffbe1b',
    borderBottomWidth: 28,
    borderBottomColor: '#fb6d6f',
    borderLeftWidth: 28,
    borderLeftColor: '#39cf99',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-12deg' }],
  },
  donutCenter: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.surface,
  },
  resultsLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 26,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  legendLabel: {
    color: colors.inkSoft,
    fontSize: 16,
    fontWeight: '500',
  },
  balanceSplit: {
    flexDirection: 'row',
    gap: 18,
  },
  balanceBox: {
    flex: 1,
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: 'center',
    gap: 10,
  },
  balanceBoxPositive: {
    backgroundColor: '#edf3ff',
  },
  balanceBoxNegative: {
    backgroundColor: '#fff1f3',
  },
  balanceBoxLabel: {
    color: colors.inkSoft,
    fontSize: 16,
    fontWeight: '500',
  },
  balanceBoxValuePositive: {
    color: '#5b9bff',
    fontSize: 26,
    fontWeight: '500',
  },
  balanceBoxValueNegative: {
    color: '#fb6d6f',
    fontSize: 26,
    fontWeight: '500',
  },
  resultsActionRow: {
    flexDirection: 'row',
    gap: 16,
  },
  miniActionButton: {
    flex: 1,
    minHeight: 74,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#e3e8f1',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    ...shadow,
  },
  miniActionIcon: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '700',
  },
  miniActionLabel: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
});