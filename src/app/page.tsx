import { redirect } from "next/navigation";

// ─────────────────────────────────────────────
//  Página raíz "/"
//  Redirige automáticamente al registro
// ─────────────────────────────────────────────

export default function Home() {
  redirect("/login");
}