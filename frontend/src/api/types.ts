export interface Nino {
  id: number;
  nombre: string;
  apellidos: string;
}

export interface Medicamento {
  id: number;
  nombre: string;
  descripcion: string;
}

export type EstadoEvento = "PENDIENTE" | "TOMADO" | "CANCELADO";

export interface EventoMedicacion {
  idEvento: number;
  nino: Nino;
  medicamento: Medicamento;
  fechaProgramada: string;  // ISO string
  horaProgramada: string;   // "HH:mm:ss"
  fechaTomada?: string | null;
  horaTomada?: string | null;
  estado: EstadoEvento;
}
