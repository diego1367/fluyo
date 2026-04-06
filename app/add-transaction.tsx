import { useRouter } from 'expo-router';
import React from 'react';
import { AddTransactionScreen } from '../src/screens/AddTransactionScreen';

export default function AddTransactionRoute() {
  const router = useRouter();

  return <AddTransactionScreen onSave={() => router.replace('/(tabs)')} />;
}