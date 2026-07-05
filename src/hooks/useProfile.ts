"use client";

import { useState, useEffect } from "react";
import { userService } from "@/services/userService";
import { UserProfile } from "@/types/user.types";
import useAuthStore from "@/store/authStore";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await userService.getProfile();
        setProfile(data);
      } catch (err) {
        setError("No se pudo cargar el perfil");
        console.error("Error fetching profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  return { profile, isLoading, error };
}