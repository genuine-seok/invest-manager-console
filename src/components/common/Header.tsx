import { Col, Layout, Row, Space, Typography } from "antd";
import { ReactNode } from "react";

import { UserNav } from "./UserNav";

const { Text } = Typography;

const { Header: HeaderOrigin } = Layout;

interface HeaderProps {
  children: ReactNode;
  title: string;
}

export function Header({ children, title }: HeaderProps) {
  return (
    <HeaderOrigin style={{ background: "white" }}>
      <Row align="middle">
        <Col span={6}>
          <Space align="center">
            {children}
            <Text>{title}</Text>
          </Space>
        </Col>
        <Col span={18} style={{ display: "flex", justifyContent: "flex-end" }}>
          <UserNav />
        </Col>
      </Row>
    </HeaderOrigin>
  );
}
