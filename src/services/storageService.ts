import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'fluyo_access_token';
const REFRESH_TOKEN_KEY = 'fluyo_refresh_token';
const USER_KEY = 'fluyo_user';

export type StoredUser = {
  nombre: string;
  email: string;
};

export async function saveSession(data: {
  accessToken: string;
  refreshToken: string;
  nombre: string;
  email: string;
}) {
  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, data.accessToken],
    [REFRESH_TOKEN_KEY, data.refreshToken],
    [USER_KEY, JSON.stringify({ nombre: data.nombre, email: data.email })],
  ]);
}

export async function getAccessToken(): Promise<string | null> {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
}

export async function getStoredUser(): Promise<StoredUser | null> {
  const raw = await AsyncStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function clearSession() {
  await AsyncStorage.multiRemove([
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    USER_KEY,
  ]);
}