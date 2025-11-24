import apiFetch from "./http";
import type { EventoMedicacion } from "./types";

export const getEventos = (): Promise<EventoMedicacion[]> => {
  return apiFetch<EventoMedicacion[]>("/eventos-medicacion");
};

export const marcarEventoTomado = (
  idEvento: number
): Promise<EventoMedicacion> => {
  return apiFetch<EventoMedicacion>(`/eventos-medicacion/${idEvento}/tomado`, {
    method: "PUT",
  });
};

export const crearEvento = (
  evento: Partial<EventoMedicacion>
): Promise<EventoMedicacion> => {
  return apiFetch<EventoMedicacion>("/eventos-medicacion", {
    method: "POST",
    body: JSON.stringify(evento),
  });
};

export const actualizarEvento = (
  idEvento: number,
  evento: Partial<EventoMedicacion>
): Promise<EventoMedicacion> => {
  return apiFetch<EventoMedicacion>(`/eventos-medicacion/${idEvento}`, {
    method: "PUT",
    body: JSON.stringify(evento),
  });
};

