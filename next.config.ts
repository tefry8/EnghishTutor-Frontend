import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permitir orígenes de desarrollo detectados (añade aquí otras IPs de tu red local si es necesario)
  allowedDevOrigins: ["192.168.0.121", "192.168.137.1"],
  // Configurar calidades adicionales para <Image /> usadas en el proyecto
  images: {
    qualities: [75, 80],
  },
};

export default nextConfig;