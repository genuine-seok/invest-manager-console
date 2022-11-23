import { ReactNode } from "react";

import { AuthServiceImp, httpClient, TokenRepositoryImp } from "../../api";
import { AuthProvider } from "../../context/AuthContext";

// TODO: sessionStorage repository 교체 테스트
// TODO: 모킹 데이터로 service 교체 테스트
const tokenRepository = new TokenRepositoryImp();
const authService = new AuthServiceImp(httpClient, tokenRepository);

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return <AuthProvider authService={authService}>{children}</AuthProvider>;
}
