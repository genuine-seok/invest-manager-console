import { Button, Result } from "antd";
import { useRouter } from "next/router";

import { routes } from "../src/routes";

export default function Custom404() {
  const router = useRouter();

  return (
    <Result
      status="404"
      title="404"
      subTitle="죄송합니다. 요청하신 페이지는 존재하지 않습니다."
      extra={
        <Button type="primary" onClick={() => router.push(routes.DASHBOARD)}>
          돌아가기
        </Button>
      }
    />
  );
}
