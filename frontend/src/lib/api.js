// Central place for every backend call. If the URL or prefix ever changes, this is the ONE file you touch no component should hardcode a fetch URL.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

async function request(path, opts) {
  const res = await fetch(BASE_URL + path, opts);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  health: () => request("/health"),
  portfolio: () => request("/portfolio"),
  supplier: (id) => request(`/suppliers/${encodeURIComponent(id)}`),
  alerts: () => request("/alerts"),
  compare: (id1, id2) =>
    request(`/compare?id1=${encodeURIComponent(id1)}&id2=${encodeURIComponent(id2)}`),
  chat: (message, supplierId) =>
    request("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, supplier_id: supplierId || undefined }),
    }),
};