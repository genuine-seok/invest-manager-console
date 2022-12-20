/* eslint-disable camelcase */

import { USER_DETAIL } from "../constant";
import {
  AccountResponseDTO,
  GenderOriginKey,
  User,
  UserDetailKey,
  UserResponseDTO,
  UserSettingResponseDTO,
} from "../types";
import {
  getDeIdentifiedName,
  getFormattedBirthDate,
  getFormattedDate,
  getGenderText,
  getIsActiveText,
  hasAccount,
} from ".";

const getDeIdentifiedPhoneNumber = (number: string) => {
  const reg = /-(\d{3,4})-/;
  return number.replace(reg, "-***-");
};

const getAllowMarketingPushText = (isAllowed: boolean) => {
  return isAllowed ? "동의" : "비동의";
};

export const getFormattedUserList = (
  users: UserResponseDTO[],
  userSettings: UserSettingResponseDTO[],
  accounts: AccountResponseDTO[]
) => {
  const userList = users.map(
    ({
      id,
      name,
      email,
      gender_origin,
      birth_date,
      phone_number,
      last_login,
      created_at,
    }) => {
      const targetUserAccounts = accounts.filter(
        (account) => account.user_id === id
      );
      const targetUserSetting = userSettings.filter(
        (userSetting) => userSetting.id === id
      )[0];
      const allow_marketing_push =
        targetUserSetting?.allow_marketing_push ?? false;
      const is_active = targetUserSetting?.is_active ?? false;

      return {
        key: `${id}`,
        name: getDeIdentifiedName(name),
        user_id: id,
        account_count: targetUserAccounts.length,
        email,
        gender_origin,
        birth_date: getFormattedBirthDate(birth_date),
        phone_number: getDeIdentifiedPhoneNumber(phone_number),
        last_login: getFormattedDate(last_login),
        allow_marketing_push: getAllowMarketingPushText(allow_marketing_push),
        is_active: getIsActiveText(is_active),
        created_at: getFormattedDate(created_at),
      };
    }
  );
  return userList;
};

export const getFormattedUserDetail = (key: UserDetailKey, value: string) => {
  switch (key) {
    case "birth_date":
      return getFormattedBirthDate(value);
    case "created_at":
      return getFormattedDate(value);
    case "gender_origin":
      return getGenderText(value as GenderOriginKey);
    case "name":
      return getDeIdentifiedName(value);
    case "phone_number":
      return getDeIdentifiedPhoneNumber(value);
    default:
      return value;
  }
};

export const getUserDetailTextByKey = (key: UserDetailKey) => {
  try {
    return USER_DETAIL[key];
  } catch (e: unknown) {
    throw new Error("unavailable key for user text");
  }
};

export const isUsedForUserDetail = (key: keyof UserResponseDTO) => {
  switch (key) {
    case "id":
      return false;
    case "last_login":
      return false;
    case "photo":
      return false;
    case "updated_at":
      return false;
    case "uuid":
      return false;
    default:
      return true;
  }
};

export const getUsersFiltersByKey = (key: string) => {
  switch (key) {
    case "account_count":
      return [
        {
          text: "계좌 있음",
          value: true,
        },
        {
          text: "계좌 없음",
          value: false,
        },
      ];
    case "is_active":
      return [
        { text: "활성화", value: true },
        { text: "비활성화", value: false },
      ];
    default:
      return false;
  }
};

export const getUsersOnFilterByKey = (key: string) => {
  switch (key) {
    case "account_count":
      return (value: string | number | boolean, record: User) =>
        hasAccount(record.account_count) === value;
    case "is_active":
      return (value: string | number | boolean, record: User) => {
        const isActive = value as boolean;
        return record.is_active === getIsActiveText(isActive);
      };
    default:
      return false;
  }
};
