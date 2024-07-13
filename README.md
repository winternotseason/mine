## 🛒 나만의 쇼핑을 즐기자, MINE 
![MINE](https://github.com/winternotseason/mine-shopping/assets/157186101/c224b96d-836c-470e-9ce7-42966111ecb4)

### **네이버 검색 쇼핑 api**를 활용한 프론트엔드 쇼핑몰 구현 프로젝트, MINE 입니다.
#### 원하는 상품을 탐색하고, 최저가로 즐겨보세요!

  
## ✍️ 개요

- 📄 프로젝트 명: MINE
- 📅 개발 기간: 2024.06.27-2024.07.11
- 🔨 도구: NextJS, CSS-module, MongoDB, Vercel ···
- 👩🏻‍💻 개발자: 황서연 (개인개발)


   
## 💾 배포 주소

[https://mine-shopping.vercel.app/](https://mine-shopping.vercel.app/)


   
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



   
## 📺 화면 구성

| 화면  | 모바일 이미지                                                                                             | 데스크탑 이미지                                                                                          |
|-----------|------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **메인단**   | <img src="https://github.com/winternotseason/winternotseason/assets/157186101/60fe7850-2ef8-4e5c-b288-2c769ea7b359" width="300"/> | <img src="https://github.com/winternotseason/winternotseason/assets/157186101/85d5d57c-07bd-4a48-98eb-1a37f617f0cc" width="500"/> |
|   **결과단**   | <img src="https://github.com/winternotseason/winternotseason/assets/157186101/34f555f9-f923-42ef-b905-c6945592067e" width="300"/> | <img src="https://github.com/winternotseason/winternotseason/assets/157186101/18b28f3d-35be-4aa6-a267-12f62f5fc6e5" width="500"/> |
| **상세단**   | <img src="https://github.com/winternotseason/winternotseason/assets/157186101/8a4946d5-f5c5-4eee-9d40-614f3861edf7" width="300"/> | <img src="https://github.com/winternotseason/winternotseason/assets/157186101/668e7aca-3093-466d-8014-404064a0ee76" width="500"/> |
| **가입단**   | <img src="https://github.com/winternotseason/winternotseason/assets/157186101/0739aa1a-da7b-4ca0-8f5a-39b551e6b779" width="300"/> | <img src="https://github.com/winternotseason/winternotseason/assets/157186101/c0b8ca02-dd06-4896-89ff-2830b73ba41d" width="500"/> |
| **로그인** | <img src="https://github.com/winternotseason/winternotseason/assets/157186101/3c22a9b2-209c-4b9b-a948-980e37517484" width="300"/> | <img src="https://github.com/winternotseason/winternotseason/assets/157186101/7b8f28e6-686c-4de3-9b91-254de6ef1895" width="500"/> |



## 🔑 주요 기능

- 🔎 **상품 탐색 기능**: 네이버 쇼핑 api를 자체 서버 API를 이용해 호출
- ✨ **회원 기능**: Next-Auth/MongoDB를 이용해 구현, Next-Auth의 자체적인 로그인 로그아웃 기능을 이용한 안전한 쿠키 사용
- 🎬 **광고 슬라이더 기능**: 메인 광고 배너와, 오늘의 상품 목록들을 swiper 라이브러리를 통해 구현
- 🛒 **실제 구매 사이트 이동**: 사용자가 선택한 상품을 구매하러가기 링크를 통해 실제 구매가 가능한 사이트로 이동


   
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


       
## 📄 블로그 정리
[![블로그1](https://github.com/winternotseason/winternotseason/assets/157186101/17ab073a-a441-4b28-a4f4-01b0d55dcdbb)](https://seodevelopment.tistory.com/66)
[![블로그2](https://github.com/winternotseason/winternotseason/assets/157186101/7a2f5b70-27c5-4b14-9cc1-51c1255b1009)](https://seodevelopment.tistory.com/67)
