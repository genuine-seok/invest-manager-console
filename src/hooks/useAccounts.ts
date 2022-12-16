/* eslint-disable camelcase */
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useQueries } from "react-query";

import { httpClient, TokenRepositoryImp } from "../api";
import { AccountServiceImp } from "../api/AccountService";
import { QUERY_KEYS } from "../constant";
import { AccountsData } from "../types";
import { getFormattedAccountsData } from "../utils";

// TODO: Context로 userService의 메서드들 (getUsers 등)을 로직 분리
const tokenRepository = new TokenRepositoryImp();
const AccountService = new AccountServiceImp(httpClient, tokenRepository);

interface UseAccountsProps {
  q?: string;
  id?: string;
  user_id?: string;
  _page?: number;
  _limit?: number;
}

// useAccounts시, getUserAPI를 받아와야되는게 맞나?
export const useAccounts = (params: UseAccountsProps) => {
  const { q, id, user_id } = params;
  const [total, setTotal] = useState(0);
  const [_, { data, isLoading, isFetching, isError }] = useQueries([
    {
      queryKey: [QUERY_KEYS.ACCOUNT_LIST, { q, id, user_id }],
      queryFn: () => AccountService.getAccounts({ q, id, user_id }),
      select: (res: AxiosResponse<AccountsData, UseAccountsProps>) => res.data,
      onSuccess: (accountsTotal: AccountsData) => {
        setTotal(accountsTotal.length);
      },
      staleTime: 0,
    },
    {
      queryKey: [QUERY_KEYS.ACCOUNT_DETAIL, { ...params }],
      queryFn: () => AccountService.getAccounts({ ...params }),
      select: (res: any) => getFormattedAccountsData(res.data),
    },
  ]);

  return { total, data, isLoading, isFetching, isError };
};
