import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cards } from '../data/mockData';
import { HeaderBlock, Screen, SurfaceCard } from '../components/Ui';
import { palette, spacing } from '../theme';

export function CardsScreen() {
  return (
    <Screen>
      <View style={styles.shell}>
        <HeaderBlock
          eyebrow="Cards"
          title="Tarjetas y suscripciones recurrentes"
          body="Pantalla pensada para mostrar medios de pago, balance actual, cierres y gastos repetidos asociados."
        />

        {cards.map((card, index) => (
          <View key={card.number} style={[styles.card, { backgroundColor: index === 0 ? palette.ink : palette.accent }]}> 
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardNumber}>{card.number}</Text>
            <Text style={styles.cardBalance}>{card.balance}</Text>
          </View>
        ))}

        <SurfaceCard>
          <Text style={styles.title}>Recurring</Text>
          <Text style={styles.item}>Cloud Store · $18.99 · Apr 3</Text>
          <Text style={styles.item}>Music Box · $9.99 · Apr 12</Text>
          <Text style={styles.item}>Gym Plan · $36.00 · Apr 18</Text>
        </SurfaceCard>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shell: {
    gap: spacing.xl,
  },
  card: {
    borderRadius: 30,
    padding: spacing.xl,
    gap: 12,
  },
  cardName: {
    color: '#bde2da',
    fontWeight: '700',
  },
  cardNumber: {
    color: palette.white,
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 1,
  },
  cardBalance: {
    color: palette.white,
    fontWeight: '900',
    fontSize: 34,
  },
  title: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '800',
  },
  item: {
    color: palette.inkSoft,
    lineHeight: 22,
  },
});