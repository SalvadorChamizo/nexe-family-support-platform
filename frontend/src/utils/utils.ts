export function getElement<T extends HTMLElement>(selector: string): T {
    const el = document.querySelector<T>(selector);
    if (!el)
        throw new Error(`Element not found: ${selector}`);
    return el;
}

// utils/http.ts
const API_BASE = "http://localhost:8080"; // Ajusta si es otro puerto

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }

  if (res.status === 204) {
    return null as unknown as T;
  }

  return (await res.json()) as T;
}
