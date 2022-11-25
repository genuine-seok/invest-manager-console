import { Layout } from "antd";
import { ReactNode } from "react";

const { Header, Content } = Layout;

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <>
      <Header style={{ background: "white" }}>{title}</Header>
      <Content
        style={{
          background: "white",
          margin: "24px 16px 0",
          overflow: "auto",
          padding: 12,
          minHeight: "100vh",
        }}
      >
        {children}
      </Content>
    </>
  );
}
