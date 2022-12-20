import { Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuInfo } from "rc-menu/lib/interface";

import { useAuth } from "../../context/AuthContext";
import { routes } from "../../routes";
import { getMenuByKey, getMenuItems } from "../../utils";

const { Content, Sider: SiderOrigin } = Layout;

const items = getMenuItems();

export function Sider() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleClick = ({ key }: MenuInfo) => {
    const menu = getMenuByKey(key);
    if (menu === "LOGOUT") {
      logout();
    }
    router.push(routes[menu]);
  };

  return (
    <SiderOrigin
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      width={200}
    >
      <Link href="/" style={{ height: "100px" }}>
        <Content style={{ padding: ".5rem" }}>
          <Image
            alt="Logo image"
            width={170}
            height={52}
            src="/images/menu_logo.png"
          />
        </Content>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
        onClick={handleClick}
      />
    </SiderOrigin>
  );
}
