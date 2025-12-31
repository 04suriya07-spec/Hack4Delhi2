const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'API request failed');
    }

    return response.json();
};

export const authApi = {
    login: (credentials: any) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    signup: (data: any) => apiFetch('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
};

export const wardApi = {
    getAll: () => apiFetch('/wards'),
    getById: (id: string) => apiFetch(`/wards/${id}`),
};

export const reportApi = {
    create: (data: any) => apiFetch('/reports', { method: 'POST', body: JSON.stringify(data) }),
    getMy: () => apiFetch('/reports/my'),
};

export const aiApi = {
    getAdvice: (data: { aqi: number, wardName: string, pollutionLevel: string }) =>
        apiFetch('/ai/advice', { method: 'POST', body: JSON.stringify(data) }),
};
