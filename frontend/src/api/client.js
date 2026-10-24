const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  try {
    const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(data?.error || data?.message || `Lỗi HTTP: ${response.status}`);
    }
    return data;
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Không thể kết nối đến máy chủ.');
    }
    throw error;
  }
}

export const api = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
};