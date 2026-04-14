import { apiFetch } from './apiClient';
import {
  CreateFinanceSourceRequest,
  FinanceSource,
  InitialSummary,
} from '../types/finance';

export type UpdateFinanceSourceRequest = {
  nombre: string;
  tipo: string;
  montoEstimado: number;
};

export async function getInitialSummary(): Promise<InitialSummary> {
  return await apiFetch('/api/finance/summary-initial', {
    method: 'GET',
    requiresAuth: true,
  });
}

export async function getFinanceSources(): Promise<FinanceSource[]> {
  return await apiFetch('/api/finance/sources', {
    method: 'GET',
    requiresAuth: true,
  });
}

export async function getFinanceSourceById(id: string): Promise<FinanceSource> {
  return await apiFetch(`/api/finance/sources/${id}`, {
    method: 'GET',
    requiresAuth: true,
  });
}

export async function createFinanceSource(
  payload: CreateFinanceSourceRequest
): Promise<{ message: string }> {
  return await apiFetch('/api/finance/sources', {
    method: 'POST',
    requiresAuth: true,
    body: JSON.stringify(payload),
  });
}

export async function updateFinanceSource(
  id: string,
  payload: UpdateFinanceSourceRequest
): Promise<{
  message: string;
  source: FinanceSource;
}> {
  return await apiFetch(`/api/finance/sources/${id}`, {
    method: 'PUT',
    requiresAuth: true,
    body: JSON.stringify(payload),
  });
}

export async function deleteFinanceSource(id: string): Promise<{ message: string }> {
  return await apiFetch(`/api/finance/sources/${id}`, {
    method: 'DELETE',
    requiresAuth: true,
  });
}