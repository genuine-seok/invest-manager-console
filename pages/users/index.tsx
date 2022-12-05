import { Form, Table } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType } from "antd/lib/table";
import React, { ReactElement, useEffect, useState } from "react";

import { PageLayout, Private } from "../../src/components/common";
import { USERS_HEADERS } from "../../src/constant/users";
import { useUsers } from "../../src/hooks/useUsers";
import { UserListItemType } from "../../src/types";
import { getUsersFiltersByKey, getUsersOnFilterByKey } from "../../src/utils";
import { NextPageWithLayout } from "../_app";

// TODO: Context로 제공하도록 리팩토링 ?
// TODO: queryClient config 설정 적용하기
// TODO: columns 생성 로직 페이지에서 분리하기 or 커스텀 훅으로 생성하기
const columns: ColumnsType<UserListItemType> = Object.entries(
  USERS_HEADERS
).map(
  // TODO: key, val 타입 정의
  ([key, val]) => {
    const filters = getUsersFiltersByKey(key);
    const onFilter = getUsersOnFilterByKey(key);

    if (filters && onFilter)
      return {
        title: `${val}`,
        dataIndex: `${key}`,
        key: `${key}`,
        width: "400",
        textWrap: "word-break",
        filters,
        onFilter,
      };

    return {
      title: `${val}`,
      dataIndex: `${key}`,
      key: `${key}`,
      width: "400",
      textWrap: "word-break",
    };
  }
);

// eslint-disable-next-line no-empty-pattern
export default function Users({}: NextPageWithLayout) {
  const [pageOption, setPageOption] = useState({
    q: "",
    _page: 1,
    _limit: 20,
  });

  const { total, userList, isLoading, isFetching } = useUsers(pageOption);

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

  useEffect(() => {
    console.log("rerendered");
  }, [total]);

  return (
    <>
      <Form>
        <Form.Item label="검색" name="search-users">
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
        dataSource={userList}
        columns={columns}
        pagination={{
          defaultPageSize: 20,
          total,
          showTotal: (total) => `Total ${total} items`,
          onChange: (page, pageSize) => {
            setPageOption({
              ...pageOption,
              _page: page,
              _limit: pageSize,
            });
          },
        }}
      />
    </>
  );
}

Users.getLayout = function getLayout(page: ReactElement) {
  return (
    <Private>
      <PageLayout title="사용자 목록">{page}</PageLayout>
    </Private>
  );
};
