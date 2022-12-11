import { Divider } from "antd";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { UserAccountList, UserDetail } from "../../src/components";
import { PageLayout, Private } from "../../src/components/common";
import { useUsers } from "../../src/hooks";

export default function User() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isLoading, isFetching } = useUsers({ id });

  // TODO: fallBack UI 구현
  // TODO: 없는 userID로 접근한 경우에 대한 에러 화면
  if (isLoading || isFetching) return <div>Loading</div>;
  if (data) {
    const userDetail = data[0];
    return (
      <>
        <UserDetail data={userDetail} />
        <Divider orientation="left">계좌 목록</Divider>
        <UserAccountList id={id} />
      </>
    );
  }
}

User.getLayout = function getLayout(page: ReactElement) {
  return (
    <Private>
      <PageLayout title="사용자 정보">{page}</PageLayout>
    </Private>
  );
};
