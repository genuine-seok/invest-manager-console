/* eslint-disable no-empty-pattern */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Table } from "antd";
import Search from "antd/lib/input/Search";
import React, { ReactElement, useState } from "react";

import { PageLayout, Private } from "../../src/components/common";
import { useAccounts } from "../../src/hooks";
import { AccountListItemType } from "../../src/types";
import { getColumns } from "../../src/utils";
import { NextPageWithLayout } from "../_app";

const columns = getColumns<AccountListItemType>("ACCOUNTS");

export default function Accounts({}: NextPageWithLayout) {
  // TODO: pageOption 관련 공통 로직 리팩토링
  const [pageOption, setPageOption] = useState({
    q: "",
    _page: 1,
    _limit: 10,
  });
  const {
    total,
    data,
    isLoading,
    isFetching,
    // isError,
  } = useAccounts(pageOption);

  const onSearch = (
    q: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
      | undefined
  ) => {
    setPageOption({ ...pageOption, q });
  };

  return (
    <>
      <Form>
        <Form.Item label="검색" name="search-accounts">
          <Search
            allowClear
            enterButton
            loading={isLoading || isFetching}
            onSearch={onSearch}
            style={{ width: "24rem" }}
          />
        </Form.Item>
      </Form>
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
    </>
  );
}

Accounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <Private>
      <PageLayout title="계좌 목록">{page}</PageLayout>
    </Private>
  );
};
