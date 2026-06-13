"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validators } from "@/utils/validators";
import authService from "@/services/authServices";
import { RegisterPayload } from "@/types/auth.types";
import styles from "./RegisterForm.module.css";
// Agrega useWatch al import
import { useForm, useWatch } from "react-hook-form";
interface RegisterFormData extends RegisterPayload {
  confirmPassword: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({ mode: "onBlur" });

const passwordValue = useWatch({ control, name: "password", defaultValue: "" });

  const onSubmit = async (formData: RegisterFormData) => {
    setServerError(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _, ...payload } = formData;

    try {
      await authService.register(payload);
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 2500);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Ocurrió un error inesperado. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className={styles.card}>
      {/* Brillo decorativo de la tarjeta */}
      <div className={styles.cardGlow} />

      <div className={styles.cardHeader}>
        <h2 className={styles.title}>Crear cuenta</h2>
        <p className={styles.subtitle}>Únete y empieza a aprender hoy</p>
      </div>

      {isSuccess && (
        <div className={styles.alertSuccess}>
          <span className={styles.alertIcon}>✓</span>
          <div>
            <strong>¡Cuenta creada!</strong>
            <p>Redirigiendo al inicio de sesión…</p>
          </div>
        </div>
      )}

      {serverError && (
        <div className={styles.alertError}>
          <span className={styles.alertIcon}>⚠</span>
          <div>{serverError}</div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
        {/* Nombre completo */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="nombre">
            Nombre completo
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="nombre"
              type="text"
              placeholder="Ej: Jhefry Castillo"
              className={`${styles.input} ${errors.nombre ? styles.inputError : ""}`}
              {...register("nombre", validators.nombre)}
            />
          </div>
          {errors.nombre && (
            <span className={styles.errorMessage}>{errors.nombre.message}</span>
          )}
        </div>

        {/* Correo */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="correo">
            Correo electrónico
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="correo"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              className={`${styles.input} ${errors.correo ? styles.inputError : ""}`}
              {...register("correo", validators.correo)}
            />
          </div>
          {errors.correo && (
            <span className={styles.errorMessage}>{errors.correo.message}</span>
          )}
        </div>

        {/* Contraseña */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="password">
            Contraseña
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              {...register("password", validators.password)}
            />
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password.message}</span>
          )}
        </div>

        {/* Confirmar contraseña */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirmar contraseña
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repite tu contraseña"
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
              {...register("confirmPassword", validators.confirmPassword(passwordValue))}
            />
          </div>
          {errors.confirmPassword && (
            <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? (
            <span className={styles.spinner} />
          ) : (
            "Crear mi cuenta →"
          )}
        </button>
      </form>

      <p className={styles.loginLink}>
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className={styles.loginAnchor}>
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}