import { AxiosResponse } from "axios";
import { createContext, ReactNode, useContext, useMemo } from "react";

import { UserServiceImp } from "../api/UserService";
import {
  UserRequestParams,
  UserResponseDTO,
  UserSettingResponseDTO,
} from "../types";

interface State {
  getUsers: (
    params?: UserRequestParams
  ) => Promise<AxiosResponse<UserResponseDTO[], UserRequestParams>>;
  getUserSettings: () => Promise<AxiosResponse<UserSettingResponseDTO[], any>>;
}

interface UserProviderProps {
  children: ReactNode;
  userService: UserServiceImp;
}

const UserContext = createContext<State | null>(null);

export function UserProvider({ children, userService }: UserProviderProps) {
  const getUsers = userService.getUsers.bind(userService);
  const getUserSettings = userService.getUserSettings.bind(userService);

  const value = useMemo(
    () => ({
      getUsers,
      getUserSettings,
    }),
    []
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUsersContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within a UserProvider");
  return context;
};
