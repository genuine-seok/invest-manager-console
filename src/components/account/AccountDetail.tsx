/* eslint-disable camelcase */
import { Descriptions } from "antd";

import { Account, AccountHeaderKey } from "../../types";
import { getAccountDataTextByKey } from "../../utils";

interface AccountDetailProps {
  data: Account;
}

export function AccountDetail({ data }: AccountDetailProps) {
  const items = Object.entries(data).filter(([key, _value]) => key !== "key");

  return (
    <Descriptions
      title="계좌 상세정보"
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      size="small"
    >
      {items.map(([key, value]) => {
        const label = getAccountDataTextByKey(key as AccountHeaderKey);
        return (
          <Descriptions.Item key={key} label={label}>
            {value}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
}
