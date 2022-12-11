export const USER_HEADER = {
  name: "고객명",
  email: "이메일 주소",
  account_count: "보유중인 계좌수",
  gender_origin: "성별코드",
  birth_date: "생년월일",
  phone_number: "휴대폰 번호",
  last_login: "최근로그인",
  allow_marketing_push: "혜택 수신 동의 여부",
  is_active: "활성화 여부",
  create_at: "가입일",
} as const;

export const USER_DETAIL = {
  name: "이름",
  age: "나이",
  gender_origin: "성별", //
  birth_date: "생년월일",
  address: "주소", //
  detail_address: "상세 주소",
  email: "이메일",
  phone_number: "핸드폰",
  allow_marketing_push: "혜택 정보 수신",
  created_at: "가입 시각",
} as const;
