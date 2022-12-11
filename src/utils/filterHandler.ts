import { ACCOUNT_STATUS, BROKERS } from "../constant";
import { AccountListItemType, UserListItemType } from "../types";
import { hasAccount } from "./accountsHandler";
import { getIsActiveText } from "./commonHandler";

export const getAccountsFiltersByKey = (key: string) => {
  switch (key) {
    case "broker_name":
      return Object.values(BROKERS).map((brokerName) => ({
        text: brokerName,
        value: brokerName,
      }));
    case "is_active":
      return [
        { text: "활성화", value: true },
        { text: "비활성화", value: false },
      ];
    case "status":
      return Object.keys(ACCOUNT_STATUS).map((key) => ({
        text: key,
        value: key,
      }));
    default:
      return false;
  }
};

export const getAccountsOnFilterByKey = (key: string) => {
  switch (key) {
    case "broker_name":
      return (value: string | number | boolean, record: AccountListItemType) =>
        record.broker_name === value;
    case "is_active":
      return (
        value: string | number | boolean,
        record: AccountListItemType
      ) => {
        const isActive = value as boolean;
        return record.is_active === getIsActiveText(isActive);
      };
    case "status":
      return (value: string | number | boolean, record: AccountListItemType) =>
        record.status === value;
    default:
      return false;
  }
};

// TODO: Object.entries 타입 추정 개선
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
      return (value: string | number | boolean, record: UserListItemType) =>
        hasAccount(record.account_count) === value;
    case "is_active":
      return (value: string | number | boolean, record: UserListItemType) => {
        const isActive = value as boolean;
        return record.is_active === getIsActiveText(isActive);
      };
    default:
      return false;
  }
};
