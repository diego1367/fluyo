export type Payable = {
  id: string;
  acreedor: string;
  concepto: string;
  monto: number;
  fechaCreacion: string;
};

export type CreatePayableRequest = {
  acreedor: string;
  concepto: string;
  monto: number;
};

export type UpdatePayableRequest = {
  acreedor: string;
  concepto: string;
  monto: number;
};