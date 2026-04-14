import { getAccessToken, clearSession } from './storageService';

const API_BASE_URL = 'https://localhost:7063';

type RequestOptions = RequestInit & {
  requiresAuth?: boolean;
};

export async function apiFetch(endpoint: string, options: RequestOptions = {}) {
  const { requiresAuth = false, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  if (requiresAuth) {
    const token = await getAccessToken();

    if (!token) {
      throw new Error('No hay token disponible. Inicia sesión nuevamente.');
    }

    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers: finalHeaders,
  });

  if (response.status === 401) {
    await clearSession();
    throw new Error('Sesión expirada. Inicia sesión nuevamente.');
  }

  const contentType = response.headers.get('content-type');

  let data: any = null;

  if (contentType?.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Ocurrió un error en la petición');
  }

  return data;
}