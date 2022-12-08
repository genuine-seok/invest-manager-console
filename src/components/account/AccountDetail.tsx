/* eslint-disable camelcase */
import { Descriptions } from "antd";

import { AccountHeaderKey, AccountListItemType } from "../../types";
import { getAccountDataTextByKey } from "../../utils";

export function AccountDetail({ data }: { data: AccountListItemType }) {
  const items = Object.entries(data).filter(([key, _]) => key !== "key");

  return (
    <Descriptions title="계좌 상세정보" bordered>
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
