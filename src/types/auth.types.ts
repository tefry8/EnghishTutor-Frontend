// ─── Register ───────────────────────────────
export interface RegisterPayload {
  nombre: string;
  correo: string;
  password: string;
}

export interface RegisterResponse {
  id?: number | string;
  nombre?: string;
  correo?: string;
  message?: string;
}

// ─── Login ──────────────────────────────────
export interface LoginPayload {
  correo: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

// ─── Shared ─────────────────────────────────
export interface ApiError {
  detail:
    | string
    | Array<{ msg: string; type: string; loc?: string[] }>;
}