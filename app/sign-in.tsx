import { useRouter } from "expo-router";
import React from "react";
import { SignInScreen } from "../src/screens/AuthScreens";

export default function SignInRoute() {
  const router = useRouter();

  return (
    <SignInScreen
      // Al loguear, reemplaza la ruta actual por el grupo de tabs
      onSubmit={() => router.replace("/(tabs)")}
      // Para volver atrás (por ejemplo al onboarding)
      onBack={() => router.back()}
    />
  );
}