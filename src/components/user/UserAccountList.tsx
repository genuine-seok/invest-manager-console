import { Descriptions, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import Link from "next/link";
import { useState } from "react";

import { ACCOUNTS_HEADERS } from "../../constant";
import { useAccounts } from "../../hooks";
import { AccountHeaderValue, AccountListItemType } from "../../types";
import {
  getAccountsFiltersByKey,
  getAccountsOnFilterByKey,
  getUrlOfAccountList,
} from "../../utils";

interface UserAccountListProps {
  id: string;
}

export function UserAccountList({ id }: UserAccountListProps) {
  // TODO: 해당 유저의 계좌 목록 불러오기
  // /accounts?user_id=1338
  const columns: ColumnsType<AccountListItemType> = Object.entries(
    ACCOUNTS_HEADERS
  ).map(([key, val]) => {
    const filters = getAccountsFiltersByKey(key);
    const onFilter = getAccountsOnFilterByKey(key);

    if (filters && onFilter)
      return {
        title: `${val}`,
        dataIndex: `${key}`,
        key: `${key}`,
        width: "400",
        filters,
        onFilter,
      };

    return {
      title: `${val}`,
      dataIndex: `${key}`,
      key: `${key}`,
      width: "400",
      render: (text: string, record: AccountListItemType) => {
        const url = getUrlOfAccountList(
          val as AccountHeaderValue,
          // record.key
          record
        );
        if (url) return <Link href={url}>{text}</Link>;
        return text;
      },
    };
  });

  const [pageOption, setPageOption] = useState({
    q: "",
    _page: 1,
    _limit: 10,
  });
  const { total, data, isLoading, isFetching, isError } = useAccounts({
    user_id: id,
  });

  return (
    <Table
      loading={isLoading || isFetching}
      bordered
      size="small"
      scroll={{ x: 1600 }}
      dataSource={data}
      columns={columns}
      pagination={{
        defaultPageSize: 10,
        total,
        showTotal: (total) => `Total ${total} items`,
        onChange: (page, pageSize) => {
          setPageOption({ ...pageOption, _page: page, _limit: pageSize });
        },
      }}
    />
  );
}
