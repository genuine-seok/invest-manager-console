import { Table } from "antd";
import { ReactElement } from "react";

import MainLayout from "../../components/MainLayout";
import { PageLayout } from "../../components/PageLayout";
import { NextPageWithLayout } from "../_app";

const accountHeader = {
  id: "id",
  user_name: "사용자 이름",
  broker_name: "증권사",
  number: "계좌번호",
  status: "계좌상태",
  name: "계좌명",
  assets: "평가금액",
  payments: "입금금액",
  is_active: "계좌활성화 여부",
  created_at: "계좌개설일",
};

interface AccountType {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: string;
  status: number;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const accounts: Array<AccountType> = [
  {
    id: 1,
    user_id: 1,
    uuid: "8b19490c-9be5-4534-9ca9-b4523f938b70",
    broker_id: "218",
    status: 2,
    number: "617625165198",
    name: "Savings Account",
    assets: "416135951.35",
    payments: "564376171.18",
    is_active: true,
    created_at: "2021-12-24T03:59:11.031Z",
    updated_at: "2021-03-03T18:00:24.356Z",
  },
  {
    id: 2,
    user_id: 1,
    uuid: "5e76ecfe-8786-4888-a6b5-08e22a9d0c48",
    broker_id: "268",
    status: 2,
    number: "211321674777",
    name: "Credit Card Account",
    assets: "89943239.27",
    payments: "997845471.40",
    is_active: true,
    created_at: "2021-06-17T03:50:02.363Z",
    updated_at: "2021-02-26T10:43:21.104Z",
  },
];

const dataSource = accounts.map((account) => {
  return {
    key: account.uuid,
    user_name: account.user_id, // TODO: 이름으로
    broker_name: account.broker_id, // TODO: 이름으로
    number: account.number, // TODO: 마스킹 처리
    status: account.status,
    name: account.name,
    assets: account.assets,
    payments: account.payments,
    is_active: account.is_active,
    created_at: account.created_at,
  };
});

const columns = Object.entries(accountHeader).map(([key, val]) => {
  return {
    title: `${val}`,
    dataIndex: `${key}`,
    key: `${key}`,
  };
});

// eslint-disable-next-line no-empty-pattern
export default function Accounts({}: NextPageWithLayout) {
  return <Table dataSource={dataSource} columns={columns} />;
}

Accounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <PageLayout title="계좌 목록">{page}</PageLayout>
    </MainLayout>
  );
};
