import { Table } from "antd";
import { ReactElement, useState } from "react";

import { PageLayout, Private } from "../../src/components/common";
import { useAccounts } from "../../src/hooks";
import { NextPageWithLayout } from "../_app";

const accountHeader = {
  broker_name: "증권사",
  user_name: "고객명", // TODO: user_id 변환
  number: "계좌번호",
  status: "계좌상태",
  name: "계좌명",
  assets: "평가금액",
  payments: "입금금액",
  is_active: "계좌활성화 여부",
  created_at: "계좌개설일",
};

// TODO: 고객명, 계좌 상세 정보 버튼 링크 버튼 제공
const columns = Object.entries(accountHeader).map(([key, val]) => {
  return {
    title: `${val}`,
    dataIndex: `${key}`,
    key: `${key}`,
    width: "400",
    // TODO: 고객명, 계좌번호에 상세정보 링크 추가 (text) => applyLinkForCol
    render: (text: string) =>
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      val === "고객명" || val === "계좌번호" ? <a>{text}</a> : text,
  };
});

// eslint-disable-next-line no-empty-pattern
export default function Accounts({}: NextPageWithLayout) {
  const [pageOption, setPageOption] = useState({
    q: "",
    _page: 1,
    _limit: 20,
  });
  const {
    total,
    data: accounts,
    isLoading,
    isFetching,
    isError,
  } = useAccounts(pageOption);

  return (
    <Table
      loading={isLoading || isFetching}
      bordered
      size="small"
      scroll={{ x: 1600 }}
      dataSource={accounts}
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

Accounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <Private>
      <PageLayout title="계좌 목록">{page}</PageLayout>
    </Private>
  );
};
