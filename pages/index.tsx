import { ReactElement } from "react";

import { MainLayout, PageLayout } from "../src/components";
import { NextPageWithLayout } from "./_app";

// eslint-disable-next-line no-empty-pattern
export default function Home({}: NextPageWithLayout) {
  return <h1>대시보드</h1>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <PageLayout title="대시보드">{page}</PageLayout>
    </MainLayout>
  );
};
