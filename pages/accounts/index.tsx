/* eslint-disable no-empty-pattern */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Table } from "antd";
import Search from "antd/lib/input/Search";
import React, { ReactElement } from "react";

import { PageLayout, Private } from "../../src/components/common";
import { useAccounts, usePageOption } from "../../src/hooks";
import { Account } from "../../src/types";
import { getColumns } from "../../src/utils";
import { NextPageWithLayout } from "../_app";

const columns = getColumns<Account>("ACCOUNTS");

export default function Accounts({}: NextPageWithLayout) {
  const { pageOption, setPageOption } = usePageOption();
  const { total, data, isLoading, isFetching } = useAccounts(pageOption);

  const onSearch = (
    q: string,
    _event?:
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
