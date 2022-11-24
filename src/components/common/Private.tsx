import {
  DashboardOutlined,
  LogoutOutlined,
  StockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Image, Layout, Menu, MenuProps } from "antd";
import { useRouter } from "next/router";
import { MenuInfo } from "rc-menu/lib/interface";
import React, { ReactNode, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
import { routes } from "../../routes";
import { getMenuByKey } from "../../utils";

const { Content, Sider } = Layout;

interface PrivateProps {
  children: ReactNode;
}

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
) => {
  return { key, icon, children, label, type };
};

const items: MenuItem[] = [
  getItem("대시보드", "1", <DashboardOutlined />),
  getItem("계좌 목록", "2", <StockOutlined />),
  getItem("사용자", "3", <UserOutlined />),
  getItem("로그아웃", "4", <LogoutOutlined />),
];

export function Private({ children }: PrivateProps) {
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
