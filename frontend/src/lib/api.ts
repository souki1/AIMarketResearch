/**
 * API client for CustomMarket backend.
 * Uses VITE_API_URL from .env. Empty = same origin (Vite proxy in dev).
 * Set to backend URL for production, e.g. https://api.example.com
 */
export const API_BASE: string =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? "" : "http://localhost:8000");

export function getApiUrl(path: string): string {
  const base = API_BASE || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
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

export type StoredFile = {
  id: number;
  filename: string;
  storage_path: string;
  mime_type: string | null;
  size: number | null;
  tab_id?: number | null;
  parsed_data?: string[][] | null;
};

export type DataTab = {
  id: number;
  name: string;
  sort_order: number;
  file_count?: number;
};

function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  token?: string | null
): Promise<Response> {
  const headers: HeadersInit = { ...(options.headers as Record<string, string>) };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return fetch(url, { ...options, headers });
}

// Tabs
export const tabsApi = {
  list: (token?: string | null) =>
    fetchWithAuth(getApiUrl("api/tabs"), {}, token).then((r) => {
      if (!r.ok) throw new Error("Failed to list tabs");
      return r.json() as Promise<DataTab[]>;
    }),
  create: (name?: string, token?: string | null) =>
    apiFetch<DataTab>("/api/tabs", {
      method: "POST",
      body: JSON.stringify({ name: name ?? "New Tab" }),
      token: token ?? undefined,
    }),
  rename: (id: number, name: string, token?: string | null) =>
    apiFetch<DataTab>(`/api/tabs/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name }),
      token: token ?? undefined,
    }),
};

// Files
export const filesApi = {
  upload: async (
    files: File[],
    tabId?: number | null,
    token?: string | null
  ): Promise<{ uploaded: StoredFile[] }> => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    if (tabId != null) formData.append("tab_id", String(tabId));
    const res = await fetchWithAuth(getApiUrl("api/files/upload"), {
      method: "POST",
      body: formData,
    }, token);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error((err as { detail?: string }).detail ?? "Upload failed");
    }
    return res.json();
  },
  list: (tabId?: number | null, token?: string | null) => {
    const url = new URL(getApiUrl("api/files"));
    if (tabId != null) url.searchParams.set("tab_id", String(tabId));
    return fetchWithAuth(url.toString(), {}, token).then((r) => {
      if (!r.ok) throw new Error("Failed to list files");
      return r.json() as Promise<StoredFile[]>;
    });
  },
  getContentUrl: (id: number, token?: string | null) => {
    const url = getApiUrl(`api/files/${id}/content`);
    return token ? `${url}?token=${encodeURIComponent(token)}` : url;
  },
  delete: (id: number, token?: string | null) =>
    fetchWithAuth(getApiUrl(`api/files/${id}`), { method: "DELETE" }, token).then((r) => {
      if (!r.ok) throw new Error("Failed to delete file");
      return r.json();
    }),
};

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
