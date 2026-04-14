import { apiFetch } from './apiClient';
import { Asset, CreateAssetRequest, UpdateAssetRequest } from '../types/assets';

export async function getAssets(): Promise<Asset[]> {
  return await apiFetch('/api/assets', {
    method: 'GET',
    requiresAuth: true,
  });
}

export async function createAsset(
  payload: CreateAssetRequest
): Promise<{ message: string }> {
  return await apiFetch('/api/assets', {
    method: 'POST',
    requiresAuth: true,
    body: JSON.stringify(payload),
  });
}

export async function updateAsset(
  id: string,
  payload: UpdateAssetRequest
): Promise<{ message: string }> {
  return await apiFetch(`/api/assets/${id}`, {
    method: 'PUT',
    requiresAuth: true,
    body: JSON.stringify(payload),
  });
}

export async function deleteAsset(id: string): Promise<{ message: string }> {
  return await apiFetch(`/api/assets/${id}`, {
    method: 'DELETE',
    requiresAuth: true,
  });
}