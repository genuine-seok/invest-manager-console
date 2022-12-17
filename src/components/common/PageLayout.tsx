import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { Header } from "./Header";

const { Content } = Layout;

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  hasGoBack?: boolean;
}

export function PageLayout({
  children,
  title,
  hasGoBack = false,
}: PageLayoutProps) {
  const router = useRouter();

  return (
    <>
      <Header title={title}>
        {hasGoBack && (
          <Button
            onClick={() => {
              router.back();
            }}
            size="small"
            icon={<ArrowLeftOutlined />}
          />
        )}
      </Header>
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
