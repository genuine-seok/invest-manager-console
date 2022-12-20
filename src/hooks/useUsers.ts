/* eslint-disable camelcase */
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useQueries } from "react-query";

import { QUERY_KEYS } from "../constant";
import { useAccountContext } from "../context/AccountContext";
import { useUsersContext } from "../context/UserContext";
import { User, UserRequestParams, UserResponseDTO } from "../types";
import { getFormattedUserList } from "../utils";

export const useUsers = (params: UserRequestParams) => {
  const [total, setTotal] = useState(0);
  const [userList, setUserList] = useState<User[]>([]);
  const userApi = useUsersContext();
  const accountApi = useAccountContext();

  const [_, { data, isLoading, isFetching, isError }] = useQueries([
    {
      queryKey: [QUERY_KEYS.USER_LIST, { q: params.q }],
      queryFn: () => userApi.getUsers({ q: params.q }),
      select: (res: AxiosResponse<UserResponseDTO[], UserRequestParams>) =>
        res.data,
      onSuccess: (usersTotal: UserResponseDTO[]) => {
        setTotal(usersTotal.length);
      },
    },
    {
      queryKey: [QUERY_KEYS.USER_DETAIL, { ...params }],
      queryFn: () => userApi.getUsers({ ...params }),
      select: (res: AxiosResponse<UserResponseDTO[], UserRequestParams>) =>
        res.data,
      onSuccess: async (users: UserResponseDTO[]) => {
        const userSettings = await userApi.getUserSettings();
        const accounts = await accountApi.getAccounts();
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
