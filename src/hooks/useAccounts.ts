/* eslint-disable camelcase */
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useQueries } from "react-query";

import { QUERY_KEYS } from "../constant";
import { useAccountContext } from "../context/AccountContext";
import { AccountRequestParams, AccountResponseDTO } from "../types";
import { getFormattedAccountsData } from "../utils";

export const useAccounts = (params: AccountRequestParams) => {
  const { q, id, user_id } = params;
  const [total, setTotal] = useState(0);
  const accountApi = useAccountContext();

  const [_, { data, isLoading, isFetching, isError }] = useQueries([
    {
      queryKey: [QUERY_KEYS.ACCOUNT_LIST, { q, id, user_id }],
      queryFn: () => accountApi.getAccounts({ q, id, user_id }),
      select: (
        res: AxiosResponse<AccountResponseDTO[], AccountRequestParams>
      ) => res.data,
      onSuccess: (accountsTotal: AccountResponseDTO[]) => {
        setTotal(accountsTotal.length);
      },
    },
    {
      queryKey: [QUERY_KEYS.ACCOUNT_DETAIL, { ...params }],
      queryFn: () => accountApi.getAccounts({ ...params }),
      select: (res: any) => getFormattedAccountsData(res.data),
    },
  ]);

  return { total, data, isLoading, isFetching, isError };
};
