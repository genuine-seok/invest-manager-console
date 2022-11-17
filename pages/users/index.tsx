import { Table } from "antd";
import { ReactElement } from "react";

import MainLayout from "../../components/MainLayout";
import { PageLayout } from "../../components/PageLayout";
import { NextPageWithLayout } from "../_app";

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

const users: Array<UserType> = [
  {
    id: 1,
    uuid: "7add2f47-a324-4e01-bc8c-578020526d42",
    photo:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1190.jpg",
    name: "Rosemary 노",
    email: "26@gmail.com",
    age: 20,
    gender_origin: 1,
    birth_date: "1994-08-23T17:39:48.637Z",
    phone_number: "010-3694-3616",
    address: "Somalia 속초군",
    detail_address: "533 행신면 Apt. 560",
    last_login: "2022-05-15T03:56:06.545Z",
    created_at: "2019-10-30T18:10:58.453Z",
    updated_at: "2019-04-03T02:46:10.995Z",
  },
  {
    id: 2,
    uuid: "1a8522d8-be18-486f-ae4f-455f2284396a",
    photo:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/880.jpg",
    name: "Vivian 유 II",
    email: "_15@naver.com",
    age: 27,
    gender_origin: 4,
    birth_date: "1964-12-13T06:33:13.638Z",
    phone_number: "010-2478-2084",
    address: "Bolivia 광주구",
    detail_address: "3790 신정면 Suite 356",
    last_login: "2022-03-24T22:52:18.906Z",
    created_at: "2019-05-02T19:05:31.027Z",
    updated_at: "2019-06-07T13:55:23.264Z",
  },
  {
    id: 3,
    uuid: "7bc0da4c-4a08-4d65-b4fd-45f6f774e565",
    photo:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/839.jpg",
    name: "Mr. Charlene 엄",
    email: ".@gmail.com",
    age: 20,
    gender_origin: 4,
    birth_date: "1969-03-12T23:09:46.081Z",
    phone_number: "010-3431-9396",
    address: "Pitcairn Islands 안양군",
    detail_address: "7417 주안읍 Suite 920",
    last_login: "2022-07-14T20:44:59.416Z",
    created_at: "2022-01-10T09:16:06.273Z",
    updated_at: "2019-06-07T05:34:29.479Z",
  },
  {
    id: 4,
    uuid: "eb07bc1a-da47-4e2e-8694-95864b0cce17",
    photo:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1102.jpg",
    name: "Dwayne 문",
    email: ".@hanmail.net",
    age: 51,
    gender_origin: 4,
    birth_date: "1963-06-18T16:38:19.522Z",
    phone_number: "010-2659-4311",
    address: "Sao Tome and Principe 광주구",
    detail_address: "86716 연무면 Apt. 035",
    last_login: "2022-05-18T09:47:50.695Z",
    created_at: "2021-01-23T20:44:32.715Z",
    updated_at: "2019-08-15T16:29:27.513Z",
  },
];

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const dataSource2 = users.map((user) => {
  return {
    key: user.uuid,
    name: user.name,
    email: user.email,
    age: user.age,
    gender_origin: user.gender_origin,
    birth_date: user.birth_date,
    phone_number: user.phone_number,
    detail_address: user.detail_address,
    last_login: user.last_login,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
});

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const columns2 = Object.entries(userHeader).map(([key, val]) => {
  return {
    title: `${val}`,
    dataIndex: `${key}`,
    key: `${key}`,
  };
});

// eslint-disable-next-line no-empty-pattern
export default function Users({}: NextPageWithLayout) {
  return <Table dataSource={dataSource2} columns={columns2} />;
}

Users.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <PageLayout title="사용자 목록">{page}</PageLayout>
    </MainLayout>
  );
};
