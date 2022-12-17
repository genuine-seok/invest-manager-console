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

  // TODO: 유효한 토큰 체크 및 토큰 만료 정책
  // Local Storage 만료 정책 및 쿠키 vs Local Storage 비교 글 참조
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
