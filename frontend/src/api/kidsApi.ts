import { apiFetch } from "./http";
import type { Nino } from "./types";

export function getNinos(): Promise<Nino[]> {
  return apiFetch<Nino[]>("/ninos");
}
