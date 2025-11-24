import apiFetch from "./http";
import type { Medicamento } from "./types";

export const getMedicamentos = (): Promise<Medicamento[]> => {
  return apiFetch<Medicamento[]>("/medicamentos");
};
