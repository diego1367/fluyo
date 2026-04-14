export type Asset = {
  id: string;
  nombre: string;
  categoria: string;
  valorEstimado: number;
  fechaCreacion: string;
};

export type CreateAssetRequest = {
  nombre: string;
  categoria: string;
  valorEstimado: number;
};

export type UpdateAssetRequest = {
  nombre: string;
  categoria: string;
  valorEstimado: number;
};