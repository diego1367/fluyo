import { useRouter } from 'expo-router';
import React from 'react';
import { OnboardingScreen } from '../src/screens/OnboardingScreen';

export default function Index() {
  const router = useRouter();

  return (
    <OnboardingScreen
      onStart={() => router.push('/sign-up')}
      onSignIn={() => router.push('/sign-in')}
    />
  );
}