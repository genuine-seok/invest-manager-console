import { Descriptions } from "antd";

import { UserDetailKey, UserResponseDTO } from "../../types";
import {
  getFormattedUserDetail,
  getUserDetailTextByKey,
  isUsedForUserDetail,
} from "../../utils";

interface UserDetailProps {
  data: UserResponseDTO;
}

export function UserDetail({ data }: UserDetailProps) {
  const items = Object.entries(data).filter((val) => {
    const key = val[0] as keyof UserResponseDTO;
    return isUsedForUserDetail(key);
  });

  return (
    <Descriptions
      title="사용자 상세정보"
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      size="small"
    >
      {items.map(([key, value]) => {
        const label = getUserDetailTextByKey(key as UserDetailKey);
        const formattedValue = getFormattedUserDetail(
          key as UserDetailKey,
          value as string
        );
        return (
          <Descriptions.Item key={key} label={label}>
            {formattedValue}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
}
