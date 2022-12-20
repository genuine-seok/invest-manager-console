import { Layout } from "antd";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import { routes } from "../../routes";
import { Sider } from "./Sider";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    const isLoggedIn = !!getToken();
    if (!isLoggedIn) router.push(routes.LOGOUT);
  });

  return (
    <Layout>
      <Sider />
      <Layout style={{ marginLeft: 200 }}>{children}</Layout>
    </Layout>
  );
}
