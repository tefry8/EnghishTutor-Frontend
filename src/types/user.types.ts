export interface UserProfile {
  studentId: string;
  fullName: string;
  email: string;
}

export type ActiveSection = "lessons" | "practice" | "exam";