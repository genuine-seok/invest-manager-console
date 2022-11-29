import { brokers } from "../constant";

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

export type UserData = {
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
export type UsersData = UserData[];

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
