import { useRouter } from "next/router";
import { ReactElement } from "react";

import { AccountDetail } from "../../src/components";
import { PageLayout, Private } from "../../src/components/common";
import { useAccounts } from "../../src/hooks";

export default function Account() {
  const router = useRouter();
  const id = router.query.id as string;
  const { isLoading, isFetching, data } = useAccounts({
    id,
  });

  if (isLoading || isFetching) return <div>Loading</div>;
  if (data) {
    const accountDetail = data[0];
    return <AccountDetail data={accountDetail} />;
  }
}

Account.getLayout = function getLayout(page: ReactElement) {
  return (
    <Private>
      <PageLayout title="계좌 정보" hasGoBack>
        {page}
      </PageLayout>
    </Private>
  );
};
