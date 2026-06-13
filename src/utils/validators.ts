export const validators = {
  // ─── Register ───
  nombre: {
    required: "El nombre es obligatorio.",
    minLength: { value: 2, message: "Mínimo 2 caracteres." },
    maxLength: { value: 80, message: "Máximo 80 caracteres." },
    pattern: {
      value: /^[a-zA-ZÀ-ÿ\s]+$/,
      message: "Solo letras y espacios.",
    },
  },
  correo: {
    required: "El correo es obligatorio.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Ingresa un correo válido.",
    },
  },
  password: {
    required: "La contraseña es obligatoria.",
    minLength: { value: 8, message: "Mínimo 8 caracteres." },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      message: "Debe tener mayúscula, número y carácter especial (!@#$%^&*).",
    },
  },
  confirmPassword: (pwd: string) => ({
    required: "Confirma tu contraseña.",
    validate: (val: string) =>
      val === pwd || "Las contraseñas no coinciden.",
  }),

  // ─── Login ───
  loginCorreo: {
    required: "El correo es obligatorio.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Ingresa un correo válido.",
    },
  },
  loginPassword: {
    required: "La contraseña es obligatoria.",
    minLength: { value: 6, message: "Mínimo 6 caracteres." },
  },
};