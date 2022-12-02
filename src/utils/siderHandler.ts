import MenuItem from "antd/lib/menu/MenuItem";

import { MENU_ICONS, sider } from "../constant";
import { MenuKeywords } from "../types";

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
) => {
  return { key, icon, children, label, type };
};

const getIconByKeyword = (keyword: MenuKeywords) => {
  return MENU_ICONS[keyword];
};

export const getMenuItems = () => {
  return sider.map(({ id, name, keyword }) =>
    getItem(name, `${id}`, getIconByKeyword(keyword))
  );
};
