import { MenuType } from "../types";

export const MenuText: Record<MenuType, string> = {
  DASHBOARD: "대시보드",
  ACCOUNTS: "계좌 목록",
  USERS: "사용자",
  LOGOUT: "로그아웃",
};

export const getMenuByKey = (key: string) => {
  switch (key) {
    case "1":
      return "DASHBOARD";
    case "2":
      return "ACCOUNTS";
    case "3":
      return "USERS";
    case "4":
      return "LOGOUT";
    default:
      throw new Error("유효하지 않은 메뉴 버튼입니다.");
  }
};
