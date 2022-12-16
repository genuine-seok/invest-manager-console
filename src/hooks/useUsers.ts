/* eslint-disable camelcase */
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useQueries } from "react-query";

import { httpClient, TokenRepositoryImp } from "../api";
import { AccountServiceImp } from "../api/AccountService";
import { UserServiceImp } from "../api/UserService";
import { QUERY_KEYS } from "../constant";
import { UserListItemType, UsersType, UserType } from "../types";
import { getFormattedUserList } from "../utils";

// TODO: Context로 userService의 메서드들 (getUsers 등)을 로직 분리
const tokenRepository = new TokenRepositoryImp();
const userService = new UserServiceImp(httpClient, tokenRepository);
const accountService = new AccountServiceImp(httpClient, tokenRepository);

// TODO: type 정의 리팩토링
interface useUsersProps {
  q?: string;
  id?: string;
  _page?: number;
  _limit?: number;
}

// TODO: queryClient config 공통 option 적용
// TODO: users 정보와 account 정보를 공통으로 관리할 수 있는 커스텀 훅으로 개편하기
export const useUsers = (params: useUsersProps) => {
  const [total, setTotal] = useState(0);
  const [userList, setUserList] = useState<UserListItemType[]>([]); // TODO: 초기 상태 정의

  const [_, { data, isLoading, isFetching, isError }] = useQueries([
    {
      queryKey: [QUERY_KEYS.USER_LIST, { q: params.q }],
      queryFn: () => userService.getUsers({ q: params.q }),
      select: (res: AxiosResponse<UsersType, useUsersProps>) => res.data,
      onSuccess: (usersTotal: UserType[]) => {
        setTotal(usersTotal.length);
      },
    },
    {
      queryKey: [QUERY_KEYS.USER_DETAIL, { ...params }],
      queryFn: () => userService.getUsers({ ...params }),
      select: (res: AxiosResponse<UsersType, useUsersProps>) => res.data,
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
