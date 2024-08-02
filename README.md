## #MINE 
  
## ✍️ 개요

- 📄 프로젝트 명: MINE
- 🔨 도구: NextJS, Typescript, Tailwind CSS, react-query, MongoDB
- 👩🏻‍💻 개발자: 황서연 (개인개발)


   
## 💾 배포 주소

[https://mine-community-w.vercel.app/](https://mine-community-w.vercel.app/)


   
## ⚒️ 기술 스택

### Environment
![Visual Studio Code](https://img.shields.io/badge/visual%20studio%20code-297ACC?style=flat-square&logo=visualstudiocode&logoColor=white)
![GitHub](https://img.shields.io/badge/github-181717?style=flat-square&logo=github&logoColor=white)

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white)

### Development
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![NextJS](https://img.shields.io/badge/NextJS-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/Mongodb-47A248?style=flat-square&logo=mongodb&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=flat-square&logo=cssmodules&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-5B4524?style=flat-square&logo=&logoColor=white)


## 🔑 주요 기능

· **회원 기능**
- Auth.js 라이브러리를 활용하여 안전한 회원 인증 로직을 구현하였습니다.
- 회원가입, 로그인 로직 구현 : Zod 라이브러리와 React-hook-form을 활용하여 유효성 검사와 form 컴포넌트를 분리시켜 가독성 있게 구현하였습니다.
- 글쓰기와 나의 정보 페이지는 인증이 된 회원만 접근 가능하도록 구현하였습니다.

· **카카오 맵 API를 활용한 위치 정보 기반 글 작성**
- 카카오 맵 API를 사용하여 사용자가 특정 음식점을 선택하고, 해당 위치 정보를 DB에 함께 저장하여 작성된 글을 볼 때 지도와 함께 표시되도록 구현하였습니다.

· **카테고리, 지역 필터링**
- Next.js의 동적 라우팅을 기반으로 params를 받아 API 호출을 통해 필터링된 데이터들을 불러와 사용자들이 해당 카테고리와 지역에 맞는 리뷰들을 탐색할 수 있도록 구현하였습니다.

· **상호명 검색**

- API Routes 내부에서 MongoDB의 $regex 함수를 사용해 상호명 검색 기능을 구현하였습니다.

· **반응형 웹사이트**

- Tailwind CSS를 이용하여 다양한 디바이스에서 최적화된 반응형 웹사이트를 구현하였습니다.


## 🔑 페이지 별 기능
**[로그인]**
**[회원가입]**
**[메인]**
**[세부 리뷰]**
**[카테고리, 지역 필터]**
**[상호명 검색]**
**[마이페이지]**
**[아코디언 메뉴]**

   
## 📁 파일 구조
```
📦app
 ┣ 📂api
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📂[...nextauth]
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂register
 ┃ ┃ ┗ 📜route.ts
 ┃ ┗ 📂search
 ┃ ┃ ┗ 📜route.ts
 ┣ 📂basket
 ┃ ┣ 📜page.module.css
 ┃ ┗ 📜page.tsx
 ┣ 📂join
 ┃ ┣ 📜page.module.css
 ┃ ┗ 📜page.tsx
 ┣ 📂login
 ┃ ┣ 📜page.module.css
 ┃ ┗ 📜page.tsx
 ┣ 📂product
 ┃ ┣ 📜page.module.css
 ┃ ┗ 📜page.tsx
 ┣ 📂search
 ┃ ┗ 📂[input]
 ┃ ┃ ┣ 📜page.module.css
 ┃ ┃ ┗ 📜page.tsx
 ┣ 📜.DS_Store
 ┣ 📜auth.ts
 ┣ 📜globals.css
 ┣ 📜layout.tsx
 ┣ 📜options.ts
 ┣ 📜page.module.css
 ┗ 📜page.tsx

  📦components
 ┣ 📂fixed
 ┃ ┣ 📜main-header.module.css
 ┃ ┣ 📜main-header.tsx
 ┃ ┣ 📜main-nav.module.css
 ┃ ┣ 📜main-nav.tsx
 ┃ ┣ 📜nav-in-header.module.css
 ┃ ┗ 📜nav-in-header.tsx
 ┣ 📂slider
 ┃ ┣ 📜image-slider.module.css
 ┃ ┣ 📜image-slider.tsx
 ┃ ┣ 📜mobile-image-slider.module.css
 ┃ ┣ 📜mobile-image-slider.tsx
 ┃ ┣ 📜styles.css
 ┃ ┣ 📜today-goods-slider.module.css
 ┃ ┗ 📜today-goods-slider.tsx
 ┣ 📂user
 ┃ ┣ 📜join-form.module.css
 ┃ ┣ 📜join-form.tsx
 ┃ ┣ 📜login-form.module.css
 ┃ ┗ 📜login-form.tsx
 ┣ 📜Items-loading.module.css
 ┣ 📜Items-loading.tsx
 ┣ 📜Untitled-1.jsonc
 ┣ 📜footer.module.css
 ┣ 📜footer.tsx
 ┣ 📜mobile-search-modal.tsx
 ┣ 📜mobile-search.modal.module.css
 ┣ 📜page-counter.module.css
 ┣ 📜page-counter.tsx
 ┗ 📜session-provider.tsx
```
외 lib, store 폴더 등



