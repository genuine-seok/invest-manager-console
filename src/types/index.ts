export type UserData = {
  email: string;
  password: string;
};

export type AuthDataType = {
  accessToken: string;
  user: UserData;
};

export type MenuType = "DASHBOARD" | "ACCOUNTS" | "USERS" | "LOGOUT";
