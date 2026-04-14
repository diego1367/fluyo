export type InitialSummary = {
  tengo: number;
  debo: number;
  loMioEs: number;
  mensaje: string;
};

export type FinanceSource = {
  id: string;
  nombre: string;
  tipo: string;
  montoEstimado: number;
  fechaCreacion: string;
};

export type CreateFinanceSourceRequest = {
  nombre: string;
  tipo: string;
  montoEstimado: number;
};