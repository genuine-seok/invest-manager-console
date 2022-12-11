/* eslint-disable consistent-return */
import MenuItem from "antd/lib/menu/MenuItem";

import { MENU_ICONS, SIDER } from "../constant";
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

export const getMenuByKey = (key: string) => {
  switch (key) {
    case "1":
      return "DASHBOARD";
    case "2":
      return "ACCOUNTS";
    case "3":
      return "USERS";
    case "9999":
      return "LOGOUT";
    default:
      throw new Error("유효하지 않은 메뉴 버튼입니다.");
  }
};

const getMenuIconByKeyword = (keyword: MenuKeywords) => {
  return MENU_ICONS[keyword];
};

export const getMenuItems = () => {
  return SIDER.map(({ id, name, keyword }) =>
    getItem(name, `${id}`, getMenuIconByKeyword(keyword))
  );
};
