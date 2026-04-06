import { useRouter } from 'expo-router';
import React from 'react';
import { SignUpScreen } from '../src/screens/AuthScreens';

export default function SignUpRoute() {
  const router = useRouter();

  return <SignUpScreen onSubmit={() => router.replace('/(tabs)')} onBack={() => router.back()} />;
}