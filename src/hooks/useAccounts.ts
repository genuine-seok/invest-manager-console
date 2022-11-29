import { QueryKey, useQueries } from "react-query";

import { httpClient, TokenRepositoryImp } from "../api";
import { AccountServiceImp } from "../api/AccountService";
import { getFormattedAccountsData, getValidParams } from "../utils";

const tokenRepository = new TokenRepositoryImp();
const AccountService = new AccountServiceImp(httpClient, tokenRepository);

const getAccountsByQueryKey = async ({ queryKey }: { queryKey: QueryKey }) => {
  // TODO: [1] 을 MODIFIER로 제공
  const res = await AccountService.getAccounts(queryKey[1]);
  return res;
};

interface UseAccountsProps {
  q: string;
  _page: number;
  _limit: number;
}

export const useAccounts = (params: UseAccountsProps) => {
  const filteredParams = getValidParams(params);
  return useQueries([
    {
      queryKey: [`get-accounts-all`],
      queryFn: getAccountsByQueryKey,
      select: (res: any) => res.data,
    },
    {
      queryKey: [`get-accounts`, filteredParams],
      queryFn: getAccountsByQueryKey,
      select: (res: any) => getFormattedAccountsData(res.data),
    },
  ]);
};
