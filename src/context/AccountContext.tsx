import { AxiosResponse } from "axios";
import { createContext, ReactNode, useContext, useMemo } from "react";

import { AccountServiceImp } from "../api/AccountService";
import { AccountRequestParams, AccountResponseDTO } from "../types";

interface State {
  getAccounts: (
    params?: AccountRequestParams
  ) => Promise<AxiosResponse<AccountResponseDTO[], AccountRequestParams>>;
}

interface AccountProviderProps {
  children: ReactNode;
  accountService: AccountServiceImp;
}

const AccountContext = createContext<State | null>(null);

export function AccountProvider({
  children,
  accountService,
}: AccountProviderProps) {
  const getAccounts = accountService.getAccounts.bind(accountService);

  const value = useMemo(
    () => ({
      getAccounts,
    }),
    []
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context)
    throw new Error("useAccount must be used within a AccountProvider");
  return context;
};
