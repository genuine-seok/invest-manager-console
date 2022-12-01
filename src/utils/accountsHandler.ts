/* eslint-disable camelcase */
import { brokerFormat, brokers } from "../constant";
import { AccountsData, AccountStatusCode, Brokers } from "../types";
import { getFormattedDate, getIsActiveText } from ".";

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
  const broker = brokers[id];
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

const getFormattedNumberByBrokerId = (id: keyof Brokers, number: string) => {
  const format = brokerFormat[id];
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

export const getFormattedAccountsData = (data: AccountsData) => {
  const newData = data.map(
    ({
      user_id,
      broker_id,
      number,
      status,
      name,
      assets,
      payments,
      is_active,
      created_at,
    }) => ({
      user_name: user_id,
      broker_name: getBrokerNameById(broker_id),
      number: getFormattedNumberByBrokerId(broker_id, number),
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
