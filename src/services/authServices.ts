import api from "@/lib/api";
import {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  ApiError,
} from "@/types/auth.types";
import { AxiosError } from "axios";

// ─────────────────────────────────────────────
//  Helpers internos
// ─────────────────────────────────────────────

const extractErrorMessage = (error: AxiosError<ApiError>): string => {
  const detail = error.response?.data?.detail;
  if (!detail) return error.message;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((d) => d.msg).join(", ");
  return "Ocurrió un error inesperado.";
};

// ─────────────────────────────────────────────
//  Auth Service
// ─────────────────────────────────────────────

const authService = {
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    try {
      const { data } = await api.post<RegisterResponse>("/auth/register", payload);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(extractErrorMessage(error));
      throw error;
    }
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", payload);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(extractErrorMessage(error));
      throw error;
    }
  },
};

export default authService;