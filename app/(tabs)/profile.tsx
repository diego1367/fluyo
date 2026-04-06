import { useRouter } from 'expo-router';
import React from 'react';
import { ProfileScreen } from '../../src/screens/ProfileScreens';

export default function ProfileRoute() {
  const router = useRouter();

  return <ProfileScreen onOpenSettings={() => router.push('/settings')} />;
}