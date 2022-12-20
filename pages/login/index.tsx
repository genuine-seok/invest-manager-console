import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Layout, Row } from "antd";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Public } from "../../src/components/common/Public";
import { useAuth } from "../../src/context/AuthContext";
import { SignInRequestDTO } from "../../src/types";
import { NextPageWithLayout } from "../_app";

const { Content } = Layout;

// eslint-disable-next-line no-empty-pattern
export default function Login({}: NextPageWithLayout) {
  const router = useRouter();
  const { signIn } = useAuth();
  const goHome = () => router.push("/");

  const onFinish = async (data: SignInRequestDTO) => {
    const res = await signIn(data);
    if (res.result === "success") {
      goHome();
    } else {
      console.log(res.reason);
    }
  };

  return (
    <>
      <h1>로그인</h1>
      <Content
        style={{
          background: "white",
          minWidth: "360px",
          padding: "18px",
          borderRadius: "4px",
        }}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "아이디를 입력하세요" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="아이디를 입력하세요"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력하세요" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="비밀번호를 입력하세요"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Public>{page}</Public>;
};
