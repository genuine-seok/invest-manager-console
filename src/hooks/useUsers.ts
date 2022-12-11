/* eslint-disable camelcase */
import { AxiosResponse } from "axios";
import { useState } from "react";
import { QueryKey, useQueries } from "react-query";

import { httpClient, TokenRepositoryImp } from "../api";
import { AccountServiceImp } from "../api/AccountService";
import { UserServiceImp } from "../api/UserService";
import { UserListItemType, UsersType, UserType } from "../types";
import { getFormattedUserList, getValidParams } from "../utils";

// TODO: Context로 userService의 메서드들 (getUsers 등)을 로직 분리
const tokenRepository = new TokenRepositoryImp();
const userService = new UserServiceImp(httpClient, tokenRepository);
const accountService = new AccountServiceImp(httpClient, tokenRepository);

const getUsersByQueryKey = async ({ queryKey }: { queryKey: QueryKey }) => {
  const res = await userService.getUsers(queryKey[1]);
  return res;
};

interface useUsersProps {
  q?: string;
  id?: string;
  _page?: number;
  _limit?: number;
}

// TODO: queryClient config 공통 option 적용
// TODO: query-Key 관리 컨벤션 수립
// TODO: users 정보와 account 정보를 공통으로 관리할 수 있는 커스텀 훅으로 개편하기
export const useUsers = (params: useUsersProps) => {
  const filteredParams = getValidParams(params);
  const [total, setTotal] = useState(0);
  const [userList, setUserList] = useState<UserListItemType[]>([]); // TODO: 초기 상태 정의

  const [_, { data, isLoading, isFetching, isError }] = useQueries([
    {
      queryKey: [`get-users-search-total`, { q: params.q }], // TODO: 쿼리 파라미터 입력값에 대한 쿼리키 추가
      queryFn: getUsersByQueryKey,
      select: (res: any) => res.data,
      onSuccess: (usersTotal: UserType[]) => {
        setTotal(usersTotal.length);
      },
    },
    {
      queryKey: [`get-users-search`, filteredParams],
      queryFn: getUsersByQueryKey,
      // TODO: 타입 정의
      select: (res: AxiosResponse<UsersType, any>) => res.data,
      onSuccess: async (users: UsersType) => {
        const userSettings = await userService.getUserSettings(); // TODO : 예외 처리
        const accounts = await accountService.getAccounts(); // TODO : 예외 처리
        const userList = getFormattedUserList(
          users,
          userSettings.data,
          accounts.data
        );
        setUserList(userList);
      },
    },
  ]);

  return { total, userList, data, isLoading, isError, isFetching };
};
