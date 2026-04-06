import { useRouter } from 'expo-router';
import React from 'react';
import { HomeScreen } from '../../src/screens/HomeScreen';

export default function HomeRoute() {
  const router = useRouter();

  return (
    <HomeScreen
      onNavigate={(screen) => {
        if (screen === 'wallet') router.push('/wallet');
        if (screen === 'transactions') router.push('/transactions');
        if (screen === 'notifications') router.push('/notifications');
        if (screen === 'goals') router.push('/goals');
        if (screen === 'add-transaction') router.push('/add-transaction');
      }}
      onOpenTransaction={(item) => router.push(`/transaction/${item.id}`)}
    />
  );
}