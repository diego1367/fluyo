export type Receivable = {
  id: string;
  nombreDeudor: string;
  concepto: string;
  monto: number;
  fechaCreacion: string;
};

export type CreateReceivableRequest = {
  nombreDeudor: string;
  concepto: string;
  monto: number;
};

export type UpdateReceivableRequest = {
  nombreDeudor: string;
  concepto: string;
  monto: number;
};