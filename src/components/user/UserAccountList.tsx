import { Table } from "antd";

import { useAccounts, usePageOption } from "../../hooks";
import { Account } from "../../types";
import { getColumns } from "../../utils";

interface UserAccountListProps {
  id: string;
}

const columns = getColumns<Account>("ACCOUNTS");

export function UserAccountList({ id }: UserAccountListProps) {
  const { pageOption, setPageOption } = usePageOption();
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
