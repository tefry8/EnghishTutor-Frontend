"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { useProfile } from "@/hooks/useProfile";
import { ActiveSection } from "@/types/user.types";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import ContentArea from "@/components/dashboard/contentArea/contentArea";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { profile, isLoading } = useProfile();
  const [activeSection, setActiveSection] = useState<ActiveSection>("lessons");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    if (!isAuthenticated()) {
      router.replace("/login");
    }

    return () => cancelAnimationFrame(frame);
  }, [isAuthenticated, router]);

  // Evita que el HTML inicial del servidor y el cliente difieran.
  if (!mounted) {
    return (
      <div className={styles.layout}>
        <div className={styles.loadingScreen}>
          <div className={styles.loadingSpinner} />
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) return null;

  return (
    <div className={styles.layout}>
      <Sidebar
        profile={profile}
        isLoading={isLoading}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <ContentArea activeSection={activeSection} />
    </div>
  );
}