// utils/types.ts

export interface Nino {
  id: number;          // ajusta si en el backend es idNinos
  nombre: string;
  apellidos: string;
}

export interface Medicamento {
  id: number;          // ajusta si en el backend es idMedicamento
  nombre: string;
  descripcion?: string;
}

export type EstadoEvento = "PENDIENTE" | "TOMADO" | "CANCELADO";

export interface EventoMedicacion {
  idEvento: number;
  nino: Nino;
  medicamento: Medicamento;
  fechaProgramada: string;
  horaProgramada: string;
  fechaTomada?: string | null;
  horaTomada?: string | null;
  estado: EstadoEvento;
}
