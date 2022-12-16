import { Form, Table } from "antd";
import Search from "antd/lib/input/Search";
import React, { ReactElement, useState } from "react";

import { PageLayout, Private } from "../../src/components/common";
import { useUsers } from "../../src/hooks/useUsers";
import { User } from "../../src/types";
import { getColumns } from "../../src/utils";
import { NextPageWithLayout } from "../_app";

const columns = getColumns<User>("USERS");

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
          defaultPageSize: 10,
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
