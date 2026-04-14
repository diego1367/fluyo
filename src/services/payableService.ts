import { apiFetch } from './apiClient';
import { CreatePayableRequest, Payable, UpdatePayableRequest } from '../types/payables';

export async function getPayables(): Promise<Payable[]> {
  return await apiFetch('/api/finance/payables', {
    method: 'GET',
    requiresAuth: true,
  });
}

export async function createPayable(
  payload: CreatePayableRequest
): Promise<{ message: string }> {
  return await apiFetch('/api/finance/payables', {
    method: 'POST',
    requiresAuth: true,
    body: JSON.stringify(payload),
  });
}

export async function updatePayable(
  id: string,
  payload: UpdatePayableRequest
): Promise<{ message: string }> {
  return await apiFetch(`/api/finance/payables/${id}`, {
    method: 'PUT',
    requiresAuth: true,
    body: JSON.stringify(payload),
  });
}

export async function deletePayable(id: string): Promise<{ message: string }> {
  return await apiFetch(`/api/finance/payables/${id}`, {
    method: 'DELETE',
    requiresAuth: true,
  });
}