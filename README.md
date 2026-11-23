# 남진 교수 제11대 서울시립대학교 총장선거 홍보 홈페이지 — 개편 레이아웃

빌드·설치 없이 작동하는 순수 HTML/CSS/JavaScript 기반의 선거 홍보 웹사이트입니다.

## 파일 구조
- `index.html`: 메인 페이지 (홈, 왜 남진인가, 걸어온 길, 7대 대표공약, 캠퍼스 환경개선 영상, 공약 카드뉴스, 파일 받기, 아카이브, 푸터)
- `statement.html`: 별도 '소견서' 페이지 (준비 중 안내 및 메인 복귀 링크, 동일 디자인/메뉴 체계 공유)
- `styles.css`: 디자인 시스템 (색상 변수, 반응형 레이아웃, 트리 다이어그램, 7대 공약 4+3 그리드, 아카이브 호버 버튼 등)
- `data.js`: 메뉴, 왜 남진인가 3대 역량, 걸어온 길 경력 목록, 7대 대표공약, 영상 설정, 파일 목록, 아카이브(58건) 데이터
- `app.js`: 데이터 기반 동적 렌더링, 영상 처리, 토글 인터랙션, 스크롤스파이, 모바일 드로어 메뉴 포커스 관리
- `president_assets/`: 대표 사진(`jin_nam.jpg`), 언론 아카이브 원본(`interview_column_etc_1117.xlsx`), 현장 사진 등

## 메인 페이지 섹션 순서
1. **홈 (`#home`)**: 슬로건(`Global 서울을 이끌어가는 / 세계의 대학`), `압도적 실행력으로 실천하는 Global 대학의 완성`, [보조 문구], 7대 대표공약 버튼, 소견서 페이지 링크, 대표 영상(16:9 준비 중 슬롯)
2. **왜 남진인가? (`#why`)**: 3갈래 도식 (상단 '왜 남진인가?' → 수직/수평 분기선 → '서울시', '공공기관', '서울시립대' 3개 박스 및 경력 설명 영역, 모바일은 세로 브랜치형 타임라인 전환)
3. **걸어온 길 (`#journey`)**: 학력 3줄, 분야별 경력 탭과 선택 목록, 오른쪽 교수 사진 영역 (모바일은 학력·사진·경력 순서)
4. **7대 대표공약 (`#pledges`)**: 분야·번호·전체 제목을 표시하는 7개 아코디언 (PC·태블릿 2열, 좁은 화면 1열, 상세 항목은 한 번에 하나씩 펼침)
5. **캠퍼스 환경개선 (`#campus`)**: [영상 소개] 및 16:9 영상 슬롯 (준비 중)
6. **공약 카드뉴스 (`#cardnews`)**: 카드뉴스 등록 준비 중 플레이스홀더 영역
7. **파일 받기 (`#downloads`)**: 공약집, 이력서, 로드맵 등 PDF 다운로드
8. **아카이브 (`#archive`)**: 58건 과거 언론 인터뷰·칼럼·기고문 (최신 3개 기본 노출, '모두 보기 (총 58건) ↓' 토글, '원문 보기 →' 아웃라인 버튼 호버 효과)
9. **푸터**: 후보자명, 운영 주체, 문의처

## 향후 콘텐츠 입력 가이드 (`data.js`)
- **대표 영상**: `data.js`의 `heroVideo.src`에 비디오 파일 경로(HTTPS URL 또는 './president_assets/파일명.mp4') 입력
- **왜 남진인가? 경력 설명**: `data.js`의 `why` 배열 3개 항목의 `description` 수정
- **걸어온 길**: `data.js`의 `education` 배열에서 학력, `journey` 배열의 분야별 `items`에서 경력 (`period`, `title`), `journeyPhoto`에서 사진 경로와 대체텍스트 수정
- **7대 대표공약**: `data.js`의 `pledges7` 배열에서 공약을 관리하고, 각 `details` 배열에 `{ title, description }` 형식의 확정된 세부 공약을 추가 (미입력 항목은 사이트에서 준비 중으로 표시)
- **캠퍼스 환경개선 영상**: `data.js`의 `campusVideo.src`, `intro` 수정
- **공약 카드뉴스**: `data.js`의 `cardNews` 배열에 `{ src: './president_assets/파일명.jpg', alt: '설명' }` 추가
- **소견서 본문**: `statement.html`의 `#statement-content` 영역 활성화 및 내용/PDF 등록
- **다운로드 파일**: `president_assets` 폴더에 PDF를 넣고 `downloads` 항목의 `url`에 './president_assets/파일명.pdf' 입력

## Cloudflare 비밀번호 보호 검토 사이트

GitHub Pages용 원본 사이트는 그대로 유지하고, 아래 설정으로 별도의 `workers.dev` 검토 사이트를 배포할 수 있습니다. Cloudflare Worker가 모든 정적 파일 요청을 먼저 검사하고 HTTP Basic 인증을 통과한 경우에만 파일을 전달합니다. 브라우저 기본 인증 창에는 아이디와 비밀번호 입력란이 함께 나타납니다.

### 로컬 실행

Node.js 22.12.0 이상을 설치한 뒤 프로젝트 루트에서 실행합니다.

```powershell
npm install
npm run test:review
```

로컬 인증 테스트용 값만 `.dev.vars`에 저장하고 개발 서버를 실행합니다. 운영용 비밀번호를 이 파일에 복사하지 마세요.

```powershell
@'
REVIEW_USERNAME="local-review"
REVIEW_PASSWORD="local-test-only"
'@ | Set-Content -Encoding ascii .dev.vars
npm run dev:review
```

개발 서버는 `http://localhost:8787`에서 열립니다. `.dev.vars`가 없거나 Secret 값이 비어 있으면 Worker가 `503`으로 파일 제공을 차단합니다. 로컬 검토는 Cloudflare에 배포하지 않으며, `npm run build:review`는 허용 목록의 파일만 `dist/review-site/`에 복사합니다.

### Cloudflare 첫 배포

`npm install` 후 아래 순서로 실행합니다. 로그인은 브라우저에서 Cloudflare 계정을 승인하며, `secret put`은 터미널에서 각각 비공개로 값을 입력합니다. Secret 값을 명령줄 인자, 소스 파일, 채팅에 적지 마세요.

```powershell
npx wrangler login
npm run deploy:review
npx wrangler secret put REVIEW_USERNAME --config wrangler.jsonc
npx wrangler secret put REVIEW_PASSWORD --config wrangler.jsonc
```

첫 배포는 두 Secret이 없으므로 모든 콘텐츠가 `503`으로 잠긴 상태입니다. 두 Secret을 등록하면 인증 후 검토 사이트를 사용할 수 있습니다. 배포는 임시 `workers.dev` 주소를 사용하며 custom domain, route, 버전 미리보기 URL은 설정하지 않습니다.

수정본을 다시 올릴 때는 아래 명령을 사용합니다.

```powershell
npm run deploy:review
```

### 업로드 범위와 검색 제외

업로드 대상은 `index.html`, `statement.html`, `styles.css`, `data.js`, `app.js`, `president_assets/jin_nam.jpg`로 제한됩니다. 원본 엑셀, 미리보기 이미지, 미사용 현장 사진, 설정 파일, Worker 소스, 비밀 파일은 정적 파일 폴더에 복사되지 않습니다. Cloudflare Workers Static Assets의 현재 개별 파일 제한은 25 MiB이며, 준비 스크립트가 허용 목록 파일의 크기를 확인합니다.

두 HTML 페이지의 robots 메타 태그와 Worker의 `X-Robots-Tag`는 검색 제외 지시입니다. 이는 비밀번호 보호를 대체하지 않으며 URL 직접 접근을 막지 않습니다. 현재 GitHub Pages는 계속 별도로 운영되므로 Worker 인증은 Cloudflare 검토 사이트에만 적용됩니다.

나중에 공개 전환을 결정하면 인증과 검색 제외를 각각 해제해야 합니다. 인증 해제는 `worker/index.js`의 인증 차단 로직을 수정하고, 검색 제외 해제는 두 HTML의 robots 메타 태그와 Worker 응답의 `X-Robots-Tag`를 각각 조정합니다. 현재는 인증 우회 경로나 공개 전환 옵션을 제공하지 않습니다.
