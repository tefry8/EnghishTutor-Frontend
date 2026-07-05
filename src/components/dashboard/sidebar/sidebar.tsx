"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { UserProfile, ActiveSection } from "@/types/user.types";
import styles from "./sidebar.module.css";

interface SidebarProps {
  profile: UserProfile | null;
  isLoading: boolean;
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

const NAV_ITEMS: { key: ActiveSection; label: string; icon: string }[] = [
  { key: "lessons", label: "Lessons", icon: "📚" },
  { key: "practice", label: "Practice", icon: "✏️" },
  { key: "exam", label: "Exam", icon: "📝" },
];

export default function Sidebar({
  profile,
  isLoading,
  activeSection,
  onSectionChange,
}: SidebarProps) {
  const router = useRouter();
  const { clearToken } = useAuthStore();

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  return (
    <aside className={styles.sidebar}>
      {/* Partículas decorativas */}
      <div className={styles.particles}>
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
      </div>

      {/* Logo tutor inteligente */}
      <div className={styles.logoWrapper}>
        <Image
          src="/images/logo.png"
          alt="Tutor Inteligente"
          width={72}
          height={72}
          className={styles.logo}
        />
      </div>

      {/* Perfil del estudiante */}
      <div className={styles.profileSection}>
        {isLoading ? (
          <div className={styles.skeletonWrapper}>
            <div className={`${styles.skeleton} ${styles.skeletonName}`} />
            <div className={`${styles.skeleton} ${styles.skeletonId}`} />
          </div>
        ) : (
          <>
            <div className={styles.greetingBadge}>
              <span>👋</span>
              <span>¡Hola, estudiante!</span>
            </div>

            <h2 className={styles.studentName}>
              {profile?.fullName ?? "Cargando..."}
            </h2>

            <div className={styles.studentIdBadge}>
              <span className={styles.studentIdLabel}>ID</span>
              <span className={styles.studentIdValue}>
                {profile?.studentId ?? "---"}
              </span>
            </div>

            <p className={styles.studentIdHint}>
              Recuerda tu ID para ingresar
            </p>
          </>
        )}
      </div>

      {/* Separador */}
      <div className={styles.divider} />

      {/* Navegación */}
      <nav className={styles.nav}>
        <p className={styles.navLabel}>Mi panel</p>
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <button
                className={`${styles.navItem} ${
                  activeSection === item.key ? styles.navItemActive : ""
                }`}
                onClick={() => onSectionChange(item.key)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navText}>{item.label}</span>
                {activeSection === item.key && (
                  <span className={styles.navIndicator} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Separador */}
      <div className={styles.divider} />

      {/* Logo del colegio */}
      <div className={styles.schoolWrapper}>
        <Image
          src="/images/logo_colegio.jpeg"
          alt="Logo Colegio"
          width={36}
          height={44}
          className={styles.schoolLogo}
        />
        <div className={styles.schoolInfo}>
          <strong>David León</strong>
          <span>I.E. Emblemática JEC</span>
          <span>Contumazá</span>
        </div>
      </div>

      {/* Cerrar sesión */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        <span className={styles.logoutIcon}>⏻</span>
        Cerrar sesión
      </button>
    </aside>
  );
}