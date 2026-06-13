"use client";

import { usePathname } from "next/navigation";
import styles from "./AuthLayout.module.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className={styles.enter}>
      {children}
    </div>
  );
}