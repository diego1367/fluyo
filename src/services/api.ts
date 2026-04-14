import AsyncStorage from "@react-native-async-storage/async-storage";
import { goalDTO } from "../models/IGoals";

// Usa http en local (porque quitaste el redirect) y sin slash final
const API_URL = "http://localhost:5151";

// Helper para incluir el token en cada request
async function authHeader() {
  const token = await AsyncStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

// Registro
export async function register(
  nombre: string,
  apellido: string,
  email: string,
  celular: string,
  password: string
) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, apellido, email, celular, password }),
  });
  if (!response.ok) throw new Error("Error en registro");
  return await response.json();
}

// Login
export async function login(email: string, password: string) {
  const response = await fetch(`http://localhost:5151/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Error en login");
  return await response.json(); // devuelve accessToken, refreshToken, etc.
}

// Goals
export async function getGoals() {
  const res = await fetch(`${API_URL}/api/goals`, {
    headers: await authHeader(),
  });
  if (!res.ok) throw new Error("Error al obtener metas");
  return res.json();
}

// Crear meta (ajustado a lo que pide Swagger)
export async function createGoal(parametro : any) {
  const res = await fetch(`${API_URL}/api/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(parametro),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al crear meta: ${errorText}`);
  }
  return res.json();
}

export async function updateGoal(id: string, data: any) {
  const res = await fetch(`${API_URL}/api/goals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar meta");
  return res.json();
}

export async function deleteGoal(id: string) {
  const res = await fetch(`${API_URL}/api/goals/${id}`, {
    method: "DELETE",
    headers: await authHeader(),
  });
  if (!res.ok) throw new Error("Error al eliminar meta");
}

export async function completeGoal(id: string) {
  const res = await fetch(`${API_URL}/api/goals/${id}/complete`, {
    method: "POST",
    headers: await authHeader(),
  });
  if (!res.ok) throw new Error("Error al completar meta");
}
