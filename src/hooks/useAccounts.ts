/* eslint-disable camelcase */
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
  user_id?: string;
  _page?: number;
  _limit?: number;
}

// useAccounts시, getUserAPI를 받아와야되는게 맞나?
export const useAccounts = (params: UseAccountsProps) => {
  const { q, id, user_id } = params;
  const filteredParams = getValidParams(params);
  const [total, setTotal] = useState(0);
  const [_, { data, isLoading, isFetching, isError }] = useQueries([
    {
      // TODO: 쿼리 파라미터 입력값에 대한 쿼리키 추가
      // REFACTOR: 파라미터 전달 로직 개선
      queryKey: [`get-accounts-total`, { q, id, user_id }],
      queryFn: getAccountsByQueryKey,
      select: (res: any) => res.data,
      onSuccess: (accountsTotal: AccountsData[]) => {
        setTotal(accountsTotal.length);
      },
      staleTime: 0,
    },
    {
      queryKey: [`get-accounts`, filteredParams],
      queryFn: getAccountsByQueryKey,
      select: (res: any) => getFormattedAccountsData(res.data),
    },
  ]);

  return { total, data, isLoading, isFetching, isError };
};
