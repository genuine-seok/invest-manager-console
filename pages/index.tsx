import { Empty } from "antd";
import { ReactElement } from "react";

import { PageLayout, Private } from "../src/components/common";
import { NextPageWithLayout } from "./_app";

// eslint-disable-next-line no-empty-pattern
export default function Home({}: NextPageWithLayout) {
  return (
    <Empty description={<span>대시보드 기능은 제공하지 않습니다.</span>} />
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Private>
      <PageLayout title="대시보드">{page}</PageLayout>
    </Private>
  );
};
