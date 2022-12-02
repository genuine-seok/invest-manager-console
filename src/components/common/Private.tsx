import { Image, Layout, Menu } from "antd";
import { useRouter } from "next/router";
import { MenuInfo } from "rc-menu/lib/interface";
import React, { ReactNode, useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { routes } from "../../routes";
import { getMenuByKey } from "../../utils";
import { getMenuItems } from "../../utils/siderHandler";

const { Content, Sider } = Layout;

interface PrivateProps {
  children: ReactNode;
}

const items = getMenuItems();

export function Private({ children }: PrivateProps) {
  // TODO: 메뉴바 collapse에 따른 레이아웃 동적 확장 기능 추가
  // const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { logout, getToken } = useAuth();

  const redirectToPublic = () => router.push(routes.LOGOUT);

  const handleClick = ({ key }: MenuInfo) => {
    const menu = getMenuByKey(key);
    if (menu === "LOGOUT") {
      logout();
    }
    router.push(routes[menu]);
  };

  // TODO: 유효한 토큰 체크 및 토큰 만료 정책
  // Local Storage 만료 정책 및 쿠키 vs Local Storage 비교 글 참조
  useEffect(() => {
    const isLoggedIn = !!getToken();
    if (!isLoggedIn) redirectToPublic();
  });

  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={200}
        // collapsible
        // collapsed={collapsed}
        // onCollapse={(value) => setCollapsed(value)}
      >
        <Content style={{ padding: "20px" }}>
          <Image width="100%" src="/images/img_logo_preface.png" />
        </Content>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          items={items}
          onClick={handleClick}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>{children}</Layout>
    </Layout>
  );
}
