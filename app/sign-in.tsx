import { useRouter } from 'expo-router';
import React from 'react';
import { SignInScreen } from '../src/screens/AuthScreens';

export default function SignInRoute() {
  const router = useRouter();

  return <SignInScreen onSubmit={() => router.replace('/(tabs)')} onBack={() => router.back()} />;
}