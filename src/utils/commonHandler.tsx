/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable react/display-name */
import { ColumnsType } from "antd/lib/table";
import axios from "axios";
import Link from "next/link";

import { ACCOUNT_HEADER, GENDER_ORIGIN, USER_HEADER } from "../constant";
import {
  Account,
  AccountHeaderValue,
  GenderOriginKey,
  MenuType,
  User,
  UserHeaderValue,
} from "../types";
import {
  getAccountsFiltersByKey,
  getAccountsOnFilterByKey,
  getUrlOfAccountList,
  getUrlOfUserList,
  getUsersFiltersByKey,
  getUsersOnFilterByKey,
} from ".";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const getIsActiveText = (isActive: boolean) => {
  return isActive ? "활성화" : "비활성화";
};

export const getGenderText = (str: GenderOriginKey) => {
  try {
    return GENDER_ORIGIN[str];
  } catch (error: unknown) {
    throw new Error(`unhandled gender origin key : ${error}`);
  }
};

export const getDeIdentifiedName = (name: string) => {
  const { length } = name;
  if (length === 2) return "*".repeat(length - 1) + name[length - 1];
  const newName = name[0] + "*".repeat(length - 1) + name[length - 1];
  return newName;
};

const getHeaderByMenu = (type: MenuType): Record<string, unknown> => {
  switch (type) {
    case "ACCOUNTS":
      return ACCOUNT_HEADER;
    case "USERS":
      return USER_HEADER;
    default:
      throw new Error("unhandled menu type for header");
  }
};

const getFilterByMenu = (type: MenuType, key: string) => {
  switch (type) {
    case "ACCOUNTS":
      return getAccountsFiltersByKey(key);
    case "DASHBOARD":
      return null;
    case "LOGOUT":
      return null;
    case "USERS":
      return getUsersFiltersByKey(key);
    default:
      return null;
    // throw new Error("unhandled menu type for filter");
  }
};

const getOnFilterByMenu = (type: MenuType, key: string) => {
  switch (type) {
    case "ACCOUNTS":
      return getAccountsOnFilterByKey(key);
    case "DASHBOARD":
      return false;
    case "LOGOUT":
      return false;
    case "USERS":
      return getUsersOnFilterByKey(key);
    default:
      return false;
  }
};

const getRenderByMenu = (type: MenuType, val: string) => {
  switch (type) {
    case "ACCOUNTS":
      return function (text: string, record: Account) {
        const url = getUrlOfAccountList(val as AccountHeaderValue, record);
        if (url) return <Link href={url}>{text}</Link>;
        return text;
      };
    case "DASHBOARD":
      return false;
    case "LOGOUT":
      return false;
    case "USERS":
      return function (text: string, record: User) {
        const url = getUrlOfUserList(val as UserHeaderValue, record);
        if (url) return <Link href={url}>{text}</Link>;
        return text;
      };
    default:
      throw new Error("unhandled menu type for render function");
  }
};

// Fix: 필터링 기능 버그 픽스
const makeFormattedColumnsByHeader = <T extends Record<string, any>>(
  header: Record<string, unknown>,
  type: MenuType
) => {
  const columns = Object.entries(header).map(([key, val]) => {
    const filters = getFilterByMenu(type, key);
    const onFilter = getOnFilterByMenu(type, key);
    const render = getRenderByMenu(type, val as string);
    const column = {
      title: `${val}`,
      dataIndex: `${key}`,
      key: `${key}`,
      width: "400",
      textWrap: "word-break",
      ...(filters && { filters }),
      ...(onFilter && { onFilter }),
      ...(render && { render }),
    };
    return column;
  });
  return columns;
};

export const getColumns = <T extends Record<string, any>>(
  type: MenuType
): ColumnsType<T> => {
  const header = getHeaderByMenu(type);
  const columns = makeFormattedColumnsByHeader<T>(header, type);
  return columns as ColumnsType<T>;
};
