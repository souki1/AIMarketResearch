/**
 * API client for CustomMarket backend.
 * Set VITE_API_URL in .env or leave default for local dev.
 */
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export function getApiUrl(path: string): string {
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, ...init } = options;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...((init.headers as Record<string, string>) ?? {}),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(getApiUrl(path), { ...init, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error((err as { detail?: string }).detail ?? "Request failed");
  }
  return res.json();
}

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<{ access_token: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (email: string, password: string, name?: string) =>
    apiFetch<{ id: number; email: string; name: string | null; workspace_id: string; workspace_name: string }>(
      "/api/auth/register",
      { method: "POST", body: JSON.stringify({ email, password, name }) }
    ),
  me: (token: string) =>
    apiFetch<{ id: number; email: string; name: string | null; workspace_id: string; workspace_name: string }>(
      "/api/auth/me",
      { token }
    ),
};
