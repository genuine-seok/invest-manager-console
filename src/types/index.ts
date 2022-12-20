import React from "react";

import {
  ACCOUNT_HEADER,
  ACCOUNT_STATUS,
  BROKERS,
  GENDER_ORIGIN,
  SIDER,
  USER_DETAIL,
  USER_HEADER,
} from "../constant";

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type MenuType = typeof SIDER[number]["keyword"];

type NetworkErrorState = {
  result: "fail";
  reason: string;
};
type SuccessState = {
  result: "success";
  data: any;
};
export type ResultState = SuccessState | NetworkErrorState;

export interface RequestParams {
  q?: string;
  _page?: number;
  _limit?: number;
}
export interface AccountRequestParams extends RequestParams {
  id?: string;
  user_id?: string;
}
export interface UserRequestParams extends RequestParams {
  id?: string;
}

export type AuthResponseDTO = {
  accessToken: string;
  user: SignInRequestDTO;
};

export type SignInRequestDTO = {
  email: string;
  password: string;
};

export type UserResponseDTO = {
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

export type UserHeaderKey = keyof typeof USER_HEADER;
export type UserHeaderValue = typeof USER_HEADER[UserHeaderKey];
export type UserDetailKey = keyof typeof USER_DETAIL;
export type UserDetailValue = typeof USER_DETAIL[UserDetailKey];

export type User = {
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

export type UserSettingResponseDTO = {
  id: number;
  uuid: string;
  allow_marketing_push: boolean;
  allow_invest_push: boolean;
  is_active: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
};

export type AccountResponseDTO = {
  id: number;
  user_id: number;
  user_name: string;
  uuid: string;
  broker_id: keyof Brokers;
  status: AccountStatusValue;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AccountStatusKey = keyof typeof ACCOUNT_STATUS;
export type AccountStatusValue = typeof ACCOUNT_STATUS[AccountStatusKey];
export type Brokers = typeof BROKERS;
export type AccountHeaderKey = keyof typeof ACCOUNT_HEADER;
export type AccountHeaderValue = typeof ACCOUNT_HEADER[AccountHeaderKey];

export type Account = {
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
