import { createContext } from 'react';

// Tipos para el contexto de autenticación
export interface User {
  userId: string;
  email: string;
  nombre: string;
  apellido: string;
  plan: 'estudiante' | 'profesor' | 'staff';
}

export interface LoginResponse {
  token: string;
  user: User;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
