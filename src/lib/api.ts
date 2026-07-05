import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("auth-storage");
        if (raw) {
          const parsed = JSON.parse(raw);
          const token = parsed?.state?.token;
          if (token) config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // Si falla el parse, continúa sin token
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(
        new Error("No se pudo conectar con el servidor. Verifica tu conexión.")
      );
    }

    const { status } = error.response;

    // Si el token expiró, limpiar sesión y redirigir al login
    // Evitar redirigir automáticamente cuando la petición actual es el login/registro
    if (status === 401 && typeof window !== "undefined") {
      const requestUrl = (error.config as AxiosRequestConfig | undefined)?.url ?? "";
      const isAuthEndpoint = /\/auth\/(login|register)/.test(requestUrl);
      if (!isAuthEndpoint) {
        try {
          localStorage.removeItem("auth-storage");
        } catch {
          // ignorar
        }
        window.location.href = "/login";
      }
    }

    const statusMessages: Record<number, string> = {
      400: "Correo o contraseña incorrectos.",
      401: "Sesión expirada. Inicia sesión nuevamente.",
      403: "No tienes permiso para realizar esta acción.",
      404: "El recurso solicitado no existe.",
      409: "Ya existe un registro con estos datos.",
      422: "Los datos enviados no son válidos.",
      500: "Error interno del servidor. Intenta más tarde.",
    };

    const message =
      statusMessages[status] ?? `Error inesperado (código ${status}).`;

    return Promise.reject(new Error(message));
  }
);

export default api;



export const apiClient = {
  get: <T>(endpoint: string): Promise<T> =>
    api.get<T>(endpoint).then((res) => res.data),

  post: <T>(endpoint: string, body: unknown): Promise<T> =>
    api.post<T>(endpoint, body).then((res) => res.data),

  put: <T>(endpoint: string, body: unknown): Promise<T> =>
    api.put<T>(endpoint, body).then((res) => res.data),

  delete: <T>(endpoint: string): Promise<T> =>
    api.delete<T>(endpoint).then((res) => res.data),
};