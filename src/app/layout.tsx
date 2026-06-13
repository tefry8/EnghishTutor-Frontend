import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "@/app/globals.css";

// ─────────────────────────────────────────────
//  Fuente global: Nunito
//  (moderna, redondeada, perfecta para ed. tech)
// ─────────────────────────────────────────────

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-base",
});

// ─────────────────────────────────────────────
//  Metadata global
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "Tutor Inteligente",
    template: "%s | Tutor Inteligente",
  },
  description:
    "Sistema Tutor Inteligente para el aprendizaje de la gramática inglesa.",
  icons: {
    icon: "/favicon.ico",
  },
};

// ─────────────────────────────────────────────
//  Layout raíz
// ─────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={nunito.variable}>
      <body>{children}</body>
    </html>
  );
}