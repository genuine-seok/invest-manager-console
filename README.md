# 투자 관리 서비스 - 관리자 콘솔

## 개요

> 투자 관리 서비스의 관리자 기능을 구현한 토이 프로젝트

<img width="1440" alt="img_invest-manager-console_main" src="https://user-images.githubusercontent.com/52701929/209031271-acee8203-5ab5-4935-b44d-9b5d762a5a1e.png">

<br>

## 개발 도구

<img alt="React" src ="https://img.shields.io/badge/React-61DAFB?&style=flat&logo=React&logoColor=white"/> <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-blue?style=flat&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> ![](https://img.shields.io/badge/-React--query-%23FF4154) ![](https://img.shields.io/badge/axios-551a8b?style=flat-square&logo=axios&logoColor=white) ![](https://img.shields.io/badge/-json--server-%237c007c) <img alt="AntDesign" src ="https://img.shields.io/badge/AntDesign-0170FE?&style=flat&logo=AntD&logoColor=white"/>

<br>

## 실행 방법

1. 레포지토리를 클론합니다.

```zsh
# Clone Repo
$ git clone "레포 주소"
```

2. 의존성 패키지를 설치합니다.

```zsh
$ npm install
```

3. 환경 변수 파일을 생성합니다.

```zsh
$ npm run gen-env
```

4. API 서버를 실행합니다.

```zsh
$ npm run server
```

5. 프로젝트를 실행합니다.

```zsh
# 새로운 터미널에서 실행
$ npm run start
```

### 테스트 계정

```json
{
  "email": "admin@gmail.com",
  "password": "admin"
}
```

<br>

## 주요 기능

> TODO: 주요 기능 시연 데모 영상 추가

<br>

## 기능 구현

> 프로젝트의 주요 기능들을 구현한 로직을 코드 블럭 레벨로 서술합니다.

### 1. 공통 로직과 레이아웃

Next.js의 \_app.tsx 을 통해 공통 로직과 레이아웃을 제공하고 있습니다.

<details>
<summary>상세 보기</summary>

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/pages/_app.tsx#L21-L27

- 각 페이지 컴포넌트마다 getLayout 함수를 정의하여 공통 레이아웃을 정의하게 합니다.
  - 해당 프로젝트의 모든 페이지 컴포넌트는 Public 혹은 Private 컴포넌트 중 한 가지를 레이아웃으로 가집니다.

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/src/components/common/Provider.tsx#L11-L38

- Provider 컴포넌트는 전역 상태를 제공하는 공통 컴포넌트입니다
- React-Query의 Query Client Provider 및 커스텀 서비스 Context들을 전역 상태로 제공합니다

</details>

### 2. 로그인, 유저, 계좌, 서비스 추상화 구현체

도메인별 비동기 통신 로직을 추상화하여 전역 상태로 제공하고 있습니다. <br>
각 서비스들은 추상화되어 엔드포인트, 토큰 보관 방식등을 교체하기 수월해집니다.

<details>
<summary>상세 보기</summary>

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/src/api/api.ts#L3-L9

- axios 인스턴스를 정의하고 각 서비스의 인자로 전달해 의존성을 주입하고 있습니다.
  - 엔드포인트 교체 작업을(테스트 모킹 데이터, 백엔드 데이터) 수월하게 합니다.

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/src/api/TokenRepository.ts#L1-L25

- 토큰 보관소를 추상화하여, 각 서비스 인자로 전달해 의존성을 주입하고 있습니다.
  - 쿠키, 웹 스토리지(로컬 스토리지, 세션 스토리지) 등으로 교체하는 작업을 수월하게 합니다.

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/src/api/AuthService.ts#L7-L46

- 예) httpClient와 토큰 저장소 구현체를 인자로 전달받아, 인증/인가 서비스를 구현합니다.
  - 이렇게 구현한 각 서비스들은 Provider 컴포넌트를 통해 전역 상태로 제공됩니다

</details>

### 3. 접근 제한 구현(Access Control)

사용자의 로그인 상태나 권한에 따라 접근할 수 있는 경로를 분리하기 위해 <br>
Public, Private 컴포넌트를 페이지 컴포넌트의 레이아웃으로 제공합니다. <br>
사용자 인증/인가에 대한 로직을 각 페이지 컴포넌트에서 분리하는 효과를 가집니다.

<details>
<summary>상세 보기</summary>

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/src/components/common/Public.tsx#L12-L40

- 로그인 여부를 확인해, Private 페이지로 리다이렉트 로직을 수행합니다.
- 로그인 화면에 대한 공통 레이아웃을 정의합니다.

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/src/components/common/Private.tsx#L13-L28

- 로그인 여부를 확인해, 인가가 유효한 경우 Public 페이지로 리다이렉트 로직을 수행합니다.
- Private 화면에 대한 공통 레이아웃을 정의합니다.

</details>

### 4. React-Query 커스텀 훅

도메인별 서버 상태를 리액트 쿼리 커스텀 훅으로 분리하여 관리합니다. <br>
서버로 전달받은 데이터들에 대해 UI에서 가공해야하는 경우 해당 작업을 훅 내부에서 처리합니다 <br>

<details>
<summary>상세 보기</summary>

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/src/hooks/useUsers.ts#L12-L47

- 예) 페이지네이션, 검색어 등 검색 파라미터를 인자로 전달하면 사용자 관련 서버 데이터를 return 하는 커스텀 훅을 구현합니다.

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/pages/users/index.tsx#L14-L65

- 사용자 도메인 페이지에서 서버 데이터를 활용해 UI를 렌더링합니다.

</details>

### 5. Ant Design UI 라이브러리 활용

Ant Design UI 라이브러리의 컴포넌트들을 활용해 UI 렌더링을 구현했습니다.

<details>
<summary>상세 보기</summary>

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/pages/users/index.tsx#L15-L65

- 예) 사용자 목록을 보여주는 입력 폼, 테이블등의 컴포넌트

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/src/components/common/Sider.tsx#L15-L60

- 예) LNB 내의 Sider 컴포넌트

https://github.com/genuine-seok/invest-manager-console/blob/8283ab515f321ec7a5ce6ac17c20e80af00409f8/pages/404.tsx#L1-L21

- 예) 404 에러 페이지 등

</details>

<br>

## 디렉토리 구조

```plain
📦invest-manager-console
 ┃ ...
 ┣ 📂pages                    // 페이지(라우팅) 컴포넌트
 ┃ ┣ 📂accounts               // 계좌 페이지
 ┃ ┃ ┣ 📜[id].tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂login                  // 로그인 페이지
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂users                  // 사용자 페이지
 ┃ ┃ ┣ 📜[id].tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📜404.tsx                // 404 에러 페이지
 ┃ ┣ 📜_app.tsx               // 공통 Provider 및 레이아웃 정의
 ┃ ┣ 📜_document.tsx          // SEO 관련 공통 태그 정의
 ┃ ┗ 📜index.tsx
 ┣ 📂public
 ┃ ┗ 📂images                 // image 파일 관리
 ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┣ 📜favicon.png
 ┃ ┃ ┣ 📜menu_logo.png
 ┃ ┃ ┗ 📜simple_logo.png
 ┣ 📂src
 ┃ ┣ 📂api                    // 비동기 통신 로직 관리
 ┃ ┃ ┣ 📜AccountService.ts
 ┃ ┃ ┣ 📜AuthService.ts
 ┃ ┃ ┣ 📜TokenRepository.ts
 ┃ ┃ ┣ 📜UserService.ts
 ┃ ┃ ┣ 📜api.ts               // axios httpClient 컨피그 설정 정의
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂components             // 컴포넌트 관리
 ┃ ┃ ┣ 📂account
 ┃ ┃ ┃ ┗ 📜AccountDetail.tsx
 ┃ ┃ ┣ 📂common               // 공용 컴포넌트
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜PageLayout.tsx
 ┃ ┃ ┃ ┣ 📜Private.tsx        // 로그인 사용자에 대한 인가, 리다이렉션 로직, 공통 레이아웃 정의
 ┃ ┃ ┃ ┣ 📜Provider.tsx       // QueryClient, 유저, 계좌 서비스등에 대한 Provider 래퍼 컴포넌트 정의
 ┃ ┃ ┃ ┣ 📜Public.tsx         // 로그인 페이지에 대한 인가, 리다이렉션 로직, 공통 레이아웃 정의
 ┃ ┃ ┃ ┣ 📜Sider.tsx
 ┃ ┃ ┃ ┣ 📜UserNav.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┣ 📜UserAccountList.tsx
 ┃ ┃ ┃ ┗ 📜UserDetail.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂constant               // 상수 관리
 ┃ ┃ ┣ 📜accounts.ts
 ┃ ┃ ┣ 📜common.tsx
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜queryKeys.ts         // React-Query 쿼리키 관리
 ┃ ┃ ┗ 📜users.ts
 ┃ ┣ 📂context                // 전역 상태로 제공할 Context 정의
 ┃ ┃ ┣ 📜AccountContext.tsx
 ┃ ┃ ┣ 📜AuthContext.tsx
 ┃ ┃ ┗ 📜UserContext.tsx
 ┃ ┣ 📂data                   // 더미 db 데이터
 ┃ ┃ ┣ 📜accountStatus.json
 ┃ ┃ ┣ 📜brokerFormat.json
 ┃ ┃ ┣ 📜brokers.json
 ┃ ┃ ┣ 📜db.json
 ┃ ┃ ┣ 📜generateData.ts
 ┃ ┃ ┗ 📜sider.json
 ┃ ┣ 📂hooks                  // 공통 커스텀 hook 관리
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜useAccounts.ts
 ┃ ┃ ┣ 📜usePageOption.ts
 ┃ ┃ ┗ 📜useUsers.ts
 ┃ ┣ 📂routes                 // 라우터 경로 정의
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂types                  // 타입 정의
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📂utils                  // 공통 유틸 함수 관리
 ┃ ┃ ┣ 📜accountsHandler.ts
 ┃ ┃ ┣ 📜commonHandler.tsx
 ┃ ┃ ┣ 📜dateHandler.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜siderHandler.ts
 ┃ ┃ ┗ 📜usersHandler.ts
 ┗ 📂styles                   // 공통 스타일 관리
   ┣ 📜global.css
   ┗ 📜vars.css
```

<br>

## 구현 현황

> 본래 모 테크 코스의 동료 학습 최종 과제로 프로젝트의 구현 범위가 주어졌습니다.

### 1. 구현 완료

<details>
<summary> 구현 완료 리스트 </summary>

- 사용자

  - 표기 목록

    - ☑️ 고객명(name) : 가운데 글자 마스킹 필요, 두글자일 경우 성을 제외한 이름 마스킹 처리, 4글자 이상일 경우 마스킹 처리 후 앞뒤 한글자만 표기
    - ☑️ 고객명을 누를 경우 사용자 상세화면으로 이동합니다.
    - ☑️ 보유중인 계좌수(account_count) : (해당 API 호출 후 데이터를 정제하여 표기)
    - ☑️ 이메일 주소 (email)
    - ☑️ 주민등록상 성별코드 (gender_origin)
    - ☑️ 생년월일 (yyyy-mm-dd) (birth_date)
    - ☑️ 휴대폰 번호 (가운데 4자리 `***` 로 마스킹 필요) (phone_number)
    - ☑️ 최근로그인 (last_login)
    - ☑️ 혜택 수신 동의 여부 (해당 API 호출 후 데이터를 정제하여 표기) (allow_marketing_push)
    - ☑️ 활성화 여부 (해당 API 호출 후 데이터를 정제하여 표기) (is_active)
    - ☑️ 가입일 (created_at)

  - 구현
    - ☑️ 목록에서는 활성화 여부, 임직원 계좌 여부를 필터링 할 수 있어야 합니다.
    - ☑️ 리스트 페이지에서는 검색이 가능해야 합니다.
    - ☑️ 페이지네이션이 되어야 합니다.

- 계좌

  - 표기 목록

    - ☑️ 고객명(user_name) : 고객ID 를 참조하여 실제 이름으로 보여져야 합니다.
      - ☑️ 고객명을 누를 경우 사용자 상세화면으로 이동합니다.
    - ☑️ 브로커명(broker_name) : 예시) OO증권, `brokers.json` 를 참조하여 실제 이름으로 보여져야 합니다.
    - ☑️ 계좌번호(number) : 앞 뒤 각각 두글자를 제외하고 나머지는 글자수에 맞게 `*` 글자로 마스킹 처리가 필요합니다.
    - ☑️ 계좌상태(status) : 예시) 운용중, `accountStatus.json` 를 참조하여 실제 이름으로 보여져야 합니다.
    - ☑️ 계좌명(name) : 계좌명입니다.
    - ☑️ 평가금액(assets) : 예시) 123,123,123
    - ☑️ 입금금액(payments) : 예시) 123,123,123
    - ☑️ 계좌활성화여부(is_active) : 계좌 활성화 여부
    - ☑️ 계좌개설일(created_at)

  - 구현 기능
    - ☑️ 목록에서는 브로커명, 계좌 활성화 여부, 계좌 상태를 필터링 할 수 있어야 합니다.
    - ☑️ 리스트 페이지에서는 검색이 가능해야 합니다.
    - ☑️ 페이지네이션이 되어야 합니다.

- 사용자, 계좌 상세

  - ☑️ 각 사용자, 계좌의 상세 페이지는 획득 가능한 대부분의 정보를 표시해주시면 됩니다.

- 그 외
  - ☑️ Sider 메뉴에서는 현재 보고 있는 화면에 해당하는 메뉴가 하이라이트 되어야 합니다.
  - ☑️ 계좌 리스트에서 계좌번호를 누르면 계좌상세 화면으로 이동합니다.
  - ☑️ 계좌 리스트에서 사용자 이름을 누르면 사용자 상세로 이동합니다.
  - ☑️ 사용자 상세에서 사용자의 계좌목록이 보여야 합니다.
  - ☑️ 계좌 목록에서 각 계좌 상태별로 필터링이 가능해야 합니다.
  - ☑️ 계좌 목록에서 broker_id 에 해당하는 실제 브로커명 (OO투자증권) 이 보여야 합니다.

</details>

### 2. 구현 예정

<details>
<summary> 구현 예정 리스트 </summary>

- 공통
  - [ ] 새로고침을 해도 로그인 상태가 유지되어야 하며, 상태에 따라 기존에 머무르던 화면이 그대로 보여야 합니다.
- 사용자
  - [ ] 임의로 신규 사용자를 추가할 수 있어야 합니다.
  - [ ] 잘못 생성한 사용자를 삭제할 수 있어야 합니다.
  - [ ] 개명을 한 사용자를 위해 사용자명을 변경할 수 있어야 합니다.
- 계좌
  - [ ] 수익률이 플러스인 계좌의 총자산 금액은 빨간색, 원금과 동일한 경우 검정색, 마이너스일 경우 파란색으로 보여줘야 합니다.

</details>
