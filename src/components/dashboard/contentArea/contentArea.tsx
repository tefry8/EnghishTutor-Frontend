import { ActiveSection } from "@/types/user.types";
import styles from "./contentArea.module.css";

interface ContentAreaProps {
  activeSection: ActiveSection;
}

// Estos componentes los crearemos después
const SECTION_LABELS: Record<ActiveSection, string> = {
  lessons: "Lessons",
  practice: "Practice",
  exam: "Exam",
};

export default function ContentArea({ activeSection }: ContentAreaProps) {
  return (
    <main className={styles.contentArea}>
      {/* 
        Aquí irá el contenido de cada sección.
        Por ahora un placeholder para tener la estructura lista.
        Reemplazar con:
          - activeSection === "lessons" → <LessonsView />
          - activeSection === "practice" → <PracticeView />
          - activeSection === "exam" → <ExamView />
      */}
      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>
          {activeSection === "lessons" && "📚"}
          {activeSection === "practice" && "✏️"}
          {activeSection === "exam" && "📝"}
        </div>
        <h2 className={styles.placeholderTitle}>
          {SECTION_LABELS[activeSection]}
        </h2>
        <p className={styles.placeholderText}>
          Esta sección estará disponible muy pronto
        </p>
      </div>
    </main>
  );
}