/* eslint-disable camelcase */
import {
  ACCOUNT_HEADER,
  ACCOUNT_STATUS,
  BROKER_FORMAT,
  BROKERS,
  ROUTER_PATH,
} from "../constant";
import {
  AccountData,
  AccountHeaderKey,
  AccountHeaderValue,
  AccountListItemType,
  AccountStatusCode,
  Brokers,
  UserHeaderValue,
  UserListItemType,
} from "../types";
import { getDeIdentifiedName, getFormattedDate, getIsActiveText } from ".";

const getAccountStatusByCode = (accountStatusCode: AccountStatusCode) => {
  switch (accountStatusCode) {
    case 1:
      return "입금대기";
    case 2:
      return "운용중";
    case 3:
      return "투자중지";
    case 4:
      return "해지";
    case 9999:
      return "관리자확인 필요";
    default:
      throw new Error("유효하지 않은 accountStatusCode 입니다.");
  }
};

const getBrokerNameById = (id: keyof Brokers) => {
  const broker = BROKERS[id];
  if (!broker) throw new Error("유효하지 않은 broker id 입니다.");
  return broker;
};

const getFormattedAmount = (amount: string) => {
  const dropped = amount.split(".")[0];
  const chunk = [];
  for (let i = 0; i < dropped.length; i += 1) {
    if ((i + 1) % 3 === 0) {
      chunk.unshift(
        dropped.slice(dropped.length - i - 1, dropped.length - i + 2)
      );
    }
  }
  return chunk.join(",");
};

const getDeIdentifiedNumber = (number: string) => {
  return (
    number.slice(0, 2) +
    "*".repeat(number.slice(2, number.length - 2).length) +
    number.slice(number.length - 2)
  );
};

const getFormattedNumberByBrokerId = (id: keyof Brokers, number: string) => {
  const format = BROKER_FORMAT[id];
  const hyphenIdxs = new Set();
  for (let i = 0; i < format.length; i += 1) {
    if (format[i] === "-") hyphenIdxs.add(i);
  }
  let formatted = "";
  for (let i = 0; i < number.length; i += 1) {
    if (hyphenIdxs.has(i)) formatted += "-";
    formatted += number[i];
  }
  return formatted;
};

export const getFormattedAccountsData = (
  data: AccountData[]
): Array<AccountListItemType> => {
  const newData = data.map(
    ({
      id,
      user_id,
      user_name,
      broker_id,
      number,
      status,
      name,
      assets,
      payments,
      is_active,
      created_at,
    }) => ({
      key: id,
      user_id,
      user_name: getDeIdentifiedName(user_name),
      broker_name: getBrokerNameById(broker_id),
      number: getFormattedNumberByBrokerId(
        broker_id,
        getDeIdentifiedNumber(number)
      ),
      status: getAccountStatusByCode(status),
      name,
      assets: getFormattedAmount(assets),
      payments: getFormattedAmount(payments),
      is_active: getIsActiveText(is_active),
      created_at: getFormattedDate(created_at),
    })
  );
  return newData;
};

export const hasAccount = (accountNumber: number) => accountNumber > 0;

export const getUrlOfUserList = (
  val: UserHeaderValue,
  record: UserListItemType
) => {
  switch (val) {
    case "고객명":
      return `${ROUTER_PATH.USERS}/${record.user_id}`;
    default:
      return null;
  }
};

export const getUrlOfAccountList = (
  val: AccountHeaderValue,
  record: AccountListItemType
) => {
  switch (val) {
    case "고객명":
      return `${ROUTER_PATH.USERS}/${record.user_id}`;
    case "계좌번호":
      return `${ROUTER_PATH.ACCOUNTS}/${record.key}`;
    default:
      return null;
  }
};

export const getAccountDataTextByKey = (key: AccountHeaderKey) => {
  try {
    return ACCOUNT_HEADER[key];
  } catch (e: unknown) {
    throw new Error("unavailable key for account text");
  }
};

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
