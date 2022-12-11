import React from "react";

import {
  ACCOUNTS_HEADERS,
  BROKERS,
  GENDER_ORIGIN,
  sider,
  USER_DETAIL,
  USERS_HEADERS,
} from "../constant";

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

// type MenuIds = typeof sider[number]["id"];
// type MenuNames = typeof sider[number]["name"];
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

export type UserHeaderKey = keyof typeof USERS_HEADERS;
export type UserHeaderValue = typeof USERS_HEADERS[UserHeaderKey];
export type UserDetailKey = keyof typeof USER_DETAIL;
export type UserDetailValue = typeof USER_DETAIL[UserDetailKey];

export type UserListItemType = {
  key: React.Key;
  name: string;
  user_id: number;
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
  user_name: string;
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
export type Brokers = typeof BROKERS;
export type AccountHeaderKey = keyof typeof ACCOUNTS_HEADERS;
export type AccountHeaderValue = typeof ACCOUNTS_HEADERS[AccountHeaderKey];

export type AccountListItemType = {
  key: React.Key;
  user_id: number;
  user_name: string;
  broker_name: string;
  number: string;
  status: string;
  name: string;
  assets: string;
  payments: string;
  is_active: string;
  created_at: string;
};

export type GenderOriginKey = keyof typeof GENDER_ORIGIN;
