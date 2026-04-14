import { apiFetch } from './apiClient';
import {
  CreateReceivableRequest,
  Receivable,
  UpdateReceivableRequest,
} from '../types/receivables';

export async function getReceivables(): Promise<Receivable[]> {
  return await apiFetch('/api/finance/receivables', {
    method: 'GET',
    requiresAuth: true,
  });
}

export async function createReceivable(
  payload: CreateReceivableRequest
): Promise<{ message: string }> {
  return await apiFetch('/api/finance/receivables', {
    method: 'POST',
    requiresAuth: true,
    body: JSON.stringify(payload),
  });
}

export async function updateReceivable(
  id: string,
  payload: UpdateReceivableRequest
): Promise<{ message: string }> {
  return await apiFetch(`/api/finance/receivables/${id}`, {
    method: 'PUT',
    requiresAuth: true,
    body: JSON.stringify(payload),
  });
}

export async function deleteReceivable(id: string): Promise<{ message: string }> {
  return await apiFetch(`/api/finance/receivables/${id}`, {
    method: 'DELETE',
    requiresAuth: true,
  });
}