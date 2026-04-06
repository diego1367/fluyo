import { useRouter } from 'expo-router';
import React from 'react';
import { TransactionsScreen } from '../src/screens/TransactionsScreens';

export default function TransactionsRoute() {
  const router = useRouter();

  return <TransactionsScreen onOpenTransaction={(item) => router.push(`/transaction/${item.id}`)} />;
}