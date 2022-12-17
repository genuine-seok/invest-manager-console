import {
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Space, Tooltip } from "antd";

export function UserNav() {
  return (
    <Space wrap size="middle">
      <Tooltip title="도움말">
        <Button
          shape="circle"
          icon={<QuestionCircleOutlined style={{ fontSize: "1.2rem" }} />}
        />
      </Tooltip>
      <Tooltip title="알림">
        <Badge count={99} overflowCount={100} size="small">
          <Button
            shape="circle"
            icon={<BellOutlined style={{ fontSize: "1.2rem" }} />}
          />
        </Badge>
      </Tooltip>
      <Tooltip title="마이페이지">
        <Button
          shape="circle"
          icon={<UserOutlined style={{ fontSize: "1.2rem" }} />}
        />
      </Tooltip>
    </Space>
  );
}
