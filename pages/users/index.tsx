import { Table } from "antd";
import { ReactElement, useState } from "react";

import { PageLayout, Private } from "../../src/components/common";
import { useUsers } from "../../src/hooks/useUsers";
import { NextPageWithLayout } from "../_app";

// TODO: Context로 제공하도록 리팩토링 ?
// TODO: queryClient config 설정 적용하기

const userHeader = {
  name: "고객명",
  email: "이메일 주소",
  account_count: "보유중인 계좌수",
  gender_origin: "성별코드",
  birth_date: "생년월일",
  phone_number: "휴대폰 번호",
  last_login: "최근로그인",
  allow_marketing_push: "혜택 수신 동의 여부",
  is_active: "활성화 여부",
  created_at: "가입일",
};

const columns = Object.entries(userHeader).map(([key, val]) => {
  return {
    title: `${val}`,
    dataIndex: `${key}`,
    key: `${key}`,
    width: "400",
    textWrap: "word-break",
  };
});

// eslint-disable-next-line no-empty-pattern
export default function Users({}: NextPageWithLayout) {
  const [pageOption, setPageOption] = useState({
    q: "",
    _page: 1,
    _limit: 20,
  });

  const { total, userList, isLoading, isFetching } = useUsers(pageOption);

  return (
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
  );
}

Users.getLayout = function getLayout(page: ReactElement) {
  return (
    <Private>
      <PageLayout title="사용자 목록">{page}</PageLayout>
    </Private>
  );
};
