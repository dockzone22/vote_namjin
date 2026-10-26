# 총장선거 홈페이지 — 레이아웃 초안

빌드·설치 없이 작동하는 HTML/CSS/JavaScript 원페이지입니다. 실제 후보자·공약·실적은 넣지 않았습니다.

## 파일
- index.html: 기본 문서, 홈, 인터뷰, 섹션 제목, 푸터
- styles.css: 색상 변수, 글꼴, PC/모바일 레이아웃
- data.js: 메뉴, 핵심 과제, 대상별 공약, 로드맵, 업적, 파일 목록
- app.js: 반복 콘텐츠 렌더링, 메뉴, 포커스 관리, 스크롤 상태

## 내 컴퓨터에서 열기
압축을 푼 뒤 index.html을 브라우저에서 열면 됩니다. 파일을 개별적으로 옮기지 말고 같은 폴더 구조를 유지하세요.
Python이 설치되어 있다면 폴더에서 `python -m http.server 8000`을 실행하고 http://localhost:8000 으로 접속해도 됩니다.
Pretendard는 외부 CDN을 사용합니다. 인터넷이 없거나 CDN이 차단되면 시스템 글꼴이 적용됩니다.

## GitHub Pages에서 확인하기 (직접 배포할 때)
1. 새 GitHub 저장소를 만듭니다.
2. index.html, styles.css, data.js, app.js, README.md를 저장소 최상위에 올립니다. 상위 election-site 폴더 자체를 올리면 주소가 달라집니다.
3. Settings → Pages → Build and deployment → Deploy from a branch를 선택합니다.
4. Branch를 main, 폴더를 /(root)로 지정하고 Save를 누릅니다.
5. 배포가 완료되면 Pages 화면에 표시된 주소로 접속합니다.
`.openai` 폴더는 작업 환경의 미리보기 설정으로 GitHub에는 올릴 필요가 없습니다.
이 작업에서는 commit, push, 공개 배포를 하지 않았습니다.

## 수정하기
- 색상: styles.css 맨 위 :root
- 후보자명/대표 슬로건/소개/푸터: index.html (문서 title도 함께 수정)
- 반복 콘텐츠 및 다운로드 파일 경로: data.js
- 사진: index.html의 .portrait 내부를 이미지로 교체하고 대체텍스트를 작성
- 영상: data.js의 interview.embedUrl에 HTTPS 임베드 URL 입력. 링크하는 영상 서비스가 자동재생하지 않도록 설정하세요.
- 파일: 실제 파일을 president_assets 폴더에 넣고 data.js의 url에 './president_assets/파일명.pdf' 입력. format, size도 실제 값으로 수정하세요.
외부 출처 파일은 브라우저 정책에 따라 다운로드 대신 열릴 수 있습니다.

공개 전에는 모든 자리표시자, 자료 사실관계, 이미지 사용권한 및 개인정보 공개 범위를 확인하세요. 수정 전 원본을 백업하고 GitHub 변경 이력을 남기는 것을 권장합니다.

## 검토 결과
- Chromium에서 1440/1024/390/320px 너비의 프레임으로 실제 렌더링: 가로 넘침 없음
- 각 너비에서 공약 카드 9개, 비활성 다운로드 3개, 모든 앵커 대상 존재 확인
- 390px에서 메뉴 열기, Esc 닫기, 직원 소메뉴 선택 후 닫기 확인
- 직원 앵커 이동 후 제목 상단 약 112px: 고정 헤더와 겹치지 않음
- 직원 활성 메뉴와 상위 공약 메뉴 표시, 맨 위로 버튼 확인
- JavaScript 문법 검사 통과
- 실제 iOS/Android 기기, 다른 브라우저 및 실제 파일·영상 연결은 미검증
- 참고 사이트는 이전 확인된 구조와 제공 요구사항을 바탕으로 구현. 이번 제작에서 두 사이트의 PC/모바일 화면을 직접 대조하지 않음
