import { createContext, ReactNode, useContext, useMemo } from "react";

import { AuthServiceImp } from "../api";
import { ResultState, SignInRequestDTO } from "../types";

interface State {
  signIn: (data: SignInRequestDTO) => Promise<ResultState>;
  logout: () => void;
  getToken: () => string | null;
}

interface AuthProviderProps {
  children: ReactNode;
  authService: AuthServiceImp;
}

const AuthContext = createContext<State | null>(null);

export function AuthProvider({ children, authService }: AuthProviderProps) {
  const signIn = authService.signIn.bind(authService);
  const getToken = authService.getToken.bind(authService);
  const logout = authService.logout.bind(authService);

  const value = useMemo(
    () => ({
      signIn,
      getToken,
      logout,
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};
