import { brokers, sider } from "../constant";

type MenuIds = typeof sider[number]["id"];
type MenuNames = typeof sider[number]["name"];
export type MenuKeywords = typeof sider[number]["keyword"];

type NetworkErrorState = {
  result: "fail";
  reason: string;
};
type SuccessState = {
  result: "success";
  data: any;
};
export type ResultState = SuccessState | NetworkErrorState;

export type MenuType = "DASHBOARD" | "ACCOUNTS" | "USERS" | "LOGOUT";

export type LoginData = {
  email: string;
  password: string;
};

export type UserType = {
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: string;
  created_at: string;
  updated_at: string;
};
export type UsersType = Array<UserType>;

export type UserListItemType = {
  name: string;
  account_count: number;
  email: string;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  last_login: string;
  allow_marketing_push: string;
  is_active: string;
  created_at: string;
};
export type UserListType = Array<UserListItemType>;

export type UserSettingType = {
  id: number;
  uuid: string;
  allow_marketing_push: boolean;
  allow_invest_push: boolean;
  is_active: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
};
export type UserSettingsType = Array<UserSettingType>;
export type UserSettingResponseDTO = Array<UserSettingType>;

export type AuthDataType = {
  accessToken: string;
  user: LoginData;
};

export type AccountData = {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: keyof Brokers;
  status: AccountStatusCode;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
export type AccountsData = AccountData[];

export type AccountStatusCode = 1 | 2 | 3 | 4 | 9999;
export type Brokers = typeof brokers;
