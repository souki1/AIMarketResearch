import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authApi } from "../lib/api";

const TOKEN_KEY = "custommarket_token";

export type UserInfo = {
  id: number;
  email: string;
  name: string | null;
  workspace_id: string;
  workspace_name: string;
};

type AuthContextValue = {
  token: string | null;
  user: UserInfo | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const setToken = useCallback((t: string | null) => {
    if (t) {
      localStorage.setItem(TOKEN_KEY, t);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    setTokenState(t);
    setUser(null);
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me(token)
      .then(setUser)
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, [token, setToken]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { access_token } = await authApi.login(email, password);
      setToken(access_token);
    },
    [setToken]
  );

  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      await authApi.register(email, password, name);
      const { access_token } = await authApi.login(email, password);
      setToken(access_token);
    },
    [setToken]
  );

  const logout = useCallback(() => {
    setToken(null);
  }, [setToken]);

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, register, logout, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
