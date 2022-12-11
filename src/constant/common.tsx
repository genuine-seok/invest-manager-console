import {
  DashboardOutlined,
  LogoutOutlined,
  StockOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const MENU = {
  DASHBOARD: "DASHBOARD",
  ACCOUNTS: "ACCOUNTS",
  USERS: "USERS",
  LOGOUT: "LOGOUT",
} as const;

export const ROUTER_PATH = {
  ACCOUNTS: "/accounts",
  USERS: "/users",
};

export const SIDER = [
  { id: 1, name: "대시보드", keyword: "dashboard" },
  { id: 2, name: "계좌 목록", keyword: "accounts" },
  { id: 3, name: "사용자 목록", keyword: "users" },
  { id: 9999, name: "로그아웃", keyword: "logout" },
] as const;

export const MENU_ICONS = {
  dashboard: <DashboardOutlined />,
  accounts: <StockOutlined />,
  users: <UserOutlined />,
  logout: <LogoutOutlined />,
};

export const GENDER_ORIGIN = {
  "1": "남성",
  "2": "여성",
  "3": "양성",
  "4": "기타",
} as const;
