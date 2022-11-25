type NetworkErrorState = {
  result: "fail";
  reason: string;
};
type SuccessState = {
  result: "success";
  data: any;
};
export type ResultState = SuccessState | NetworkErrorState;

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

export type MenuType = "DASHBOARD" | "ACCOUNTS" | "USERS" | "LOGOUT";
