"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validators } from "@/utils/validators";
import authService from "@/services/authServices";
import useAuthStore from "@/store/authStore";
import { LoginPayload } from "@/types/auth.types";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({ mode: "onBlur" });

  const onSubmit = async (formData: LoginPayload) => {
    setServerError(null);

    try {
      const response = await authService.login(formData);
      setToken(response.access_token);
      setIsSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
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
      <div className={styles.cardGlow} />

      <div className={styles.cardHeader}>
        <h2 className={styles.title}>Inicio de sesión</h2>
        <p className={styles.subtitle}>
          ¡Hola, estás de vuelta! Ingresa con tu cuenta
        </p>
      </div>

      {isSuccess && (
        <div className={styles.alertSuccess}>
          <span className={styles.alertIcon}>✓</span>
          <div>
            <strong>¡Bienvenido!</strong>
            <p>Redirigiendo al inicio…</p>
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
              {...register("correo", validators.loginCorreo)}
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
              placeholder="Tu contraseña"
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              {...register("password", validators.loginPassword)}
            />
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password.message}</span>
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
            "Ingresar →"
          )}
        </button>
      </form>

      <p className={styles.registerLink}>
        ¿Aún no tienes una cuenta?{" "}
        <Link href="/register" className={styles.registerAnchor}>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}