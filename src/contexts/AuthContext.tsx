import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { apiUrl } from '../lib/api';
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    let response: Response;
    try {
      response = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    } catch {
      throw new Error(
        'Não foi possível ligar à API. Verifique VITE_ADMIN_API_BASE_URL e a ligação de rede.'
      );
    }

    if (!response.ok) {
      let message = 'Credenciais inválidas';
      try {
        const body = await response.json();
        if (typeof body.error === 'string') {
          message =
            body.error === 'Invalid credentials'
              ? 'Credenciais inválidas'
              : body.error;
        }
      } catch {
        if (response.status >= 500) {
          message = 'Erro no servidor. Tente novamente mais tarde.';
        }
      }
      throw new Error(message);
    }

    const data = await response.json();
    const accessToken = data.accessToken as string | undefined;
    if (!accessToken) {
      throw new Error('Resposta de login inválida: accessToken em falta.');
    }
    setToken(accessToken);
    setIsAuthenticated(true);
    localStorage.setItem('token', accessToken);
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};