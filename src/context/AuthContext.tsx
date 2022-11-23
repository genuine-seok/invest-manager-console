import { createContext, ReactNode, useContext, useMemo } from "react";

import { AuthServiceImp, ResultState } from "../api";
import { UserData } from "../types";

interface State {
  signIn: (data: UserData) => Promise<ResultState>;
  logout: () => void;
}

const AuthContext = createContext<State | null>(null);

export function AuthProvider({
  children,
  authService,
}: {
  children: ReactNode;
  authService: AuthServiceImp;
}) {
  const signIn = authService.signIn.bind(authService);
  const logout = authService.logout.bind(authService);

  const value = useMemo(
    () => ({
      signIn,
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
