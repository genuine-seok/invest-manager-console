import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthServiceImp, httpClient, TokenRepositoryImp } from "../../api";
import { AccountServiceImp } from "../../api/AccountService";
import { UserServiceImp } from "../../api/UserService";
import { AccountProvider } from "../../context/AccountContext";
import { AuthProvider } from "../../context/AuthContext";
import { UserProvider } from "../../context/UserContext";

const tokenRepository = new TokenRepositoryImp();
const accountService = new AccountServiceImp(httpClient, tokenRepository);
const authService = new AuthServiceImp(httpClient, tokenRepository);
const userService = new UserServiceImp(httpClient, tokenRepository);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 0,
    },
  },
});

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AccountProvider accountService={accountService}>
        <AuthProvider authService={authService}>
          <UserProvider userService={userService}>{children}</UserProvider>
        </AuthProvider>
      </AccountProvider>
    </QueryClientProvider>
  );
}
