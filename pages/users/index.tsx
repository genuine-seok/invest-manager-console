import { Pagination, Table } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { PageLayout, Private } from "../../src/components/common";
import { useUsers } from "../../src/hooks/useUsers";
import { NextPageWithLayout } from "../_app";

// TODO: Context로 제공하도록 리팩토링 ?
// TODO: Provider에서 전역으로 queryClient 제공하기
const queryClient = new QueryClient();

const userHeader = {
  name: "고객명",
  email: "이메일 주소",
  age: "테스트",
  gender_origin: "성별코드",
  birth_date: "생년월일",
  phone_number: "휴대폰 번호",
  detail_address: "테스트",
  last_login: "최근로그인",
  created_at: "가입일",
  updated_at: "테스트",
  // id: "테스트",
  // uuid: "테스트",
  // photo: "테스트",
  // address: "테스트",
  // TODO: account_count,allow_marketing_push,is_active
};

interface UserType {
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}

const columns = Object.entries(userHeader).map(([key, val]) => {
  return {
    title: `${val}`,
    dataIndex: `${key}`,
    key: `${key}`,
  };
});

// eslint-disable-next-line no-empty-pattern
export default function Users({}: NextPageWithLayout) {
  const [pageOption, setPageOption] = useState({
    q: "",
    _page: 1,
    _limit: 20,
  });
  const [total, setTotal] = useState(0);
  const [getAllUsersResult, getUsersResult] = useUsers(pageOption);
  const { data, isLoading, isFetching } = getAllUsersResult;
  const usersData = getUsersResult.data;

  useEffect(() => {
    if (data) setTotal(data.length);
  }, [total, data]);

  if (isLoading || isFetching) return <div>loading...</div>;

  return (
    <Table
      size="small"
      dataSource={usersData}
      columns={columns}
      pagination={{
        defaultPageSize: 20,
        total,
        showTotal: (total) => `Total ${total} items`,
        onChange: (page, pageSize) => {
          setPageOption({ ...pageOption, _page: page, _limit: pageSize });
        },
      }}
    />
  );
}

Users.getLayout = function getLayout(page: ReactElement) {
  return (
    <Private>
      <PageLayout title="사용자 목록">
        <QueryClientProvider client={queryClient}>{page}</QueryClientProvider>
      </PageLayout>
    </Private>
  );
};
