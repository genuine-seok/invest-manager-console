export const ACCOUNT_KEY = {
  USER_NAME: "user_name",
  BROKER_NAME: "broker_name",
  NUMBER: "number",
  STATUS: "status",
  NAME: "name",
  ASSETS: "assets",
  PAYMENTS: "payments",
  IS_ACTIVE: "is_active",
  CREATED_AT: "created_at",
} as const;

export const ACCOUNT_HEADER = {
  broker_name: "증권사",
  user_name: "고객명",
  user_id: "고객 아이디",
  number: "계좌번호",
  status: "계좌상태",
  name: "계좌명",
  assets: "평가금액",
  payments: "입금금액",
  is_active: "계좌활성화 여부",
  created_at: "계좌개설일",
} as const;

export const ACCOUNT_STATUS = {
  관리자확인필요: 9999,
  입금대기: 1,
  운용중: 2,
  투자중지: 3,
  해지: 4,
} as const;

export const BROKER_FORMAT = {
  "209": "00-00000000-00",
  "218": "00-0000000-000",
  "230": "00-000000-0000",
  "238": "00-000-0000-000",
  "240": "00-0000-000000",
  "243": "00-000000000-0",
  "247": "00-0000-000000",
  "261": "00-00-00000000",
  "262": "00-0000000-000",
  "263": "00-0000-000000",
  "264": "00-0000-00-0000",
  "265": "00-000-000-0000",
  "266": "00-00000-00000",
  "267": "00-000-0000000",
  "268": "00-000000-00-00",
  "269": "00-00000-00000",
  "270": "00-000-0000000",
  "279": "00-00000-00000",
  "280": "00-0000-000000",
  "288": "00-00000000-00",
  "287": "00-0000-00000-0",
  "290": "00-000000-0000",
  "291": "00-0000-000000",
  "292": "00-00000-00000",
  "271": "00-000-0000000",
};

export const BROKERS = {
  "209": "유안타증권",
  "218": "현대증권",
  "230": "미래에셋증권",
  "238": "대우증권",
  "240": "삼성증권",
  "243": "한국투자증권",
  "247": "우리투자증권",
  "261": "교보증권",
  "262": "하이투자증권",
  "263": "HMC투자증권",
  "264": "키움증권",
  "265": "이베스트투자증권",
  "266": "SK증권",
  "267": "대신증권",
  "268": "아이엠투자증권",
  "269": "한화투자증권",
  "270": "하나대투자증권",
  "279": "동부증권",
  "280": "유진투자증권",
  "288": "카카오페이증권",
  "287": "메리츠종합금융증권",
  "290": "부국증권",
  "291": "신영증권",
  "292": "LIG투자증권",
  "271": "토스증권",
};
