import { useRouter } from 'expo-router';
import React from 'react';
import { OnboardingFlowScreen } from '../src/screens/OnboardingFlowScreen';

export default function IndexRoute() {
  const router = useRouter();

  return <OnboardingFlowScreen onFinish={() => router.replace('/(tabs)')} />;
}