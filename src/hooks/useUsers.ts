import { QueryKey, useQueries, useQuery } from "react-query";

import { httpClient, TokenRepositoryImp } from "../api";
import { UserServiceImp } from "../api/UserService";
import { getValidParams } from "../utils";

// TODO: Context로 userService의 메서드들 (getUsers 등)을 로직 분리
const tokenRepository = new TokenRepositoryImp();
const userService = new UserServiceImp(httpClient, tokenRepository);

const getUsersByQueryKey = async ({ queryKey }: { queryKey: QueryKey }) => {
  const res = await userService.getUsers(queryKey[1]);
  return res;
};

interface useUsersProps {
  q: string;
  _page: number;
  _limit: number;
}

// TODO: queryClient config 공통 option 적용
// TODO: query-Key 관리 컨벤션 수립
// TODO: users 정보와 account 정보를 공통으로 관리할 수 있는 커스텀 훅으로 개편하기
export const useUsers = (params: useUsersProps) => {
  const filteredParams = getValidParams(params);
  // TODO: res 데이터 타입 명시
  return useQueries([
    {
      queryKey: [`get-users-all`],
      queryFn: getUsersByQueryKey,
      select: (res: any) => res.data,
    },
    {
      queryKey: [`get-users-page-pageSize`, filteredParams],
      queryFn: getUsersByQueryKey,
      select: (res: any) => res.data,
    },
  ]);
};
