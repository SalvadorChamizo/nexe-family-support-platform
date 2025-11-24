const BASE_URL = "http://localhost:8080";

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
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

  // Si no hay contenido (204) devolvemos null como T | null
  if (res.status === 204) {
    return null as T;
  }

  return (await res.json()) as T;
}

export default apiFetch;
