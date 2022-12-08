import { useState } from "react";
import { QueryKey, useQueries } from "react-query";

import { httpClient, TokenRepositoryImp } from "../api";
import { AccountServiceImp } from "../api/AccountService";
import { AccountsData } from "../types";
import { getFormattedAccountsData, getValidParams } from "../utils";

const tokenRepository = new TokenRepositoryImp();
const AccountService = new AccountServiceImp(httpClient, tokenRepository);

export const getAccountsByQueryKey = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  // TODO: [1] 을 MODIFIER로 제공
  const res = await AccountService.getAccounts(queryKey[1]);
  return res;
};

interface UseAccountsProps {
  q?: string;
  id?: string;
  _page?: number;
  _limit?: number;
}

export const useAccounts = (params: UseAccountsProps) => {
  const filteredParams = getValidParams(params);
  const [total, setTotal] = useState(0);
  const [_, { data, isLoading, isFetching, isError }] = useQueries([
    {
      queryKey: [`get-accounts-total`, { q: params.q }], // TODO: 쿼리 파라미터 입력값에 대한 쿼리키 추가
      queryFn: getAccountsByQueryKey,
      select: (res: any) => res.data,
      onSuccess: (accountsTotal: AccountsData[]) => {
        setTotal(accountsTotal.length);
      },
    },
    {
      queryKey: [`get-accounts`, filteredParams],
      queryFn: getAccountsByQueryKey,
      select: (res: any) => getFormattedAccountsData(res.data),
    },
  ]);

  return { total, data, isLoading, isFetching, isError };
};
