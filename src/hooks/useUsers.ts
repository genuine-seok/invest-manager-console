/* eslint-disable camelcase */
import { useState } from "react";
import { QueryKey, useQuery } from "react-query";

import { httpClient, TokenRepositoryImp } from "../api";
import { AccountServiceImp } from "../api/AccountService";
import { UserServiceImp } from "../api/UserService";
import { UserListType, UsersType } from "../types";
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
  q: string;
  _page: number;
  _limit: number;
  // TODO: 활성화 여부 필처링 추가,
  // TODO: 임직원 계좌 여부 필터링 추가
}

// TODO: queryClient config 공통 option 적용
// TODO: query-Key 관리 컨벤션 수립
// TODO: users 정보와 account 정보를 공통으로 관리할 수 있는 커스텀 훅으로 개편하기
export const useUsers = (params: useUsersProps) => {
  const filteredParams = getValidParams(params);
  const [total, setTotal] = useState(0);
  const [userList, setUserList] = useState<UserListType>([]); // TODO: 초기 상태 정의

  // useQueries 로 변경가능하면 변경해보기 enabled 여부에 따라 다를 것 같음
  const { data: allUsers } = useQuery({
    queryKey: [`get-users-all`],
    queryFn: getUsersByQueryKey,
    select: (res: any) => res.data,
  });

  const { isLoading, isError, isFetching } = useQuery({
    queryKey: [`get-users-page-pageSize`, filteredParams],
    queryFn: getUsersByQueryKey,
    enabled: !!allUsers,
    select: (res: any) => res.data,
    onSuccess: async (users: UsersType) => {
      const userSettings = await userService.getUserSettings(); // TODO : 예외 처리
      const accounts = await accountService.getAccounts(); // TODO : 예외 처리
      const userList = getFormattedUserList(
        users,
        userSettings.data,
        accounts.data
      );

      setTotal(allUsers.length); // TODO: 위치 조정
      setUserList(userList);
    },
  });

  return { total, userList, isLoading, isError, isFetching };
};
