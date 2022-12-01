/* eslint-disable camelcase */

import { AccountsData, UserSettingsType, UsersType } from "../types";
import { getIsActiveText } from "./commonHandler";
import { getFormattedBirthDate, getFormattedDate } from "./dateHandler";

const getDeIdentifiedName = (name: string) => {
  const { length } = name;
  if (length === 2) return "*".repeat(length - 1) + name[length - 1];
  const newName = name[0] + "*".repeat(length - 1) + name[length - 1];
  return newName;
};
const getDeIdentifiedPhoneNumber = (number: string) => {
  const reg = /-(\d{3,4})-/;
  return number.replace(reg, "-***-");
};

const getAllowMarketingPushText = (isAllowed: boolean) => {
  return isAllowed ? "동의" : "비동의";
};

export const getFormattedUserList = (
  users: UsersType,
  userSettings: UserSettingsType,
  accounts: AccountsData
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
        name: getDeIdentifiedName(name),
        account_count: targetUserAccounts.length,
        email,
        gender_origin,
        birth_date: getFormattedBirthDate(birth_date), // birth_date가 없는 경우
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
