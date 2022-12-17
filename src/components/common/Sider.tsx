import { Image, Layout, Menu } from "antd";
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
        defaultSelectedKeys={["1"]} // TODO: UI 상태에 따라 동적으로 할당
        // defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items}
        onClick={handleClick}
      />
    </SiderOrigin>
  );
}
