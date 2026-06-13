import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";
import styles from "./LoginPage.module.css";

export const metadata: Metadata = {
  title: "Iniciar sesión | Tutor Inteligente",
  description:
    "Inicia sesión en el Sistema Tutor Inteligente para el aprendizaje de la gramática inglesa.",
};

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.backgroundGradient} />

      <div className={styles.particles}>
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
      </div>

      <div className={styles.splitContainer}>

        {/* ── Panel izquierdo ── */}
        <div className={styles.leftPanel}>
          <div className={styles.leftContent}>

            <span className={styles.welcomeBadge}>✦ Bienvenido de vuelta</span>

            <h1 className={styles.welcomeTitle}>
              Welcome{" "}
              <span className={styles.welcomeAccent}>Back!</span>
            </h1>

            <div className={styles.illustrationWrapper}>
              <Image
                src="/images/image_circular.png"
                alt="Escudo I.E. David León"
                width={200}
                height={200}
                priority
              />
            </div>

            <p className={styles.welcomeSubtitle}>
              ¡Gracias por unirte! Este sistema fue creado
              para mejorar tus habilidades en inglés.
            </p>

            <div className={styles.schoolLogoWrapper}>
              <Image className={styles.schoolLogo}
                src="/images/logo_colegio.jpeg"
                alt="Escudo I.E. David León"
                width={52}
                height={52}
                priority
              />
              <div className={styles.schoolLogoText}>
                <strong>David León</strong>
                <span>I.E. Emblemática JEC</span>
                <span>Contumazá</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Panel derecho ── */}
        <div className={styles.rightPanel}>
          <div className={styles.tutorLogoWrapper}>
            <Image
              src="/images/logo.png"
              alt="Logo Tutor Inteligente"
              width={95}
              height={95}
              priority
            />
          </div>

          <LoginForm />
        </div>

      </div>
    </main>
  );
}