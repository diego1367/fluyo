import { saveSession } from './storageService';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  nombre?: string;
  email?: string;
};

export async function loginService(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`http://localhost:5151/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  let json: any = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { message: text };
  }

  if (!response.ok) {
    throw new Error(json.message || 'Error al iniciar sesión');
  }

  // Guardar sesión local
  if (json.accessToken) {
    await saveSession({
      accessToken: json.accessToken,
      refreshToken: json.refreshToken || '',
      nombre: json.nombre || '',
      email: json.email || '',
    });
  }

  return json;
}