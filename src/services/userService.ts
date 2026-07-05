import { apiClient } from "@/lib/api";
import { UserProfile } from "@/types/user.types";

interface BackendProfile {
    id: number;
    nombre: string;
    correo: string;
    fecha_registro: string;
}

export const userService = {
    getProfile: async (): Promise<UserProfile> => {

        const response = await apiClient.get<BackendProfile>("/auth/me");

        return {
            studentId: String(response.id),
            fullName: response.nombre,
            email: response.correo,
        };
    },
};