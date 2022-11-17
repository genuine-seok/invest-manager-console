import { Button, Col, Form, Image, Input, Layout, Row } from "antd";
import { useRouter } from "next/router";

const { Content } = Layout;

export default function Login() {
  const router = useRouter();

  const goHome = () => router.push("/");

  return (
    <Layout
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col
          span={6}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "48px",
          }}
        >
          <Image width="120px" src="/images/img_logo_preface.png" />
          <Content
            style={{
              background: "white",
              minWidth: "360px",
              padding: "18px",
              borderRadius: "4px",
            }}
          >
            <Form onFinish={goHome}>
              {/* <h1>로그인</h1> */}
              <Form.Item
                name="username"
                rules={[{ required: true, message: "아이디를 입력하세요" }]}
              >
                <Input placeholder="아이디를 입력하세요" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "비밀번호를 입력하세요" }]}
              >
                <Input.Password placeholder="비밀번호를 입력하세요" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  로그인
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Col>
      </Row>
    </Layout>
  );
}
