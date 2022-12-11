/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Table } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType } from "antd/lib/table";
import Link from "next/link";
import React, { ReactElement, useState } from "react";

import { PageLayout, Private } from "../../src/components/common";
import { ACCOUNTS_HEADERS } from "../../src/constant";
import { useAccounts } from "../../src/hooks";
import { AccountHeaderValue, AccountListItemType } from "../../src/types";
import {
  getAccountsFiltersByKey,
  getAccountsOnFilterByKey,
  getUrlOfAccountList,
} from "../../src/utils";
import { NextPageWithLayout } from "../_app";

// TODO: 고객명, 계좌 상세 정보 버튼 링크 버튼 제공
// TODO: columns 생성 로직 페이지에서 분리하기 or 커스텀 훅으로 생성하기
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
      const url = getUrlOfAccountList(val as AccountHeaderValue, record);
      if (url) return <Link href={url}>{text}</Link>;
      return text;
    },
  };
});

// eslint-disable-next-line no-empty-pattern
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
