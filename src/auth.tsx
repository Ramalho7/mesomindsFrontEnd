import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "./Interface/User";
import { PayloadLoginShema } from "./service/schemas/loginSchema";
import { z } from "zod";
import api from "./service/axios";
import {
  PayloadRegisterSchema,
} from "./service/schemas/registerSchema";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    password_confirmation: string,
    nome: string,
    tipo: "Aluno" | "Professor",
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Restore auth state on app load
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      // Validate token with your API
      fetch("http://localhost:8000/api/validatetoken", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((userData) => {
          if (userData.user) {
            setIsAuthenticated(true);
            setUser(userData.user);
          } else {
            localStorage.removeItem("auth-token");
          }
        })
        .catch(() => {
          localStorage.removeItem("auth-token");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const validatedPayload = PayloadLoginShema.parse({ email, password });

      const response = await api.post("api/login", validatedPayload);

      const userData = await response.data;
      console.log(userData);
      setIsAuthenticated(true);
      setUser(userData.user);
      localStorage.setItem("auth-token", userData.token);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.issues);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log("isAuthenticated atualizado:", isAuthenticated);
  }, [isAuthenticated]);

  const register = async (
    email: string,
    password: string,
    password_confirmation: string,
    nome: string,
    tipo: "Aluno" | "Professor"
  ) => {
    try {
      const validatedPayload = PayloadRegisterSchema.parse({
        email,
        password,
        password_confirmation,
        nome,
        tipo,
      });

      const response = await api.post("api/register", validatedPayload);

      const userData = response.data;
      setIsAuthenticated(true);
      setUser(userData.user);
      localStorage.setItem("auth-token", userData.token);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.issues.map((issue) => issue.message).join(", ");
        throw new Error(message);
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("Erro ao registrar. Por favor, tente novamente.");
      }
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        await fetch("http://localhost:8000/api/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Erro ao fazer logout na API:", error);
      }
    }

    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("auth-token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
