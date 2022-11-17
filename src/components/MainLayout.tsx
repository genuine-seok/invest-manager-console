import {
  DashboardOutlined,
  LogoutOutlined,
  StockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Image, Layout, Menu, MenuProps } from "antd";
import Link from "next/link";
import React, { ReactNode, useState } from "react";

const { Header, Content, Sider } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

const Menus = ["대시보드", "계좌 목록", "사용자", "로그아웃"];
const Icons = [DashboardOutlined, StockOutlined, UserOutlined, LogoutOutlined];
const Routes = ["/", "/accounts", "/users", "/login"];
const MenuItems = Icons.map((icon, i) => {
  return (
    <Link href={`${Routes[i]}`} key={Menus[i]}>
      {React.createElement(icon)}
    </Link>
  );
});

const items = Menus.map((label, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    label,
    icon: MenuItems[index],
  };
});

export default function MainLayout({ children }: MainLayoutProps) {
  // const [collapsed, setCollapsed] = useState(false);

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
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          items={items}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>{children}</Layout>
    </Layout>
  );
}
