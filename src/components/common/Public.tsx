import { Col, Layout, Row } from "antd";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import { routes } from "../../routes";

interface PublicProps {
  children: ReactNode;
}

export function Public({ children }: PublicProps) {
  const router = useRouter();
  const { getToken } = useAuth();

  const redirectToPrivate = () => router.push(routes.DASHBOARD);

  useEffect(() => {
    const isLoggedIn = !!getToken();
    if (isLoggedIn) redirectToPrivate();
  });

  return (
    <Layout>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col
          span={6}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          {children}
        </Col>
      </Row>
    </Layout>
  );
}
